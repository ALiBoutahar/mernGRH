import React, { useState, useEffect } from 'react'
import axios from 'axios'

function News() {
  const [date, setdate] = useState(new Date().toISOString().split('T')[0])
  const [patient, setPatient] = useState([])

  function getPatient() {
    axios.post('http://localhost:5000/persone')
      .then(response => {
        setPatient(response.data.data)
        console.log(response.data.data);
      })
  }

  useEffect(() => {
    setdate(new Date().toISOString().split('T')[0]);
    getPatient();
  }, [])

  const stagiairesCount = patient.filter(person => person.type === 'stagiaire').length;
  const employersCount = patient.filter(person => person.type === 'employé').length;
  const absencesCount = patient.filter(patient => {
    if (patient.absences) {
        return patient.absences.some(absence => absence.date === date);
    }
    return false;
  });


  return (
    <>
      <img className="menu-item-icon" src={"icons/logoss.gif"} alt="" /> 
      <hr className="style1"></hr>
      <h2 style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}><i className="fa fa-check"></i> Rapport d'aujourd'hui</h2>
      <div className='row mt-2 mb-3 col-md-12' >
        <div className='col-md-4 col-sm-6' style={{ maxWidth: "20rem" }} >
          <div className="card text-white bg-primary mb-3" style={{ height: "130px" }}  >
            <div className="card-body">
              <h5 className="card-title"><i className="fa fa-shopping-bag"></i> Stagiaires</h5>
              <h3 className="card-text"><b>{stagiairesCount}</b> Stagiaire
              </h3>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-sm-6' style={{ maxWidth: "20rem" }} >
          <div className="card text-white bg-warning  mb-3" style={{ height: "130px" }}>
            <div className="card-body">
              <h5 className="card-title"><i className="fa fa-user"></i> Employers</h5>
              <h3 className="card-text"><b>{employersCount}</b> Employer</h3>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-sm-6' style={{ maxWidth: "20rem" }} >
          <div className="card text-white bg-success mb-3" style={{ height: "130px" }} >
            <div className="card-body">
              <h5 className="card-title"><i className="fa fa-gear"></i> Absences </h5>
              <h3 className="card-text"><b>{absencesCount.length}</b> Absence</h3>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-sm-6' style={{ width: "90rem" }}>
        </div>
        <hr className="style1"></hr>
      </div>
    </>
  )
}

export default News