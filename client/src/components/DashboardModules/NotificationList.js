import Notification from './Notification'
import classes from './NotificationList.module.css'

function NotificationList(props) {
    return <ul className={classes.list}>
        {props.Notifications.map(Notifications =>
        <Notification
        key={Notifications.id}
        id={Notifications.id}
        username={Notifications.username}
        type={Notifications.type}
        dateTime={Notifications.dateTime}/>)}
    </ul>
}

export default NotificationList;