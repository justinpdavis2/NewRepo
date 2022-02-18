import classes from './Dashboard.module.css'
import NotificationList from '../components/DashboardModules/NotificationList';
import AdminPanel from '../components/DashboardModules/AdminPanel';
import Axios from 'axios';


const testNotifications = [
    {
        id: "9",
        username: "Jeff",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "10",
        username: "Anne",
        type: "Edited User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "12",
        username: "Darth Vader",
        type: "Deleted User",
        dateTime: "12/4/21 10:44 "
    },
    {
        id: "13",
        username: "Anakin Skywalker",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "9",
        username: "Kiara",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "10",
        username: "Princess Jasmine",
        type: "Edited User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "12",
        username: "Santa Claus",
        type: "Deleted User",
        dateTime: "12/4/21 10:44 "
    },
    {
        id: "13",
        username: "John Cena",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "9",
        username: "Kiara",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "10",
        username: "Princess Jasmine",
        type: "Edited User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "12",
        username: "Santa Claus",
        type: "Deleted User",
        dateTime: "12/4/21 10:44 "
    },
    {
        id: "13",
        username: "John Cena",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    }, {
        id: "9",
        username: "Kiara",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "10",
        username: "Princess Jasmine",
        type: "Edited User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "12",
        username: "Santa Claus",
        type: "Deleted User",
        dateTime: "12/4/21 10:44 "
    },
    {
        id: "13",
        username: "John Cena",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "9",
        username: "Kiara",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "10",
        username: "Princess Jasmine",
        type: "Edited User",
        dateTime: "12/4/21 12:53"
    },
    {
        id: "12",
        username: "Santa Claus",
        type: "Deleted User",
        dateTime: "12/4/21 10:44 "
    },
    {
        id: "13",
        username: "John Cena",
        type: "Created User",
        dateTime: "12/4/21 12:53"
    }
]

function downloadFile(fileName) {
    Axios({
        url: 'http://localhost:3001/api/get/admin/file', //your url
        method: 'GET',
        responseType: 'blob',
        params: { fileName: fileName }
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
    });
}

function Dashboard() {
    return <section>
        <div className={classes.grid}>
            <div className={classes.myProfile}>
                <h1>Notifications</h1>
                <div className={classes.notifications}>
                    <div className={classes.titles}>
                        <div className={classes.tags1}>Username</div>
                        <div className={classes.tags2}>Type</div>
                        <div className={classes.tags3}>Date/Time</div>
                    </div>
                    <NotificationList Notifications={testNotifications} />
                </div>
            </div>

            <div className={classes.forms}>
                <h1>Form Download</h1>
                <button onClick={() => { downloadFile("FILE.txt") }}>Download</button>
            </div>

            <div className={classes.agency}>
                <h1>Agency</h1>
            </div>

            <div className={classes.adminPanel}>
                <h1>Account Settings</h1>
                <div className={classes.accountSettingsGrid}>
                    <form className={classes.resetPasswordGrid}>
                        <label className={classes.changePasswordLabel} htmlFor="newPassword">New Password:</label>
                        <input className={classes.changePasswordField} type="text" id="newPassword" name="newPassword" placeholder="" ></input>
                        <label className={classes.changePasswordLabel} htmlFor="confirmPassword">Confirm Password:</label>
                        <input className={classes.changePasswordField} type="password" id="confirmPassword" name="confirmPassword" placeholder="" ></input>
                        <input className={classes.submitButton} type="submit" value="Update" />
                    </form>

                    <form className={classes.updateNotifications}>
                        <input className={classes.checkmark} type="checkbox" id="pushToEmail" name="pushToEmail" value="pushToEmail"></input>
                        <label className={classes.notificationUpdateLabel} htmlFor="pushToEmail">Push Notifications to Email</label>
                        <input className={classes.checkmark} type="checkbox" id="pushToEmail" name="pushToEmail" value="pushToEmail"></input>
                        <label className={classes.notificationUpdateLabel} htmlFor="pushToEmail">See All Notifications I Create</label>
                        <input className={classes.checkmark} type="checkbox" id="pushToEmail" name="pushToEmail" value="pushToEmail"></input>
                        <label className={classes.notificationUpdateLabel} htmlFor="pushToEmail">See All Associated Notifications</label>
                        <input className={classes.submitButtonNotifications} type="submit" value="Update" />
                    </form>

                    <div className={classes.adminButtonSection}>
                        <AdminPanel />
                    </div>
                </div>
            </div>

        </div>

    </section >
}

export default Dashboard;