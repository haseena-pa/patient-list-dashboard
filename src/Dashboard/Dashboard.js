import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import PatientList from '../PatientList/PatientList';

function Dashboard() {

    const [patientList, setPatientList] = useState([]);
    const [isSearchInitiated, setIsSearchInitiated] = useState(false);
    const selectRef = useRef("");
    const searchRef = useRef("");
    const patientListUrl = 'https://61ba219448df2f0017e5a929.mockapi.io/api/patients';

    //get the patient list from api.
    useEffect(() => {
        const getPatientList = async () => {
            const patients = await axios.get(patientListUrl).catch(err => console.log(err));
            setPatientList(patients.data);
        };
        getPatientList();
    }, []);

    function getSortOption() {
        let patientListCopy = [...patientList];
        if (selectRef.current.value === "asc") {
            setPatientList(patientListCopy.sort((a, b) => a.lastName.localeCompare(b.lastName)));
        } else if (selectRef.current.value === "desc") {
            setPatientList(patientListCopy.sort((a, b) => b.lastName.localeCompare(a.lastName)));
        }
    }

    const searchByName = async () => {
        const searchKey = searchRef.current.value;
        if (searchKey.length >= 2 || (searchKey.length < 2 && isSearchInitiated)) {
            const patients = await axios.get(patientListUrl + '?search=' + searchKey).catch(err => console.log(err));
            setPatientList(patients.data);
            if (searchKey.length >= 2) {
                setIsSearchInitiated(true);
            }
        } else if (searchKey.length === 0) {
            setIsSearchInitiated(false);
        }
    }


    return (
        <div className='dashboard'>
            <h2>accuBook Dahboard</h2>
            <div className='searchBar'>
                <label>Search a Patient</label>
                <input type="search" id="searchBox" className="searchBoxInput" ref={searchRef} onChange={searchByName} placeholder="eg: John" />
            </div>
            <div className='sortList'>
                <select className='sortByName' name="sortByName" id="sortByName" ref={selectRef} onChange={getSortOption} defaultValue="">
                    <option value="" disabled>Sort by Patient Last Name</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <PatientList patientList={patientList} />
        </div>

    )
}

export default Dashboard;