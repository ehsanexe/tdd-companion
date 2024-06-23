import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./index.css";
import TagsInput from "../TagInput";
import { Autocomplete, Button, Drawer, TextField } from "@mui/material";
import { frameworks, languages, libraries, roles } from "./const";
import { getGeneratedResponse } from "../../api";
import { CopyBlock, dracula } from "react-code-blocks";
import Loader from "../Loader";

const Form = ({ isDrawer, setIsDrawer }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, defaultValues },
    control,
    getValues,
  } = useForm();

  const [tags, setTags] = useState([]);
  const values = getValues();
  const store = localStorage.getItem("store");

  const [output, setOutput] = useState({ code: "test", testCases: "test" });
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async (fileContent, fileName) => {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;  // Replace 'filename.txt' with your desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);  // Clean up the URL object
  };



  const onSubmit = async (data) => {
    setIsLoading(true);

    const res = await getGeneratedResponse(data);
    await downloadFile(res.code, 'code.txt');
    await downloadFile(res.testCases, 'testCase.txt');

    setOutput(res);
    setIsLoading(false);
  };

  const handleTagsChange = (tags) => {
    console.log("Tags:", tags);
  };

  useEffect(() => {
    if (store) {
      const parseStore = JSON.parse(store);
      setValue("framework", parseStore.framework);
      setValue("language", parseStore.language);
      setValue("library", parseStore.library);
      setValue("tags", parseStore.tags);
      setTags(parseStore.tags);
    }
  }, []);

  useEffect(() => {
    const isSettingsEmpty =
      !values?.framework &&
      !values?.language &&
      !values?.library?.length &&
      !values?.tags?.length;

    if (isSettingsEmpty && !store) {
      setIsDrawer(true);
    } else {
      console.log({ values });
      localStorage.setItem("store", JSON.stringify(values));
    }
  }, [values]);

  return (
    <div className="form-container">
      <Loader isLoading={isLoading} />
      <form className="tech-form" onSubmit={handleSubmit(onSubmit)}>
        <Drawer open={isDrawer} onClose={() => setIsDrawer(false)}>
          <div className="drawer">
            <div>
              <Autocomplete
                disablePortal
                id="framework"
                options={frameworks}
                sx={{ width: 300 }}
                value={getValues("framework")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("framework", { required: true })}
                    label="Framework"
                  />
                )}
              />
            </div>
            <div>
              <Autocomplete
                disablePortal
                id="language"
                options={languages}
                sx={{ width: 300 }}
                value={getValues("language")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("language", { required: true })}
                    label="Language"
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
            label="Description"
            multiline
            rows={4}
            sx={{ width: 600 }}
            {...register("description", { required: true })}
          />
          {errors.description && <p>This field is required</p>}
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <div className="code-block">
        <div>
          <p>Code:</p>
          <CopyBlock
            text={output?.code}
            showLineNumbers
            wrapLines
            theme={dracula}
            language={getValues("language")}
          />
        </div>
        <div>
          <p>Test Cases:</p>
          <CopyBlock
            text={output?.testCases}
            showLineNumbers
            wrapLines
            theme={dracula}
            language={getValues("language")}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
