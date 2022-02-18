import EditTransport from "../EnterNewInmate/EditTransport"

function EditInmate(props) {

  function cancelQuickEdit() {
    props.onClick();
  }

  function saveQuickEdit() {
    props.onClick();
  }

  return (
    <div className="quickEditBox">
      <h2>Quick Edit Data</h2>
      <div >
        <EditTransport
          DOB={props.DOB}
          activity_log={props.activity_log}
          arrivalDate={props.arrivalDate}
          caution={props.caution}
          charge_1={props.charge_1}
          charge_2={props.charge_2}
          charge_3={props.charge_3}
          creationDate={props.creationDate}
          destination={props.destination}
          eye_color={props.eye_color}
          firstName={props.firstName}
          facility={props.facility}
          felony={props.felony}
          hair_color={props.hair_color}
          height={props.height}
          isActive={props.isActive}
          lastName={props.lastName}
          lbs={props.lbs}
          departure={props.departure}
          leavingDate={props.leavingDate}
          middleName={props.middleName}
          medical_files={props.medical_files}
          misdemeanor={props.misdemeanor}
          notes={props.notes}
          optn={props.optn}
          other={props.other}
          prisoner_id={props.prisoner_id}
          race={props.race}
          relayDate={props.relayDate}
          sex={props.sex}
          transport_id={props.transport_id}
          warrent_num_1={props.warrent_num_1}
          warrent_num_2={props.warrent_num_2}
          warrent_num_3={props.warrent_num_3}
        />
      </div>
      <button className="cancelButton" onClick={cancelQuickEdit}> Cancel </button>
      <button className="saveButton" onClick={saveQuickEdit}> Save </button>
    </div>
  );
}

export default EditInmate;
