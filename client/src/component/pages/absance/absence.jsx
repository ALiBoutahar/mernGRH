import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideNavBar from '../../SideNavBar/SideNavBar';
import { Link } from 'react-router-dom'


function Patients() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        axios.post("http://localhost:5000/persone")
        .then(res => {
            const users = res.data.data;
            setPatients(users);
            // setFilteredPatients(users);
        });
    }, []);

    const searchPatientsByDate = (e) => {
        e.preventDefault();
        setSearchDate("");
        const result = patients.filter(patient => {
            if (patient.absences) {
                return patient.absences.some(absence => absence.date === searchDate);
            }
            return false;
        });
        setFilteredPatients(result);
    }

    // const resetSearch = () => {
    //     setSearchDate('');
    //     setFilteredPatients(patients);
    // }

    return (
        <div className="bodycontant">
            <div className='sidebar'>
                <SideNavBar/>
            </div> 
            <div className='content'></div>
            <div className='container mx-2 mt-1'>
                <div className='container'>
                    <h1 className='w-75 mt-1'> afficher les absances par date</h1>
                    <form className='searchBar my-2' onSubmit={searchPatientsByDate}>
                        <Link to={"/AddAbsance"} className='btn btn-success mx-2'>Ajouter</Link>
                        <input
                            className="form-control mr-sm-2 mx-1"
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            placeholder="Rechercher Personne avec la Date d'Absence"
                            aria-label="Search"
                        />
                        <button className="btn btn-primary btn-sm mr-1" type='submit' >Search</button>
                        {/* <button className="btn btn-secondary btn-sm" onClick={resetSearch}>Reset</button> */}
                    </form>
                    <table className="table table-fixed">
                        <thead style={{backgroundColor: '#D7DBDD'}}>
                            <tr align='center'>
                                <td colSpan={1}>Image</td>
                                <td colSpan={1}>Nom</td>
                                <td colSpan={1}>Prénom</td>
                                <td colSpan={2}>Email</td>
                                <td colSpan={1}>Phone</td>
                                <td colSpan={1}>Service</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map(item => (
                                <tr style={{backgroundColor: '#EAEDED'}} align='center' key={item._id}>
                                    <td className='p-0' colSpan={1}><img src={`/images/files-persones/${item.image}`} alt="" width={70} height={70}/></td>
                                    <td colSpan={1}>{item.nom}</td>
                                    <td colSpan={1}>{item.prenom}</td>
                                    <td colSpan={2}>{item.email}</td>
                                    <td colSpan={1}>{item.tele}</td>
                                    <td colSpan={1}>{item.service}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Patients;
