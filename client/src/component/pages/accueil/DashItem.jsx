import React from 'react'
import { Link } from 'react-router-dom'
import './dash.css'
function DashItem() {
  return (
    
    <>
    <div className='row col-md-12'>
        <div className='col-md-4 col-sm-4' style={{maxWidth : "25%"}} >
            {/* <Link to={"/Caisse"}> */}
                <div className='column'>
                    <div className='png'>
                    <i className="fa fa-cart-plus"></i>
                    <h5>compitances</h5>
                    </div>
                </div>
            {/* </Link> */}
        </div>
    
        <div className='col-md-4 col-sm-4' style={{maxWidth : "25%"}} >
            {/* <Link to={"/AjouterProduit"}> */}
                <div className='columntwo'>
                    <div className='png'>
                    <i className="fa fa-shopping-bag"></i>
                    <h5>Employers</h5>
                    </div>
                </div>
            {/* </Link> */}
        </div>
    
        <div className='col-md-4 col-sm-4' style={{maxWidth : "25%"}} >
            <Link to={"/Patient"} >
                <div className='column'>
                    <div className='png'>
                    <i className="fa fa-address-card"></i>
                    <h5>Personnes</h5>
                    </div>
                </div>
            </Link>
        </div>

        <div className='col-md-4 col-sm-4' style={{maxWidth : "25%"}} >
            <Link to={"/Contact-us"}>
                <div className='column'>
                    <div className='png'>
                    <i className="fa fa-book"></i>
                    <h5>Contact-us</h5>
                    </div>
                </div>
            </Link>
        </div>
    </div>

    <hr className="style1"></hr>

    </>
    

  )
}
export default DashItem