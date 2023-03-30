import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Metro from "./scenes/metro";
import WideView from "./scenes/wide-view";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import LSW from "./scenes/lsw";
import Breakout from "./scenes/breakout";
import Backhaul from "./scenes/backhaul";


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
            <Route path="/" element={<Metro />}/>
            <Route path="/LSW" element={<LSW />} />
            <Route path="/wide-view" element={<WideView />} />
            <Route path="/Breakout" element={<Breakout />} />
            <Route path="/Backhaul" element={<Backhaul />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;