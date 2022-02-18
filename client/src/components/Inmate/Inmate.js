import { useState } from "react";
import QuickEdit from "./QuickEdit";
import Expand from "./expand";
import classes from "./Inmate.module.css";
import Axios from "axios";

function Inmate(props) {
  const [quickEditOpen, setQuickEdit] = useState(false);
  const [quickExpandOpen, setQuickExpand] = useState(false);

  function quickEditInmate() {
    setQuickEdit(true);
  }

  function closeQuickEdit() {
    setQuickEdit(false);
  }

  function quickExpand() {
    setQuickExpand(true);
  }

  function closeQuickExpand() {
    setQuickExpand(false);
  }

  function toggleDelete() {
    let params = { transport_id: props.transport_id }
    Axios.post("http://localhost:3001/api/post/toggledelete", params);
  }

  return (
    <div>
      <div>
        {quickEditOpen && <QuickEdit
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
          onClick={closeQuickEdit} />}
        {quickExpandOpen && (
          <Expand
            content={
              <>
                <div className={classes.grid}>
                  <span className={classes.inmateFullName}>
                    Fullname: {props.lastName}, {props.firstName}{" "}
                    {props.middleName}{" "}
                  </span>
                  <span className={classes.DOB}>DOB: {props.DOB} </span>
                  <span className={classes.sex}>Sex: {props.sex} </span>
                  <span className={classes.race}>Race: {props.race} </span>

                  <span className={classes.departure}>
                    Departure: {props.departure}{" "}
                  </span>
                  <span className={classes.destination}>
                    Destination: {props.destination}{" "}
                  </span>
                  <span></span>
                </div>
              </>
            }
            onClick={closeQuickExpand}
          />
        )}
      </div>
      <div className={classes.card}>
        <div className={classes.inmateQuickInfo}>
          <span className={classes.inmateFullName}>
            {" "}
            {props.lastName}, {props.firstName} {props.middleName}{" "}
          </span>
          <button className={classes.expand} onClick={quickExpand}>
            Expand
          </button>

          <span className={classes.DOB}>DOB: {props.DOB} </span>
          <span className={classes.sex}>Sex: {props.sex} </span>
          <span className={classes.race}>Race: {props.race} </span>
          <button className={classes.editButton} onClick={quickEditInmate}>
            Edit
          </button>
          <span className={classes.departure}>
            Departure: {props.departure}{" "}
          </span>
          <span className={classes.destination}>
            Destination: {props.destination}{" "}
          </span>
          <span></span>
          <button className={classes.deleteButton} onClick={toggleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Inmate;
