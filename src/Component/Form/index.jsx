import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./index.css";
import TagsInput from "../TagInput";
import { Autocomplete, Button, TextField } from "@mui/material";
import { frameworks, languages, libraries, roles } from "./const";
import { getGeneratedResponse } from "../../api";
import { CopyBlock, dracula } from "react-code-blocks";

const Form = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [output, setOutput] = useState({ code: "test", testCases: "test" });

  const onSubmit = async (data) => {
    const res = await getGeneratedResponse(data);
    setOutput(res);
  };

  const handleTagsChange = (tags) => {
    console.log("Tags:", tags);
  };

  return (
    <div className="form-container">
      <form className="tech-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Autocomplete
            disablePortal
            id="language"
            options={languages}
            sx={{ width: 300 }}
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
          <Autocomplete
            disablePortal
            id="framework"
            options={frameworks}
            sx={{ width: 300 }}
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
          <Autocomplete
            disablePortal
            id="role"
            options={roles}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register("role", { required: true })}
                label="Role"
              />
            )}
          />
        </div>
        <div>
          <TagsInput onChange={handleTagsChange} setValue={setValue} />
        </div>
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
          />
        </div>
        <div>
          <p>Test Cases:</p>
          <CopyBlock
            text={output?.testCases}
            showLineNumbers
            wrapLines
            theme={dracula}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
