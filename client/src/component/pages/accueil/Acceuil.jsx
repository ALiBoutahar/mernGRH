import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import DashItem from './DashItem';
import News from './News';
import './dash.css'
// import Loader from '../../Loader/Loader'
import Heure from './Heure';
import SideNavBar from '../../SideNavBar/SideNavBar';
 
function Acceuil() {
  return (
    <div className="p">
      <div className='sidebar'>
        <SideNavBar/>
      </div>
      {/* <div className='content'></div> */}
      <div className='container mt-2 wd2' >
        <Heure/>
        <News/>
        <DashItem/>
      </div>
    </div>
  )
}

export default Acceuil