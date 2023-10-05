import React ,{useState}from 'react'
import './style.css'
import axios from 'axios'
import SideNavBar from '../SideNavBar/SideNavBar'

function Send() {
    const [subject,setsubject] = useState("")
    const [message,setmessage] = useState("")
    const [attachment,setattachment] = useState("")
    const [statut, setstatut] = useState("");

    const valide = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:5000/send-email", {subject, message, attachment}, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
        .then(Response=>{
           console.log(Response.data)
        });
        setstatut('allredy sended');
        setsubject('');
        setmessage('');
    }
return (
    <div className="bodycontant">
        <div className='sidebar'>
            <SideNavBar/>
        </div> 
        <div className='content'></div>
        <div className="inscrire">
            <form className="inscrireforms" enctype="multipart/form-data">
                <h2 style={{textAlign : "center"}}>Send E-mail</h2>
                <div className="col-md-12 ">
                    <label  className="form-label">Subject</label>
                    <input type="text" className="form-control text-left" name='subject' value={subject} onChange={(e)=>setsubject(e.target.value)}/>
                </div>
                <div className="col-md-12 ">
                    <label  className="form-label">Message</label>
                    <textarea  cols="10" rows="3" className="form-control text-left" name='message' value={message} onChange={(e)=>setmessage(e.target.value)}></textarea>
                </div>
                <div className="col-md-12 ">
                    <label  className="form-label">File</label>
                    <input type="file" className="form-control text-left" name='attachment' onChange={(e) => setattachment(e.target.files[0])} />

                </div>
                <div className="col-md-12 ">
                    <button className='btn btn-success mt-2' onClick={valide}>Send</button>
                </div>
                <p className="forgot-password text-right">
                    <span style={{ color: '#23E717' }}>{statut}</span>
                </p>
            </form>
        </div>
    </div>
    )
}
export default Send;