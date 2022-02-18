import InmateList from "../components/Inmate/InmateList";
import classes from "./TransportList.module.css";
import Axios from "axios";
import React from "react";


class TransportList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loadingD: true, d: null, loadingR: true, r: null, loadingA: true, a: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //TODO Make this variable with the user and the website
  userInfo = {
    county: "Clark",
    date: this.getDate()
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.date = event.target.elements.date.value;
    this.userInfo.date = this.date;
    this.setState({ loadingD: true, d: null, loadingR: true, r: null, loadingA: true, a: null });
    this.componentDidMount();
  }

  componentDidMount() {
    let params = {
      leaving: this.userInfo.county,
      leavingDate: this.userInfo.date,
      relayDate: this.userInfo.date,
      arrivalDate: this.userInfo.date,
      type: "OR"
    }

    Axios.get("http://localhost:3001/api/get/search", { params }).then((json) => {
      this.setState({ loadingD: false, d: json.data });
    });

    // params = {
    //   relay: this.userInfo.county,
    //   leavingDate: this.userInfo.date,
    //   relayDate: this.userInfo.date,
    //   arrivalDate: this.userInfo.date,
    //   type: "OR"
    // }

    // Axios.get("http://localhost:3001/api/get/search", { params }).then((json) => {
    //   this.setState({ loadingR: false, r: json.data });
    // });

    params = {
      destination: this.userInfo.county,
      leavingDate: this.userInfo.date,
      relayDate: this.userInfo.date,
      arrivalDate: this.userInfo.date,
      type: "OR"
    }

    Axios.get("http://localhost:3001/api/get/search", { params }).then((json) => {
      this.setState({ loadingA: false, a: json.data });
    });
  }

  renderInmates(list) {
    if (list === '') {
      return <></>
    } else {
      return <InmateList Inmates={list} />
    }
  }

  getDate() {
    if (this.date === undefined) {
      let d = new Date();
      var offset = d.getTimezoneOffset();
      d.setMinutes(d.getMinutes() - offset)
      let today = d.toISOString().substring(0, 10);
      return today;
    } else {
      return this.date;
    }
  }

  render() {
    const { loadingD, d, loadingR, r, loadingA, a } = this.state;
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.dateSelection}>
            <input className={classes.dateStyling} type="date" id="date" name="date" defaultValue={this.getDate()}></input>
            <input className={classes.submitbutton} type="submit" value="Submit" />
            <button className={classes.buttonStyling}>Print List</button>
          </div>
        </form>
        <div className={classes.container}>
          <div className={classes.column}>
            <h1 className={classes.columnName}>Departures</h1>
            {loadingD ? <option value=""></option> : this.renderInmates(d)}
          </div>

          <div className={classes.column}>
            <h1 className={classes.columnName}>Relay</h1>
            {loadingR ? <option value=""></option> : this.renderInmates(r)}
          </div>

          <div className={classes.column}>
            <h1 className={classes.columnName}>Arrivals</h1>
            {loadingA ? <option value=""></option> : this.renderInmates(a)}
          </div>
        </div>
      </section >
    );
  }
}

export default TransportList;
