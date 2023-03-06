import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Metro from "./scenes/grid";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import NetworkChart from "./components/NetworkChart";

function App() {
  const {theme, toggleColorMode} = useMode();

  return (
    <ColorModeContext.Provider value={{toggleColorMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/metro" element={<Metro />} />
            <Route path="/NetworkChart" element={<NetworkChart />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
