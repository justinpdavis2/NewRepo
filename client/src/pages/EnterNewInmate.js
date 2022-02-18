import classes from "./EnterNewInmate.module.css";
import EnterNewInmateForm from "../components/EnterNewInmate/EnterNewInmateForm";
import WaStateMap from "./WaStateMap.png";

function EnterNewInmate() {
  return (
    <section>
      <div className={classes.container}>
        <div className={classes.column}>
          <h1>Enter New Inmate</h1>
          <EnterNewInmateForm />
        </div>
        <div className={classes.column}>
          <h1>Map of Local Area</h1>
          <img
            className={classes.imgMap}
            src={WaStateMap}
            alt="Map of Washington State"
          />
        </div>
      </div>
    </section>
  );
}

export default EnterNewInmate;
