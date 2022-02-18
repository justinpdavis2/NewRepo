import classes from './AdminPanel.module.css'
import AdminPanelOpened from './AdminPanelOpened'
import { useState } from "react";
import { GiPoliceOfficerHead } from "react-icons/gi";

function AdminPanel(props){
    const [adminPanelOpen, setAdminPanel] = useState(false);

    function openAdminPanel(){
        setAdminPanel(true);
    }

    function closeAdminPanel(){
        setAdminPanel(false);
    }

    return (
        <div>
            {adminPanelOpen && (
                <AdminPanelOpened onClick={closeAdminPanel}/>
            )}
            <div className={classes.defaultBorder} onClick={openAdminPanel}>
                <GiPoliceOfficerHead className={classes.iconStyling}></GiPoliceOfficerHead>
                <br></br>
                <p>Admin Panel</p> 
            </div>
        </div>
    )
}

export default AdminPanel;