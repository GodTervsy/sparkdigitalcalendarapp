import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Moment from "moment";
import Swal from "sweetalert2";
import * as firebase from "firebase";

const deploytimes = [
  //Specifying the timeframes for each time of day as well as Non Standard deployments.
  {
    value: "Morning",
    label: "07 - 09:30 AM"
  },
  {
    value: "Afternoon",
    label: "01 - 02 PM"
  },
  {
    value: "Evening",
    label: "07 - 08 PM"
  },
  {
    value: "Non Standard",
    label: "Non Standard"
  }
];
const environments = [
  //Specifying each of the development environments available.
  {
    value: "INT01",
    label: "INT01"
  },
  {
    value: "INT02",
    label: "INT02"
  },
  {
    value: "INT03",
    label: "INT03"
  },
  {
    value: "INT04",
    label: "INT04"
  },
  {
    value: "NFT",
    label: "NFT"
  },
  {
    value: "STAGING",
    label: "STAGING"
  }
];
const systems = [
  //Specifying each of the development systems
  {
    value: "Siebel",
    label: "Siebel"
  },
  {
    value: "OM",
    label: "OM"
  },
  {
    value: "AS",
    label: "AS"
  },
  {
    value: "NPM",
    label: "NPM"
  },
  {
    value: "BOS",
    label: "BOS"
  },
  {
    value: "EMA",
    label: "EMA"
  },
  {
    value: "Granite",
    label: "Granite"
  },
  {
    value: "ABS",
    label: "ABS"
  },
  {
    value: "API",
    label: "API"
  },
  {
    value: "SV",
    label: "SV"
  },
  {
    value: "ICMS",
    label: "ICMS"
  },
  {
    value: "Online/AEMSV",
    label: "Online/AEM"
  },
  {
    value: "FUSE",
    label: "FUSE"
  },
  {
    value: "SV Catalogue",
    label: "SV Catalogue"
  },
  {
    value: "CRM Catalogue",
    label: "CRM Catalogue"
  },
  {
    value: "Online Catalogue",
    label: "Online Catalogue"
  }
];

const nonStandardDeployTimes = [
  //For Non Standard releases, specifying the list of available deployment times, increasing in 30 minute intervals, from 7:00 AM to 8:00 PM
  {
    value: "7:00 AM",
    label: "0700"
  },
  {
    value: "7:30 AM",
    label: "0730"
  },
  {
    value: "8:00 AM",
    label: "0800"
  },
  {
    value: "8:30 AM",
    label: "0830"
  },
  {
    value: "9:00 AM",
    label: "0900"
  },
  {
    value: "9:30 AM",
    label: "0930"
  },
  {
    value: "10:00 AM",
    label: "1000"
  },
  {
    value: "10:30 AM",
    label: "1030"
  },
  {
    value: "11:00 AM",
    label: "1100"
  },
  {
    value: "11:30 AM",
    label: "1130"
  },
  {
    value: "12:00 PM",
    label: "1200"
  },
  {
    value: "12:30 PM",
    label: "1230"
  },
  {
    value: "1:00 PM",
    label: "1300"
  },
  {
    value: "1:30 PM",
    label: "1330"
  },
  {
    value: "2:00 PM",
    label: "1400"
  },
  {
    value: "2:30 PM",
    label: "1430"
  },
  {
    value: "3:00 PM",
    label: "1500"
  },
  {
    value: "3:30 PM",
    label: "1530"
  },
  {
    value: "4:00 PM",
    label: "1600"
  },
  {
    value: "4:30 PM",
    label: "1630"
  },
  {
    value: "5:00 PM",
    label: "1700"
  },
  {
    value: "5:30 PM",
    label: "1730"
  },
  {
    value: "6:00 PM",
    label: "1800"
  },
  {
    value: "6:30 PM",
    label: "1830"
  },
  {
    value: "7:00 PM",
    label: "1900"
  },
  {
    value: "7:30 PM",
    label: "1930"
  },
  {
    value: "8:00 PM",
    label: "2000"
  }
];

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      currentDate =
        today.getFullYear() +
        "-" +
        Moment(today.getMonth() + 1).format("MM") +
        "-" +
        today.getDate();
    //Getting the current date and formatting it to fit browser conventions (yyyy-MM-dd for Chrome)

    this.state = {
      reldate: currentDate
    };
  }

  state = {
    open: false,
    relnum: "",
    reldate: new Date(),
    textValue: ""
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date }); //Handling the change made to the date selector in the deployment form.
  };

  handleClickOpen = () => {
    this.setState({ open: true }); //Handling the onClickOpen event for the "Add Deployment" button.
  };

  handleClose = () => {
    this.setState({ open: false }); //Handling the onClose event for the "Add Deployment" button.
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value //Handling the onChange event for each of the text fields in the deployment form.
    });
  };

  AddRelease = () => {
    var that = this;

    if (
      this.state.reldate === undefined ||
      this.state.system === undefined ||
      this.state.version === undefined ||
      this.state.whendep === undefined ||
      (this.state.nonStandardDep === undefined &&
        that.state.whendep === "Non Standard") ||
      this.state.wheredep === undefined ||
      this.state.details === ""
    ) {
      Swal({
        title: "Invalid Input",
        html:
          "Please fill in all required text fields.<br><br>NOTE: If you are deploying at a Non Standard time, please ensure you have selected a time from the corresponding drop-down list.",
        type: "error",
        confirmButtonText: "OK"
      });
      //Accounting for any text fields that return a value of "undefined", as this cannot be processed by Firebase.
    } else if (this.props.releaseId === "") {
      Swal({
        title: "Error Identifying Release",
        html:
          "A release has not been chosen.<br>Please choose one using the selector found at the bottom of the page.",
        type: "error",
        confirmButtonText: "OK"
      });
      //Accounting for a release not being chosen on launch.
      this.setState({
        open: false,
        system: undefined,
        version: undefined,
        whendep: undefined,
        nonStandardDep: undefined,
        wheredep: undefined,
        details: undefined
      });
      //Setting the state of each text field to be "undefined", clearing the text fields to avoid any repeated invalid inputs.
    } else {
      if (that.state.whendep !== "Non Standard") {
        const Deployment = {
          Component: this.state.system || null,
          detail: this.state.details || null,
          status: "Pending",
          version: this.state.version || null
        };
        var ref = firebase
          .database()
          .ref()
          .child("releases");
        var depRef = ref.orderByChild("relnum").equalTo(this.props.releaseId);
        depRef.once("value", function(snapshot) {
          snapshot.forEach(function(deployment) {
            ref
              .child(deployment.key)
              .child("Deployments")
              .child(that.state.reldate)
              .child(that.state.wheredep)
              .child(that.state.whendep)
              .push(Deployment);
            //Pushing the above specified constant "Deployment" into the Firebase database if "whendep" is not equal to "Non Standard".
          });
        });
      } else if (that.state.whendep === "Non Standard") {
        const Deployment = {
          Component: this.state.system || null,
          detail: this.state.details || null,
          status: "Pending",
          version: this.state.version || null,
          depTime: this.state.nonStandardDep || null
        };
        var nonStandardRef = firebase
          .database()
          .ref()
          .child("releases");
        var nonStandardDepRef = nonStandardRef
          .orderByChild("relnum")
          .equalTo(this.props.releaseId);
        nonStandardDepRef.once("value", function(snapshot) {
          snapshot.forEach(function(deployment) {
            nonStandardRef
              .child(deployment.key)
              .child("Deployments")
              .child(that.state.reldate)
              .child(that.state.wheredep)
              .child(that.state.whendep)
              .push(Deployment);
            //Pushing the above specified constant "Deployment" into the Firebase database if "whendep" is equal to "Non Standard".
          });
        });
      }
      Swal({
        title: "Deployment Added",
        text: "The Deployment has been added successfully.",
        type: "success",
        showConfirmButton: false,
        timer: 1600
      });
      //Confirming a deployment has been added successfully.
      this.setState({
        open: false,
        system: undefined,
        version: undefined,
        whendep: undefined,
        nonStandardDep: undefined,
        wheredep: undefined,
        details: undefined
      });
    }
    this.setState({
      open: false //Setting the "open" state of the dialog to false, which closes the dialog.
    });
  };

  render() {
    return (
      //All components to be shown on the webpage are initalised here. Components wrapped in an outer <div> tag as JSX can only render a single expression with nested expressions.
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={
            this.handleClickOpen
          } /* Binding the onClick handler for the "Add Deployment" button to the "handleClickOpen" method */
        >
          Add Deployment
        </Button>
        <Dialog
          open={this.state.open}
          onClose={
            this.handleClose
          } /* Binding the onClose handler for the "Add Deployment" dialog to the "handleClose" method */
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Add Deployment for Release {this.props.releaseId}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>T####### : Deployment Details</DialogContentText>
            <form>
              <TextField /* The first Text Field, containing the date selector. Users can select a date from a calendar view. */
                className="date"
                name="reldate"
                type="date"
                fullWidth
                onChange={this.handleChange(
                  "reldate"
                )} /* Binding the onChange handler for the Text Field, passing in the "reldate" parameter */
                value={this.state.reldate}
                defaultValue={this.state.currentDate}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField /* The second Text Field, containing a drop-down list. Users can select a component from the list. */
                select
                fullWidth
                value={this.state.system}
                onChange={this.handleChange(
                  "system"
                )} /* Binding the onChange handler for the Text Field, passing in the "system" parameter */
                helperText="Which component are you deploying?"
                margin="normal"
              >
                {systems.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {" "}
                    {/* Calling the higher order "map" method to return the above "systems" array and display it in the drop-down list. */}
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField /* The third Text Field. Users can manually enter the version code they wish to deploy. */
                fullWidth
                value={this.state.version}
                onChange={this.handleChange(
                  "version"
                )} /* Binding the onChange handler for the Text Field, passing in the "version" parameter */
                helperText="Which version are you deploying?"
                margin="normal"
              />
              <TextField /* The fourth Text Field, containing a drop-down list. Users can select what time of day they are deploying (Morning, Afternoon, Evening or Non Standard.) */
                select
                fullWidth
                value={this.state.whendep}
                onChange={this.handleChange(
                  "whendep"
                )} /* Binding the onChange handler for the Text Field, passing in the "whendep" parameter */
                helperText="When are you deploying?"
                margin="normal"
              >
                {deploytimes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {" "}
                    {/* Calling the higher order "map" method to return the above "deployTimes" array and display it in the drop-down list. */}
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField /* The fifth Text Field, containing a drop-down list. If users are deploying Non Standard, they can select what time they are deploying, ranging from 7 AM to 8 PM. Otherwise, the option is disabled.*/
                select
                disabled={this.state.whendep !== "Non Standard" ? true : false}
                fullWidth
                value={this.state.nonStandardDep}
                onChange={this.handleChange(
                  "nonStandardDep"
                )} /* Binding the onChange handler for the Text Field, passing in the "nonStandardDep" parameter */
                helperText="What time are you deploying at (Non Standard only)?"
                margin="normal"
              >
                {nonStandardDeployTimes.map(option => (
                  <MenuItem key={option.label} value={option.label}>
                    {" "}
                    {/* Calling the higher order "map" method to return the above "nonStandardDeployTimes" array and display it in the drop-down list. */}
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField /* The sixth Text Field, containing a drop-down list. Users can select what environment they are deploying in (Eg. INT01, NFT, STAGING etc.)  */
                select
                fullWidth
                value={this.state.wheredep}
                onChange={this.handleChange(
                  "wheredep"
                )} /* Binding the onChange handler for the Text Field, passing in the "wheredep" parameter */
                helperText="Where are you deploying?"
                margin="normal"
              >
                {environments.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {" "}
                    {/* Calling the higher order "map" method to return the above "environments" array and display it in the drop-down list. */}
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField /* The seventh and final Text Field. Users can manually enter the details about the component they are deploying. */
                id="standard-textarea"
                placeholder="Details"
                multiline
                fullWidth
                margin="normal"
                value={this.state.details}
                onChange={this.handleChange(
                  "details"
                )} /* Binding the onChange handler for the Text Field, passing in the "details" parameter */
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {" "}
              {/* Binding the onClick handler for the "Cancel" button to the "handleClose" method */}
              Cancel
            </Button>
            <Button
              onClick={this.AddRelease}
              color="primary"
              variant="contained"
            >
              {" "}
              {/* Binding the onClick handler for the "Add" button to the "AddRelease" method */}
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
