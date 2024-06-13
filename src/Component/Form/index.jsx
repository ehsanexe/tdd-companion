import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import "./index.css";
import TagsInput from "../TagInput";

const Form = () => {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { errors },
    getValues,
  } = methods;

  const onSubmit = (data) => {
    console.log({data})
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
    <FormProvider {...methods}>
      <form className="tech-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="dropdown-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                {...methods.register("language", { required: true })}
              >
                <option value="">Select...</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              {errors.language && <p>This field is required</p>}
            </div>

            <div className="form-group">
              <label htmlFor="framework">Framework</label>
              <select
                id="framework"
                {...methods.register("framework", { required: true })}
              >
                <option value="">Select...</option>
                {frameworks.map((framework) => (
                  <option key={framework} value={framework}>
                    {framework}
                  </option>
                ))}
              </select>
              {errors.framework && <p>This field is required</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="library">Library</label>
              <select
                id="library"
                {...methods.register("library", { required: true, })}
              >
                <option value="">Select...</option>
                {libraries.map((library) => (
                  <option key={library} value={library}>
                    {library}
                  </option>
                ))}
              </select>
              {errors.library && <p>This field is required</p>}
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                {...methods.register("role", { required: true })}
              >
                <option value="">Select...</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && <p>This field is required</p>}
            </div>
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="tags">Tags</label>
          <TagsInput register={methods.register} onChange={handleTagsChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...methods.register("description", { required: true })}
          />
          {errors.description && <p>This field is required</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default Form;
