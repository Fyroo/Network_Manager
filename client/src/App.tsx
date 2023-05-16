import 'devextreme/dist/css/dx.light.css';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Metro from "./scenes/metro";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import LSW from "./scenes/lsw";
import Breakout from "./scenes/breakout";
import Backhaul from "./scenes/backhaul";
import MetroAdd from "./scenes/metro/MetroAdd";
import MetroEdit from "./scenes/metro/MetroEdit";
import LSWAdd from "./scenes/lsw/LSWAdd";
import LSWEdit from "./scenes/lsw/LSWEdit";
import FoAdd from './scenes/backhaul/FoAdd';
import Register from './scenes/User/Register';
import Login from './scenes/User/Login';
import UserManager from './scenes/User/UserManager';
import UserTable from './scenes/User/UserManager';
import Settings from './scenes/User/Settings';

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
            <Route path="/test" element={<UserTable />} />
            <Route path="/Metro/add" element={<MetroAdd />} />
            <Route path="/Metro/edit" element={<MetroEdit/>} />
            <Route path="/LSW/add" element={<LSWAdd/>} />
            <Route path="/LSW/edit" element={<LSWEdit/>} />
            <Route path="/Breakout" element={<Breakout />} />
            <Route path="/Backhaul/144FO" element={<Backhaul foVarient={144} />} />
            <Route path="/Backhaul/72FO" element={<Backhaul foVarient={72} />} />
            <Route path="/Backhaul/48FO" element={<Backhaul foVarient={48} />} />
            <Route path="/Backhaul/24FO" element={<Backhaul foVarient={24} />} />
            <Route path="/Backhaul/Add" element={<FoAdd/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Users/ManageRoles" element={<UserManager/>} />
            <Route path="/profile-settings" element={<Settings/>} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
