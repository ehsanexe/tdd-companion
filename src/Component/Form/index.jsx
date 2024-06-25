import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./index.css";
import TagsInput from "../TagInput";
import { Autocomplete, Button, Drawer, TextField } from "@mui/material";
import { frameworks, libraries } from "./const";
import { getGeneratedResponse, sendFeedBack } from "../../api";
import { CopyBlock, dracula } from "react-code-blocks";
import Loader from "../Loader";
import ChatHistory from "../History";
import { Download, Science, Code } from "@mui/icons-material/";

const Form = ({ isDrawer, setIsDrawer, isHistory, setIsHistory }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  const [tags, setTags] = useState([]);
  const values = getValues();
  const store = localStorage.getItem("store");
  const [isFeedBack, setIsFeedBack] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [output, setOutput] = useState({
    code: "//initial skeleton of the implementation... \n\n",
    testCases: "//test cases based on the provided user story... \n\n",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const [selectedFramework, setSelectedFramework] = useState(null);

  const handleFrameworkChange = (event, value) => {
    setSelectedFramework(value);
    console.log("value", value);
    if (value) {
      setValue("language", value.languages[0].name);
    }
  };

  const downloadFile = async (fileContent, fileName) => {
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName; // Replace 'filename.txt' with your desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await getGeneratedResponse(data)


    setOutput(res.jsonResponse);
    setIsLoading(false);
    setIsFeedBack(true);
    setChatHistory(res.history);
  };
  const handleTestDownload = async () => {
    await downloadFile(output.testCases, "testCase.txt");
  }
  const handleCodeDownload = async () => {
    const selectedFramework = frameworks.find(f => f.label === getValues('framework'));
    const selectedLanguage = selectedFramework?.languages.find(l => l.name === getValues('language'));
    const fileExtension = selectedLanguage?.extension || 'txt'; // Default to 'txt' if not found
    await downloadFile(output.code, `code.${fileExtension}`);
  }
  const handleAllDownload = async () => {
    await handleTestDownload()
    await handleCodeDownload()
  }

  const onFeedback = async () => {
    window.scrollTo(0, 0)
    setIsLoading(true);
    const res = await sendFeedBack(chatHistory, feedback);

    setOutput(res.jsonResponse);
    setIsLoading(false);
    setChatHistory(res.updatedHistory);
  };

  const handleTagsChange = (tags) => {
    console.log("Tags:", tags);
  };

  useEffect(() => {
    if (store) {
      const parseStore = JSON.parse(store);
      const storedFramework = frameworks.find(
        (f) => f.label === parseStore.framework
      );
      setValue("framework", storedFramework ?? null);
      setSelectedFramework(storedFramework ?? null);

      setValue("framework", parseStore.framework);
      setValue("language", parseStore.language);
      setValue("library", parseStore.library);
      setValue("tags", parseStore.tags);
      setTags(parseStore.tags ?? []);
    }
  }, []);

  useEffect(() => {
    const isSettingsEmpty =
      !values?.framework &&
      !values?.language &&
      !values?.library?.length &&
      !values?.tags?.length;

    const parseStore = JSON.parse(store);
    const isStoreEmpty =
      !parseStore?.framework &&
      !parseStore?.language &&
      !parseStore?.library?.length &&
      !parseStore?.tags?.length;

    if (isSettingsEmpty && isStoreEmpty) {
      setIsDrawer(true);
    } else {
      localStorage.setItem("store", JSON.stringify(values));
    }
  }, [values]);

  const frameworkOptions = useMemo(
    () => frameworks.map((data) => data.label),
    []
  );

  const languageOptions = useMemo(() => {
    const allLanguages = frameworks.reduce((acc, framework) => {
      framework.languages.forEach((lang) => {
        if (!acc.includes(lang.name)) {
          acc.push(lang.name);
        }
      });
      return acc;
    }, []);
    return selectedFramework
      ? selectedFramework?.languages.map((lang) => lang.name)
      : allLanguages;
  }, [selectedFramework]);

  return (
    <div className="form-container">
      <Loader isLoading={isLoading} />
      <form className="tech-form" onSubmit={handleSubmit(onSubmit)}>
        <Drawer
          ModalProps={{
            keepMounted: true,
          }}
          open={isDrawer}
          onClose={() => setIsDrawer(false)}
        >
          <div className="drawer">
            <div>
              <Controller
                name="framework"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    disablePortal
                    id="framework"
                    options={frameworkOptions}
                    getOptionLabel={(option) => option}
                    sx={{ width: 300 }}
                    onChange={(event, value) => {
                      const selected = frameworks.find(
                        (f) => f.label === value
                      );
                      console.log("selected", selected);
                      field.onChange(selected?.label ?? "");
                      handleFrameworkChange(event, selected);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register("framework", { required: true })}
                        label="Framework"
                      />
                    )}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="language"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    disablePortal
                    id="language"
                    options={languageOptions}
                    sx={{ width: 300 }}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(event, value) => {
                      field.onChange(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register("language", { required: true })}
                        label="Language"
                      />
                    )}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name="library"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    disablePortal
                    id="library"
                    options={libraries}
                    sx={{ width: 300 }}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="Library" />
                    )}
                  />
                )}
              />
            </div>
            <div>
              <TagsInput
                tags={tags}
                setTags={setTags}
                onChange={handleTagsChange}
                setValue={setValue}
              />
            </div>
          </div>
        </Drawer>

        <div className="description">
          <TextField
            id="description"
            label="Userstory / Description"
            multiline
            rows={4}
            sx={{ width: "100%" }}
            {...register("description", { required: true })}
          />
          {errors.description && <p>This field is required</p>}
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>

      {isFeedBack && (
        <div className="downloads">
          <span>Downalods:</span>
          <Button variant="outlined" startIcon={<Code />} onClick={handleCodeDownload}>
            Code
          </Button>
          <Button variant="outlined" startIcon={<Science />} onClick={handleTestDownload}>
            Tests
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleAllDownload}>
            Code + Tests
          </Button>
        </div>
      )}

      <div className="code-block">
        <div className="block">
          <p>Test Cases:</p>
          <CopyBlock
            text={output?.testCases}
            showLineNumbers
            wrapLines
            theme={dracula}
            language={getValues("language")}
          />
        </div>
        <div className="block">
          <p>Code:</p>
          <CopyBlock
            text={output?.code}
            showLineNumbers
            wrapLines
            theme={dracula}
            language={getValues("language")}
          />
        </div>
      </div>
      {isFeedBack && (
        <div className="feedback">
          <TextField
            id="feedback"
            label="Feedback"
            multiline
            rows={4}
            sx={{ width: "100%" }}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button variant="contained" onClick={onFeedback}>
            Submit
          </Button>
        </div>
      )}
      <Drawer
        anchor={"bottom"}
        open={isHistory && chatHistory.length}
        onClose={() => setIsHistory(false)}
      >
        <div className="history-drawer">
          {chatHistory.map((item) => (
            <ChatHistory role={item.role} response={item?.parts[0]?.text} />
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Form;
