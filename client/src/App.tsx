import 'devextreme/dist/css/dx.light.css';
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Metro from "./scenes/metro";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import LSW from "./scenes/lsw";
import Breakout from "./scenes/breakout";
import Backhaul from "./scenes/backhaul";
import MetroAdd from "./scenes/metro/MetroAdd";
import MetroEdit from "./scenes/metro/MetroEdit";
import LSWAdd from "./scenes/lsw/LSWAdd";
import LSWEdit from './scenes/lsw/LSWEdit';
import FoAdd from './scenes/backhaul/FoAdd';
import Register from './scenes/User/Register';
import Login from './scenes/User/Login';
import UserManager from './scenes/User/UserManager';
import UserTable from './scenes/User/UserManager';
import Settings from './scenes/User/Settings';
import axios from 'axios';
import NotFound from './scenes/global/NotFound';
import { TailSpin } from "react-loader-spinner";



function App() {
  const { theme, toggleColorMode } = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); 
  
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
   
    axios.get("/api/logincheck").then((response) => {
      if (response.data.loggedIn == true) {
        console.log('hey')
        setUserData(response.data.user[0]);
        setIsLoggedIn(true)
      }
      setTimeout(function(){
        setIsDataLoaded(true);
      }, 1000); 
      
    });
  }, []);

  const handleLogin = (data:any) => {
    setUserData(data[0]); 
    setIsLoggedIn(true);
    navigate('/Metro'); // Redirect to the /Metro route
  };

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
          {isLoggedIn && <Sidebar username={userData.username} role={userData.role} />}
          
          <main className="content">
            {isLoggedIn && <Topbar />}
            {isDataLoaded ? ( 
            <Routes>
              {!isLoggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
              {!isLoggedIn && <Route path="/Register" element={<Register />} />}
              {!isLoggedIn && <Route path="*" element={<NotFound variant={2} />}/>  }

              {isLoggedIn && <Route path="/Metro" element={<Metro role={userData.role} />} />}
               {isLoggedIn && <Route path="/LSW" element={<LSW role={userData.role} />} />}
               {isLoggedIn && <Route path="/test" element={<UserTable />} />}
               {isLoggedIn && <Route path="/Metro/add" element={<MetroAdd />} />}
               {isLoggedIn && <Route path="/Metro/edit" element={<MetroEdit />} />}
               {isLoggedIn && <Route path="/LSW/add" element={<LSWAdd />} />}
               {isLoggedIn && <Route path="/LSW/edit" element={<LSWEdit />} />}
               {isLoggedIn && <Route path="/Breakout" element={<Breakout />} />}
               {isLoggedIn && <Route path="/Backhaul/144FO" element={<Backhaul foVarient={144} role={userData.role} />} />}
               {isLoggedIn && <Route path="/Backhaul/72FO" element={<Backhaul foVarient={72} role={userData.role} />} />}
               {isLoggedIn && <Route path="/Backhaul/48FO" element={<Backhaul foVarient={48} role={userData.role} />} />}
               {isLoggedIn && <Route path="/Backhaul/24FO" element={<Backhaul foVarient={24} role={userData.role} />} />}
               {isLoggedIn && <Route path="/Backhaul/Add" element={<FoAdd />} />}
               {isLoggedIn && userData.role==='Administrateur' && <Route path="/Users/ManageRoles" element={<UserManager />} />}
               {isLoggedIn && <Route path="/profile-settings" element={<Settings user={userData} />} />}
               {isLoggedIn && <Route path="*" element={<NotFound variant={1} />}/>  }
            </Routes>
            ) : (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width={'100vw'}
                      height="100vh" 
                    >
                      <TailSpin color="#4cceac" height={200} width={300} /> <Typography variant='h3'> Veuillez patienter...</Typography>
                    </Box>
                  )}
          </main>
               
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
