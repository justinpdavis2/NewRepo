import classes from "./Inmate.module.css";

function ExpandInmate(props) {
    function cancelQuickEdit(){
        props.onClick();
      }
  
    return (
      <div className={classes.quickEditBox}>
        <h2>Inmate Data</h2>
        <div className={classes.quickEditGrid}>
            {props.content}
        </div>
        <button className={classes.cancelButton} onClick={cancelQuickEdit}> Cancel </button>
      </div>
    );
  }
  
  export default ExpandInmate;