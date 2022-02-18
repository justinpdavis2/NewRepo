import classes from './EnterNewInmateForm.module.css'
//import React from "react";
import Axios from "axios";
import React from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



class EditTransport extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loadingC: true, counties: null, loadingF: true, facilities: null };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileIDs = [];
        this.changedFields = [];
        this.changedValues = [];
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setUpdateInfo();

        let info = {}
        this.changedFields.forEach((key, i) => info[key] = this.changedValues[i]);
        if (this.fileIDs.length > 0) {
            info.medical_files = this.fileIDs;
        }
        if (Object.keys(info).length === 0) {
            return;
        }
        info.transport_id = this.props.transport_id;
        try {
            let result = await Axios.post("http://localhost:3001/api/edit/transport", info);
            console.log(result);
            if (result.status === 200) {
                //Clear Page
                alert("Successful Edit!");
                this.fileIDs = [];
                this.changedFields = [];
                this.changedValues = [];
            }

        } catch (error) {
            console.error(error);
            if (error.response.data.sqlMessage !== undefined) {
                alert(error.response.data.sqlMessage);
            } else {
                alert(error.response.data);
            }
        }
    }

    componentDidMount() {
        Axios.get("http://localhost:3001/api/get/counties")
            .then((json) => {
                this.setState({ loadingC: false, counties: json.data });
            });

        Axios.get("http://localhost:3001/api/get/facilities")
            .then((json) => {
                this.setState({ loadingF: false, facilities: json.data });
            });
    }

    renderCountyList = (data) => {
        return (
            <>{
                data.map((item) => (
                    <option value={item}>{item} County</option>
                ))
            }</>
        );
    }

    renderFacilityList = (data) => {
        return (
            <>{
                data.map((item) => (
                    <option value={item}>{item}</option>
                ))
            }</>
        );
    }

    setDate(d) {
        if (d === undefined || d === null) {
            return "";
        }
        return d.substring(0, 10);
    }

    getFileNum() {
        if (this.props.medical_files === null || this.props.medical_files === undefined) {
            return 0;
        }
        let a = (this.props.medical_files.match(new RegExp(",", "g")) || [])
        if (a.length > 0) {
            return a.length + 1;
        } else {
            return 0;
        }
    }

    setUpdateInfo() {
        var elements = document.getElementById("editForm").elements;
        // eslint-disable-next-line no-cond-assign
        for (var i = 0, element; element = elements[i++];) {
            if (element.type === "text" || element.type === "textarea" || element.type === "date") {
                if (element.value !== element.defaultValue) {
                    if (element.id === "f_name" || element.id === "m_initial" || element.id === "l_name") {
                        element.value = element.value.toUpperCase();
                    }
                    this.changedFields.push(element.id);
                    this.changedValues.push(element.value);
                }
            } else if (element.type === "checkbox") {
                if (element.checked !== element.defaultChecked) {
                    this.changedFields.push(element.id);
                    this.changedValues.push(element.checked);
                }
            } else if (element.type === "select-one") {
                if (element.options[element.selectedIndex].value !== 'none') {
                    this.changedFields.push(element.id);
                    this.changedValues.push(element.options[element.selectedIndex].value);
                }
            }
        }

    }


    render() {
        const { loadingC, counties, loadingF, facilities } = this.state;
        return <section>
            <form id='editForm' onSubmit={this.handleSubmit} className={classes.grid}>
                <div className={classes.span3}>
                    <label htmlFor="lastName">Last Name:</label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="l_name" name="lastName" placeholder="Last Name" defaultValue={this.props.lastName}></input>
                </div>

                <div className={classes.span3}>
                    <label htmlFor="firstName">First Name:</label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="f_name" name="firstName" placeholder="First Name" defaultValue={this.props.firstName}></input>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="middleName">Middle Initial:</label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="m_initial" name="middleName" placeholder="Middle Initial" defaultValue={this.props.middleName}></input>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="DOB">DOB: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="date" id="DOB" name="DOB" defaultValue={this.setDate(this.props.DOB)}></input>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="sex">Sex: </label>
                    <select className={classes.maxWidth} id="sex" name="sex">
                        <option value="none" hidden>{this.props.sex}</option>
                        <option value="M"> Male </option>
                        <option value="F"> Female </option>
                        <option value="X"> X </option>
                    </select>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="race">Race: </label>
                    <select className={classes.maxWidth} id="race" name="race">
                        <option value="none" hidden>{this.props.race}</option>
                        <option value="W"> W </option>
                        <option value="B"> B </option>
                        <option value="H"> H </option>
                        <option value="I"> I </option>
                        <option value="A"> A </option>
                        <option value="P"> P </option>
                    </select>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="other">Other: </label>
                    <input className={classes.maxWidth} type="text" id="other" name="other" placeholder="ex: scars, birthmarks, injuries" defaultValue={this.props.other}></input>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="height">Height (ft):</label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="height" name="height" placeholder="ex: 507" defaultValue={this.props.height}></input>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="weight">Weight (lb):</label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="lbs" name="weight" placeholder="ex: 098" defaultValue={this.props.lbs}></input>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="hair">Hair Color: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="hair_color" name="hair" placeholder="ex: blonde" defaultValue={this.props.hair_color}></input>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="eye">Eye Color: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="eye_color" name="eye" placeholder="ex: blue" defaultValue={this.props.eye_color}></input>
                </div>

                <div className={classes.span3}>
                    <label htmlFor="warrant">Warrant #: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="warrent_num_1" name="warrant1" defaultValue={this.props.warrent_num_1}></input>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="warrent_num_2" name="warrant2" defaultValue={this.props.warrent_num_2}></input>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="warrent_num_3" name="warrant3" defaultValue={this.props.warrent_num_3}></input>
                </div>

                <div className={classes.span3}>
                    <label htmlFor="charge">Charge: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="charge_1" name="charge1" defaultValue={this.props.charge_1}></input>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="charge_2" name="charge2" defaultValue={this.props.charge_2}></input>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="charge_3" name="charge3" defaultValue={this.props.charge_3}></input>
                </div>

                <div className={classes.fullspan1}>
                    <div className={classes.span3}>
                        <input className={classes.checkmark} type="checkbox" id="misdemeanor" name="misdemeanor" value="misdemeanor" defaultChecked={this.props.misdemeanor}></input>
                        <label htmlFor="misdemeanor"> Misdemeanor </label>
                    </div>

                    <div className={classes.span3}>
                        <input className={classes.checkmark} type="checkbox" id="felony" name="felony" value="felony" defaultChecked={this.props.felony}></input>
                        <label htmlFor="felony"> Felony </label>
                    </div>

                    <div className={classes.span3}>
                        <input className={classes.checkmark} type="checkbox" id="caution" name="caution" value="caution" defaultChecked={this.props.caution}></input>
                        <label htmlFor="caution"> Caution </label>
                    </div>

                    <div className={classes.span3}>
                        <input className={classes.checkmark} type="checkbox" id="optn" name="optionBox" value="option" defaultChecked={this.props.optn}></input>
                        <label htmlFor="optionBox"> Option </label>
                    </div>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="originatingAgency">Originating Agency</label>
                    <select className={classes.maxWidth} id="leaving" name="originatingAgency">
                        <option value="none" hidden>{this.props.departure} County</option>
                        <option value=""></option>
                        {loadingC ? <option value=""></option> : this.renderCountyList(counties)}
                    </select>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="DestinationAgency">Destination Agency</label>
                    <select className={classes.maxWidth} id="destination" name="DestinationAgency">
                        <option value="none" hidden>{this.props.destination} County</option>
                        {loadingC ? <option value=""></option> : this.renderCountyList(counties)}
                    </select>
                </div>

                <div className={classes.customSelect}>
                    <label htmlFor="destinationFacility">Destination Facility (If Known)</label>
                    <select className={classes.maxWidth} id="facility" name="destinationFacility">
                        <option value="none" hidden>{this.props.facility} County</option>
                        {loadingF ? <option value=""></option> : this.renderFacilityList(facilities)}
                    </select>
                </div>

                <div className={classes.span3}>
                    <label htmlFor="tripDate1">Trip Date: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="date" id="leavingDate" name="tripDate1" defaultValue={this.setDate(this.props.leavingDate)}></input>
                    <br></br>
                    <label htmlFor="tripLegs1">Trip Leg 1: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="tripLegs1" name="tripLegs1"></input>
                </div>

                <div className={classes.span3}>
                    <label htmlFor="tripDate2">Trip Date: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="date" id="relayDate" name="tripDate2" defaultValue={this.setDate(this.props.relayDate)}></input>
                    <br></br>
                    <label htmlFor="tripLegs2">Trip Leg 2: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="tripLegs2" name="tripLegs2"></input>
                </div>

                <div className={classes.span2}>
                    <label htmlFor="tripDate3">Trip Date: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="date" id="arrivalDate" name="tripDate3" defaultValue={this.setDate(this.props.arrivalDate)}></input>
                    <br></br>
                    <label htmlFor="tripLegs3">Trip Leg 3: </label>
                    <br></br>
                    <input className={classes.maxWidth} type="text" id="tripLegs3" name="tripLegs3"></input>
                </div>

                <div className={classes.span4}>
                    <label htmlFor="fileUpload">File Upload: </label><br></br>
                    <FilePond
                        ref={(ref) => (this.pond = ref)}
                        files={this.state.files}
                        allowMultiple={true}
                        maxFiles={10}
                        allowRevert={false}
                        name='pond'
                        server={{
                            url: "http://localhost:3001/api/post/file",
                            process: {
                                onload: (res) => {
                                    this.fileIDs.push(res);
                                }
                            }
                        }}
                        credits={null}
                    ></FilePond>
                    <p>Files Uploaded: {this.getFileNum()}</p>
                </div>

                <div className={classes.span4}>
                    <label htmlFor="textarea">Notes</label>

                    <textarea id="notes" name="textarea" className={classes.textarea} defaultValue={this.props.notes}></textarea>
                </div>

                <div className={classes.span8}>
                    <input className={classes.submitbutton} type="submit" value="Submit" />
                </div>

            </form>
        </section >
    }
}

export default EditTransport;