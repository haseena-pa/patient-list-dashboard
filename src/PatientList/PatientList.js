import PatientCard from '../PatientCard/PatientCard';
import './PatientList.css';

const PatientList = ({ patientList }) => {
    return (
        <section className="patientCards">
            {patientList ?
                patientList.map(patient => {
                    return <PatientCard key={patient.id} {...patient} />
                })
                : <div>No records Found</div>
            }
        </section>
    )
}

export default PatientList;