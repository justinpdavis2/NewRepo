import classes from './AdminPanel.module.css'

function AdminPanelOpened(props){
    function closeAdminPanel(){
        props.onClick();
    }

    return (
        <div className={classes.panelBackground}>
            <button onClick={closeAdminPanel}>Close Window</button>
        </div>
    );
}

export default AdminPanelOpened;