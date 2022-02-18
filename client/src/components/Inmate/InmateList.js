import Inmate from "./Inmate";
import classes from "./InmateList.module.css";

function InmateList(props) {

  function setDOB(DOB) {
    if (DOB === null) {
      return "";
    } else {
      return DOB.substring(0, 10);
    }
  }

  return (
    <ul className={classes.list}>
      {props.Inmates.map((Inmates) => (
        < Inmate
          DOB={setDOB(Inmates.DOB)}
          activity_log={Inmates.activity_log}
          arrivalDate={Inmates.arrivalDate}
          caution={Inmates.caution}
          charge_1={Inmates.charge_1}
          charge_2={Inmates.charge_2}
          charge_3={Inmates.charge_3}
          creationDate={Inmates.creationDate}
          destination={Inmates.destination}
          eye_color={Inmates.eye_color}
          firstName={Inmates.f_name}
          facility={Inmates.facility}
          felony={Inmates.felony}
          hair_color={Inmates.hair_color}
          height={Inmates.height}
          isActive={Inmates.isActive}
          lastName={Inmates.l_name}
          lbs={Inmates.lbs}
          departure={Inmates.leaving}
          leavingDate={Inmates.leavingDate}
          middleName={Inmates.m_initial}
          medical_files={Inmates.medical_files}
          misdemeanor={Inmates.misdemeanor}
          notes={Inmates.notes}
          optn={Inmates.optn}
          other={Inmates.other}
          prisoner_id={Inmates.prisoner_id}
          race={Inmates.race}
          relayDate={Inmates.relayDate}
          sex={Inmates.sex}
          transport_id={Inmates.transport_id}
          warrent_num_1={Inmates.warrent_num_1}
          warrent_num_2={Inmates.warrent_num_2}
          warrent_num_3={Inmates.warrent_num_3}
        />
      ))}
    </ul>
  );
}

export default InmateList;
