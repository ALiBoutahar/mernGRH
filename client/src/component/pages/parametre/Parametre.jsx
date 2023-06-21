// import React , {useState} from 'react'
// import TypeMedicaments from '../typeMedicament/TypeMedicaments'
import Profil from '../profil/Profil'
import './parameter.css'
// import { useEffect } from 'react'
import SideNavBar from '../../SideNavBar/SideNavBar';

function Parametre() {
    
  return (
    <div className="bodycontant">
        <div className='sidebar'>
       <SideNavBar/>
        </div>
        <div className='content'></div>
          {/* <div className='container mx-2 mt-2' > */}
            <div className='Chose'>
              {<Profil/>}
            </div>
          {/* </div> */}
    </div>
    
  )
}

export default Parametre