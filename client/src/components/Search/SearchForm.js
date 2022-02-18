import classes from './SearchForm.module.css'
import pageClasses from '../../pages/Search.module.css';
import React from "react";
import Axios from "axios";
import InmateList from '../Inmate/InmateList'

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loadingC: true, counties: null, loadingF: true, facilities: null, loadingR: true, res: null };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    //On submit take user input and send it to server and get the information back from the database
    async handleSubmit(event) {
        event.preventDefault();
        const prisonerInfo = {
            f_name: event.target.elements.firstName.value.toUpperCase(),
            m_initial: event.target.elements.middleName.value.toUpperCase(),
            l_name: event.target.elements.lastName.value.toUpperCase(),
            DOB: event.target.elements.DOB.value,
            sex: event.target.elements.sex.value,
            race: event.target.elements.race.value,
            misdemeanor: event.target.elements.misdemeanor.checked,
            felony: event.target.elements.felony.checked,
            caution: event.target.elements.caution.checked,
            // optionBox: event.target.elements.optionBox.checked,
            leaving: event.target.elements.originatingAgency.value,
            // relayAgency: event.target.elements.relayAgency.value, Currently Not in DB
            destination: event.target.elements.DestinationAgency.value,
            facility: event.target.elements.destinationFacility.value,
            startDate: event.target.elements.startDate.value,
            endDate: event.target.elements.endDate.value,
            type: "AND"
        }
        await this.getSearchResults(prisonerInfo);
    }

    getSearchResults(params) {
        try {
            return new Promise(data => {
                Axios.get("http://localhost:3001/api/get/search", { params }).then((json) => {
                    this.setState({ loadingR: false, res: json.data });
                    data(json);
                });
            });
        } catch (err) {
            alert(err.response.data);
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

    renderInmates(list) {
        if (list === '') {
            return <></>
        } else {
            return <InmateList Inmates={list} />
        }
    }

    render() {
        const { loadingC, counties, loadingF, facilities, loadingR, res } = this.state;
        return (
            <div className={pageClasses.container}>
                <div className={pageClasses.column}>
                    <h1>Search</h1>
                    <section>
                        <form onSubmit={this.handleSubmit} className={classes.grid}>
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

                            <div className={classes.span3}>
                                <label htmlFor="DOB">DOB: </label>
                                <br></br>
                                <input className={classes.maxWidth} type="date" id="DOB" name="DOB"></input>
                            </div>

                            <div className={classes.span3}>
                                <label htmlFor="sex">Sex: </label>
                                <select className={classes.maxWidth} id="sex" name="sex">
                                    <option value=""></option>
                                    <option value="m"> Male </option>
                                    <option value="f"> Female </option>
                                    <option value="x"> X </option>
                                </select>
                            </div>

                            <div className={classes.span2}>
                                <label htmlFor="race">Race: </label>
                                <select className={classes.maxWidth} id="race" name="race">
                                    <option value=""></option>
                                    <option value="w"> W </option>
                                    <option value="b"> B </option>
                                    <option value="m"> M </option>
                                    <option value="i"> I </option>
                                    <option value="a"> A </option>
                                </select>
                            </div>

                            <div className={classes.span8}>
                                <label htmlFor="originatingAgency">Originating Agency</label>
                                <select className={classes.maxWidth} id="originatingAgency" name="originatingAgency">
                                    <option value=""></option>
                                    {loadingC ? <option value=""></option> : this.renderCountyList(counties)}
                                </select>
                            </div>

                            <div className={classes.span8}>
                                <label htmlFor="relayAgency">Relay Agency</label>
                                <select className={classes.maxWidth} id="relayAgency" name="relayAgency">
                                    <option value=""></option>
                                    {loadingC ? <option value=""></option> : this.renderCountyList(counties)}
                                </select>
                            </div>

                            <div className={classes.span8}>
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
                            </div>

                            <div className={classes.span2}>
                                <label htmlFor="startDate">Start Date: </label>
                                <br></br>
                                <input className={classes.maxWidth} type="date" id="startDate" name="startDate"></input>
                            </div>

                            <div className={classes.span2}>
                                <label htmlFor="endDate">End Date: </label>
                                <br></br>
                                <input className={classes.maxWidth} type="date" id="endDate" name="endDate"></input>
                            </div>

                            <div className={classes.span8}>
                                <input className={classes.submitbutton} type="submit" value="Search" />
                            </div>

                        </form>
                    </section>
                </div>

                <div className={pageClasses.column}>
                    <h1>Results</h1>
                    {loadingR ? <option value=""></option> : this.renderInmates(res)}
                </div>
            </div>

        )
    }
}
export default SearchForm;