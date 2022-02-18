import classes from './EnterNewInmateForm.module.css'
import Axios from "axios";
import React from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



class EnterNewInmateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loadingC: true, counties: null, loadingF: true, facilities: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileIDs = [];
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const prisonerInfo = {
      f_name: event.target.elements.firstName.value.toUpperCase(),
      m_initial: event.target.elements.middleName.value.toUpperCase(),
      l_name: event.target.elements.lastName.value.toUpperCase(),
      DOB: event.target.elements.DOB.value,
      sex: event.target.elements.sex.value,
      race: event.target.elements.race.value,
      other: event.target.elements.other.value,
      height: event.target.elements.height.value,
      lbs: event.target.elements.weight.value,
      hair_color: event.target.elements.hair.value,
      eye_color: event.target.elements.eye.value,
      warrent_num_1: event.target.elements.warrant1.value,
      warrent_num_2: event.target.elements.warrant2.value,
      warrent_num_3: event.target.elements.warrant3.value,
      charge_1: event.target.elements.charge1.value,
      charge_2: event.target.elements.charge2.value,
      charge_3: event.target.elements.charge3.value,
      misdemeanor: event.target.elements.misdemeanor.checked,
      felony: event.target.elements.felony.checked,
      caution: event.target.elements.caution.checked,
      optn: event.target.elements.optionBox.checked,
      leaving: event.target.elements.originatingAgency.value,
      destination: event.target.elements.DestinationAgency.value,
      facility: event.target.elements.destinationFacility.value,
      leavingDate: event.target.elements.tripDate1.value,
      relayDate: event.target.elements.tripDate2.value,
      arrivalDate: event.target.elements.tripDate3.value,
      notes: event.target.elements.textarea.value,
      medical_files: this.fileIDs
    }

    try {
      let result = await Axios.post("http://localhost:3001/api/post/transport", prisonerInfo)
      console.log(result);
      if (result.status === 200) {
        //Clear Page
        alert("Successful Insert!");
        document.getElementById("insert").reset();
        this.pond.removeFiles();
        this.fileIDs = [];
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

  render() {
    const { loadingC, counties, loadingF, facilities } = this.state;
    return <section>
      <form onSubmit={this.handleSubmit} className={classes.grid} id="insert">
        <div className={classes.span3}>
          <label htmlFor="lastName">Last Name:</label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="lastName" name="lastName" placeholder="Last Name"></input>
        </div>

        <div className={classes.span3}>
          <label htmlFor="firstName">First Name:</label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="firstName" name="firstName" placeholder="First Name" ></input>
        </div>

        <div className={classes.span2}>
          <label htmlFor="middleName">Middle Initial:</label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="middleName" name="middleName" placeholder="Middle Initial"></input>
        </div>

        <div className={classes.span2}>
          <label htmlFor="DOB">DOB: </label>
          <br></br>
          <input className={classes.maxWidth} type="date" id="DOB" name="DOB"></input>
        </div>

        <div className={classes.span2}>
          <label htmlFor="sex">Sex: </label>
          <select className={classes.maxWidth} id="sex" name="sex">
            <option value="M"> Male </option>
            <option value="F"> Female </option>
            <option value="X"> X </option>
          </select>
        </div>

        <div className={classes.span2}>
          <label htmlFor="race">Race: </label>
          <select className={classes.maxWidth} id="race" name="race">
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
          <input className={classes.maxWidth} type="text" id="other" name="other" placeholder="ex: scars, birthmarks, injuries"></input>
        </div>

        <div className={classes.span2}>
          <label htmlFor="height">Height (ft):</label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="height" name="height" placeholder="ex: 507" ></input>
        </div>

        <div className={classes.span2}>
          <label htmlFor="weight">Weight (lb):</label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="weight" name="weight" placeholder="ex: 098" ></input>
        </div>

        <div className={classes.span2}>
          <label htmlFor="hair">Hair Color: </label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="hair" name="hair" placeholder="ex: blonde" ></input>
        </div>

        <div className={classes.span2}>
          <label htmlFor="eye">Eye Color: </label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="eye" name="eye" placeholder="ex: blue" ></input>
        </div>

        <div className={classes.span3}>
          <label htmlFor="warrant">Warrant #: </label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="warrant1" name="warrant1"></input>
          <br></br>
          <input className={classes.maxWidth} type="text" id="warrant2" name="warrant2"></input>
          <br></br>
          <input className={classes.maxWidth} type="text" id="warrant3" name="warrant3"></input>
        </div>

        <div className={classes.span3}>
          <label htmlFor="charge">Charge: </label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="charge1" name="charge1"></input>
          <br></br>
          <input className={classes.maxWidth} type="text" id="charge2" name="charge2"></input>
          <br></br>
          <input className={classes.maxWidth} type="text" id="charge3" name="charge3"></input>
        </div>

        <div className={classes.fullspan1}>
          <div className={classes.span3}>
            <input className={classes.checkmark} type="checkbox" id="misdemeanor" name="misdemeanor" value="misdemeanor"></input>
            <label htmlFor="misdemeanor"> Misdemeanor </label>
          </div>

          <div className={classes.span3}>
            <input className={classes.checkmark} type="checkbox" id="felony" name="felony" value="felony"></input>
            <label htmlFor="felony"> Felony </label>
          </div>

          <div className={classes.span3}>
            <input className={classes.checkmark} type="checkbox" id="caution" name="caution" value="caution"></input>
            <label htmlFor="caution"> Caution </label>
          </div>

          <div className={classes.span3}>
            <input className={classes.checkmark} type="checkbox" id="optionBox" name="optionBox" value="option"></input>
            <label htmlFor="optionBox"> Option </label>
          </div>
        </div>

        <div className={classes.span2}>
          <label htmlFor="originatingAgency">Originating Agency</label>
          <select className={classes.maxWidth} id="originatingAgency" name="originatingAgency">
            <option value=""></option>
            {loadingC ? <option value=""></option> : this.renderCountyList(counties)}
          </select>
        </div>

        <div className={classes.span2}>
          <label htmlFor="DestinationAgency">Destination Agency</label>
          <select className={classes.maxWidth} id="DestinationAgency" name="DestinationAgency">
            <option value=""></option>
            {loadingC ? <option value=""></option> : this.renderCountyList(counties)}
          </select>
        </div>

        <div className={classes.customSelect}>
          <label htmlFor="destinationFacility">Destination Facility (If Known)</label>
          <select className={classes.maxWidth} id="destinationFacility" name="destinationFacility">
            <option value=""></option>
            {loadingF ? <option value=""></option> : this.renderFacilityList(facilities)}
          </select>
        </div>

        <div className={classes.span3}>
          <label htmlFor="tripDate1">Trip Date: </label>
          <br></br>
          <input className={classes.maxWidth} type="date" id="tripDate1" name="tripDate1"></input>
          <br></br>
          <label htmlFor="tripLegs1">Trip Leg 1: </label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="tripLegs1" name="tripLegs1"></input>
        </div>

        <div className={classes.span3}>
          <label htmlFor="tripDate2">Trip Date: </label>
          <br></br>
          <input className={classes.maxWidth} type="date" id="tripDate2" name="tripDate2"></input>
          <br></br>
          <label htmlFor="tripLegs2">Trip Leg 2: </label>
          <br></br>
          <input className={classes.maxWidth} type="text" id="tripLegs2" name="tripLegs2"></input>
        </div>

        <div className={classes.span2}>
          <label htmlFor="tripDate3">Trip Date: </label>
          <br></br>
          <input className={classes.maxWidth} type="date" id="tripDate3" name="tripDate3"></input>
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
        </div>

        <div className={classes.span4}>
          <label htmlFor="textarea">Notes</label>

          <textarea id="textarea" name="textarea" className={classes.textarea}></textarea>
        </div>

        <div className={classes.span8}>
          <input className={classes.submitbutton} type="submit" value="Submit" />
        </div>

      </form>
    </section >
  }
}

export default EnterNewInmateForm;