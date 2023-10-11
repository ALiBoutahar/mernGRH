import React from "react";
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import AjouterPatient from './component/pages/patient/AjouterPatient';
import EditPatient from './component/pages/patient/EditPatient';
import Parametre from './component/pages/parametre/Parametre';
import Patients from './component/pages/patient/Patients';
import DetailsPatient from "./component/pages/patient/DetailsPatient";
import Acceuil from './component/pages/accueil/Acceuil';
import './component/SideNavBar/SideNavBar.css';
import Signup from "./component/login/Signup";
import Login from "./component/login/Login";
import Send from "./component/login/sending";
import GestionAbsences from "./component/pages/absance/addAbsance";
import AfficherAbsences from "./component/pages/absance/absence";
const App = () => {
    const isloggedIn = window.localStorage.getItem("loggedIn");
    // console.log(isloggedIn);
    return ( 
        <Router>
            <Routes>
                <Route exact path="/" element={isloggedIn === null ? <Login /> :<Acceuil  />} />
                <Route exact path="/Login" element={isloggedIn === null ? <Login /> :<Acceuil  />} />
                <Route path="/Acceuil" element={isloggedIn === null ? <Login /> :<Acceuil />} />
                <Route path="/Signup" element={isloggedIn === null ? <Signup /> :<Acceuil />} />
                <Route path='/Patient' element={isloggedIn === null ? < Login /> : <Patients/>} />
                <Route path='/AjouterPatient' element={isloggedIn === null ? < Login /> : <AjouterPatient/>} />
                <Route path='/Patient/:id/EditPatient' element={isloggedIn === null ? < Login /> : <EditPatient/>} />
                <Route path='/Patient/DetailsPatient/:id' element={isloggedIn === null ? < Login /> : <DetailsPatient/>} />
                <Route path='/Parametre' element={isloggedIn === null ? < Login /> : <Parametre />} />
                <Route path='/Contact-us' element={isloggedIn === null ? < Login /> : <Send/>} />
                <Route path='/AddAbsance' element={isloggedIn === null ? < Login /> : <GestionAbsences/>} />
                <Route path='/AfficherAbsences' element={isloggedIn === null ? < Login /> : <AfficherAbsences/>} />

            </Routes>
        </Router> 
    )
};
export default App; 