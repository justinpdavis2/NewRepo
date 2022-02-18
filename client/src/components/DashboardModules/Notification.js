import classes from './Notification.module.css'

function Notifications(props) {
    return (
        <div className={classes.grid}>
            <p>{props.username}</p>
            <p className={classes.defualt}>{props.type}</p>
            <p className={classes.defualt1}>{props.dateTime}</p>
        </div>
    );
}

export default Notifications;