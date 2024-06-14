import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./index.css";
import TagsInput from "../TagInput";
import { Autocomplete, Button, TextField } from "@mui/material";

const Form = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [output, setOutput] = useState("");

  const onSubmit = (data) => {
    console.log({ data });
    // setOutput
  };

  const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "TypeScript",
    "Go",
    "Rust",
    "Objective-C",
    "Scala",
    "Perl",
    "R",
    "MATLAB",
    "Dart",
    "Elixir",
    "Haskell",
    "Lua",
    "C",
    "Shell",
    "Groovy",
    "VB.NET",
    "F#",
    "Erlang",
    "Julia",
    "PowerShell",
    "COBOL",
    "Fortran",
    "Ada",
    "Lisp",
    "Scheme",
    "Prolog",
    "Racket",
    "Assembly",
    "SQL",
    "HTML/CSS",
    "SAS",
  ];
  const frameworks = [
    "React",
    "Angular",
    "Vue.js",
    "Django",
    "Flask",
    "Ruby on Rails",
    "Spring Boot",
    "ASP.NET Core",
    "Laravel",
    "Express",
    "Next.js",
    "Nuxt.js",
    "Gatsby",
    "Ember.js",
    "Svelte",
    "Bootstrap",
    "Tailwind CSS",
    "Material-UI",
    "Ant Design",
    "FastAPI",
    "GraphQL",
    "Apollo",
    "Redux",
    "MobX",
    "RxJS",
    "Chakra UI",
    "Semantic UI",
    "Bulma",
    "Foundation",
    "Electron",
    "Ionic",
    "Cordova",
    "Flutter",
    "React Native",
    "SwiftUI",
    "Jetpack Compose",
    "Qt",
    "GTK",
    "wxWidgets",
    "Tkinter",
    "Hadoop",
    "Spark",
    "Kafka",
    "Flink",
    "Airflow",
  ];
  const libraries = [
    "jQuery",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-Learn",
    "Pandas",
    "NumPy",
    "SciPy",
    "Matplotlib",
    "Seaborn",
    "XGBoost",
    "LightGBM",
    "CatBoost",
    "OpenCV",
    "NLTK",
    "SpaCy",
    "Three.js",
    "D3.js",
    "Chart.js",
    "Lodash",
    "Moment.js",
    "Socket.IO",
    "Webpack",
    "Babel",
    "Gulp",
    "Grunt",
    "Parcel",
    "Hadoop",
    "Cassandra",
    "MongoDB",
    "Redis",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "MariaDB",
    "Realm",
    "CouchDB",
    "Firebase",
    "Supabase",
    "Jest",
    "Mocha",
    "Chai",
    "JUnit",
    "PyTest",
    "RSpec",
    "Cypress",
    "Selenium",
    "QUnit",
    "Enzyme",
    "Ava",
    "TestCafe",
    "Karma",
    "Jasmine",
  ];
  const roles = ["Admin", "Customer", "Developer", "Manager"];

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
            <Autocomplete
              disablePortal
              id="library"
              options={libraries}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("library", { required: true })}
                  label="library"
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

      <div className="form-group full-width">
        <label htmlFor="tags">Tags</label>
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

      <Button variant="contained" type="submit">Contained</Button>
    </form>
  );
};

export default Form;
