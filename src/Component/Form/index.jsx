import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./index.css";
import TagsInput from "../TagInput";
import { Autocomplete, Button, TextField } from "@mui/material";
import { frameworks, languages, libraries, roles } from "./const";

const Form = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [output, setOutput] = useState("");

  const onSubmit = (data) => {
    console.log({ data });
    // setOutput
  };

  const handleTagsChange = (tags) => {
    console.log("Tags:", tags);
  };

  return (
    <form className="tech-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="dropdown-container">
        <div className="form-row">
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
              id="Framework"
              options={frameworks}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("Framework", { required: true })}
                  label="Framework"
                />
              )}
            />
          </div>
        </div>
        <div className="form-row">
          <div>
            <Controller
              name="Library"
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
              id="Role"
              options={roles}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("Role", { required: true })}
                  label="Role"
                />
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <TagsInput onChange={handleTagsChange} setValue={setValue} />
      </div>

      <div>
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
  );
};

export default Form;
