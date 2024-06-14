import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Form from "./Component/Form";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>TDD Companion Form</h1>
          <Form />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
