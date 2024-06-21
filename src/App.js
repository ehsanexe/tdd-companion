import { Button, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Form from "./Component/Form";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isDrawer, setIsDrawer] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Button onClick={() => setIsDrawer(true)}>Setting</Button>
        <h1>TDD Companion Form</h1>
        <Form isDrawer={isDrawer} setIsDrawer={setIsDrawer} />
      </div>
    </ThemeProvider>
  );
}

export default App;
