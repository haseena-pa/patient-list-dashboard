import './PatientCard.css';

const PatientCard = ({ firstName, lastName, nhsNumber, vaccineDate, vaccineType }) => {
    return (
        <div className='patientCard'>
            <div className='patientCard__top'>
                <div className='avatar'>{firstName.charAt(0)}{lastName.charAt(0)}</div>
                <div>
                    <span className='patientName'> {firstName} {lastName} </span>
                </div>
            </div>
            <div className='patientCard__bottom'>
                <strong>{vaccineType}</strong>
                <span>{nhsNumber}</span>
            </div>
        </div>
    )
}

export default PatientCard;