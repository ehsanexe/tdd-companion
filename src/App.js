import {
  Button,
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./App.css";
import Form from "./Component/Form";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isDrawer, setIsDrawer] = useState(false);
  const [isHistory, setIsHistory] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="settings">
          <IconButton onClick={() => setIsHistory(true)} aria-label="History">
            <HistoryIcon />
          </IconButton>
          <IconButton onClick={() => setIsDrawer(true)} aria-label="Setting">
            <SettingsIcon />
          </IconButton>
        </div>
        <h1>TDD Companion</h1>
        <Form
          isDrawer={isDrawer}
          setIsDrawer={setIsDrawer}
          isHistory={isHistory}
          setIsHistory={setIsHistory}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
