import React from "react";

import Swal from "sweetalert2";

import Chip from "@material-ui/core/Chip";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";

import DialogContent from "@material-ui/core/DialogContent";

import DialogContentText from "@material-ui/core/DialogContentText";

import DialogTitle from "@material-ui/core/DialogTitle";

import * as firebase from "firebase";

import Moment from "moment";

const styles = theme => ({
  root: {
    display: "flex",

    justifyContent: "center",

    flexWrap: "wrap"
  },

  chip: {
    margin: 5
  }
});

class chips extends React.Component {
  state = {
    open: false,
    reldate: new Date(),
    id: this.props.comp.id
  };

  handleDelete = id => {
    Swal({
      title: "Are you sure you want to delete this deployment?",
      text: "This action cannot be undone",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Deployment",
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        var delKeyRef = firebase
          .database()
          .ref()
          .child("releases");

        delKeyRef.once("value", function(snapshot) {
          snapshot.forEach(function(deployment) {
            var delDateRef = firebase
              .database()
              .ref()
              .child("releases")
              .child(deployment.key)
              .child("Deployments");

            delDateRef.once("value", function(snapshot) {
              snapshot.forEach(function(date) {
                var delEnvRef = firebase
                  .database()
                  .ref()
                  .child("releases")
                  .child(deployment.key)
                  .child("Deployments")
                  .child(date.key);

                delEnvRef.once("value", function(snapshot) {
                  snapshot.forEach(function(environment) {
                    var delChipRef = firebase
                      .database()
                      .ref()
                      .child("releases")
                      .child(deployment.key)
                      .child("Deployments")
                      .child(date.key)
                      .child(environment.key);

                    delChipRef.once("value", function(snapshot) {
                      snapshot.forEach(function(chip) {
                        var delStatusRef = firebase
                          .database()
                          .ref()
                          .child("releases")
                          .child(deployment.key)
                          .child("Deployments")
                          .child(date.key)
                          .child(environment.key)
                          .child(chip.key);

                        delStatusRef.once("value", function(snapshot) {
                          snapshot.forEach(function(status) {
                            if (status.key === id) {
                              firebase
                                .database()
                                .ref("releases")
                                .child(deployment.key)
                                .child("Deployments")
                                .child(date.key)
                                .child(environment.key)
                                .child(chip.key)
                                .child(status.key)
                                .remove();
                            }
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });

        Swal({
          title: "Deployment Deleted",
          text: "The Deployment has successfully been deleted.",
          type: "success",
          showConfirmButton: false,
          timer: 1600
        });
      }
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleComplete(id) {
    var keyRef = firebase
      .database()
      .ref()
      .child("releases");

    keyRef.once("value", function(snapshot) {
      snapshot.forEach(function(deployment) {
        var dateRef = firebase
          .database()
          .ref()
          .child("releases")
          .child(deployment.key)
          .child("Deployments");

        dateRef.once("value", function(snapshot) {
          snapshot.forEach(function(date) {
            var envRef = firebase
              .database()
              .ref()
              .child("releases")
              .child(deployment.key)
              .child("Deployments")
              .child(date.key);

            envRef.once("value", function(snapshot) {
              snapshot.forEach(function(environment) {
                var chipRef = firebase
                  .database()
                  .ref()
                  .child("releases")
                  .child(deployment.key)
                  .child("Deployments")
                  .child(date.key)
                  .child(environment.key);

                chipRef.once("value", function(snapshot) {
                  snapshot.forEach(function(chip) {
                    var statusRef = firebase
                      .database()
                      .ref()
                      .child("releases")
                      .child(deployment.key)
                      .child("Deployments")
                      .child(date.key)
                      .child(environment.key)
                      .child(chip.key);

                    statusRef.once("value", function(snapshot) {
                      snapshot.forEach(function(status) {
                        if (status.key === id) {
                          var compRef = firebase
                            .database()
                            .ref("releases")
                            .child(deployment.key)
                            .child("Deployments")
                            .child(date.key)
                            .child(environment.key)
                            .child(chip.key)
                            .child(status.key);

                          compRef.update({
                            status: "Complete"
                          });
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    this.setState({
      open: false
    });
  }

  handleIncomplete(id) {
    var keyRef = firebase
      .database()
      .ref()
      .child("releases");

    keyRef.once("value", function(snapshot) {
      snapshot.forEach(function(deployment) {
        var dateRef = firebase
          .database()
          .ref()
          .child("releases")
          .child(deployment.key)
          .child("Deployments");

        dateRef.once("value", function(snapshot) {
          snapshot.forEach(function(date) {
            var envRef = firebase
              .database()
              .ref()
              .child("releases")
              .child(deployment.key)
              .child("Deployments")
              .child(date.key);

            envRef.once("value", function(snapshot) {
              snapshot.forEach(function(environment) {
                var chipRef = firebase
                  .database()
                  .ref()
                  .child("releases")
                  .child(deployment.key)
                  .child("Deployments")
                  .child(date.key)
                  .child(environment.key);

                chipRef.once("value", function(snapshot) {
                  snapshot.forEach(function(chip) {
                    var statusRef = firebase
                      .database()
                      .ref()
                      .child("releases")
                      .child(deployment.key)
                      .child("Deployments")
                      .child(date.key)
                      .child(environment.key)
                      .child(chip.key);

                    statusRef.once("value", function(snapshot) {
                      snapshot.forEach(function(status) {
                        if (status.key === id) {
                          var compRef = firebase
                            .database()
                            .ref("releases")
                            .child(deployment.key)
                            .child("Deployments")
                            .child(date.key)
                            .child(environment.key)
                            .child(chip.key)
                            .child(status.key);

                          compRef.update({
                            status: "Pending"
                          });
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    this.setState({
      open: false
    });
  }

  updateStatus(id) {
    var relId = this.state.id;
    var checkStatus = this.props.comp.status;

    var checkNonStandardDepTime = this.props.comp.depTime;

    var keyRef = firebase
      .database()
      .ref()
      .child("releases");

    keyRef.once("value", function(snapshot) {
      snapshot.forEach(function(deployment) {
        var dateRef = firebase
          .database()
          .ref()
          .child("releases")
          .child(deployment.key)
          .child("Deployments"); //Referencing the Firebase Database

        dateRef.once("value", function(snapshot) {
          snapshot.forEach(function(date) {
            //Getting each "child" component of the previous parent and assigning this as a function parameter

            var envRef = firebase
              .database()
              .ref()
              .child("releases")
              .child(deployment.key)
              .child("Deployments")
              .child(date.key); //Referencing the previously established "child" component by returning the unique key assigned to it

            envRef.once("value", function(snapshot) {
              snapshot.forEach(function(environment) {
                var chipRef = firebase
                  .database()
                  .ref()
                  .child("releases")
                  .child(deployment.key)
                  .child("Deployments")
                  .child(date.key)
                  .child(environment.key);

                chipRef.once("value", function(snapshot) {
                  snapshot.forEach(function(chip) {
                    var statusRef = firebase
                      .database()
                      .ref()
                      .child("releases")
                      .child(deployment.key)
                      .child("Deployments")
                      .child(date.key)
                      .child(environment.key)
                      .child(chip.key);

                    statusRef.once("value", function(snapshot) {
                      snapshot.forEach(function(status) {
                        var currentDate = new Date();
                        var dateToday = new Date();
                        var newDateToday =
                          dateToday.getFullYear() +
                          "-" +
                          Moment(dateToday.getMonth() + 1).format("MM") +
                          "-" +
                          dateToday.getDate();
                        var currentTime =
                          currentDate.getHours() +
                          "" +
                          currentDate.getMinutes();
                        //Getting the current date and time and formatting it to fit browser conventions (for example, yyyy-MM-dd for Chrome)

                        if (currentTime < 1000) {
                          currentTime =
                            "0" +
                            currentDate.getHours() +
                            "" +
                            currentDate.getMinutes();
                        }
                        if (currentDate.getMinutes() < 10) {
                          currentTime =
                            currentDate.getHours() +
                            "0" +
                            currentDate.getMinutes();
                        }
                        if (
                          currentTime < 1000 &&
                          currentDate.getMinutes() < 10
                        ) {
                          currentTime =
                            "0" +
                            currentDate.getHours() +
                            "0" +
                            currentDate.getMinutes();
                        }

                        if (
                          status.key === relId &&
                          chip.key === "Morning" &&
                          currentTime > 930 &&
                          checkStatus !== "Complete" &&
                          (date.key === newDateToday || date.key < newDateToday)
                        ) {
                          var compRef = firebase
                            .database()
                            .ref("releases")
                            .child(deployment.key)
                            .child("Deployments")
                            .child(date.key)
                            .child(environment.key)
                            .child(chip.key)
                            .child(status.key);

                          compRef.update({
                            status: "Late"
                          });
                          //Updating the deployment status to "Late" if all above conditions are met
                        } else if (
                          status.key === relId &&
                          chip.key === "Afternoon" &&
                          currentTime > 1400 &&
                          checkStatus !== "Complete" &&
                          (date.key === newDateToday || date.key < newDateToday)
                        ) {
                          var compRef2 = firebase
                            .database()
                            .ref("releases")
                            .child(deployment.key)
                            .child("Deployments")
                            .child(date.key)
                            .child(environment.key)
                            .child(chip.key)
                            .child(status.key);

                          compRef2.update({
                            status: "Late"
                          });
                        } else if (
                          status.key === relId &&
                          chip.key === "Evening" &&
                          currentTime > 2000 &&
                          checkStatus !== "Complete" &&
                          (date.key === newDateToday || date.key < newDateToday)
                        ) {
                          var compRef3 = firebase
                            .database()
                            .ref("releases")
                            .child(deployment.key)
                            .child("Deployments")
                            .child(date.key)
                            .child(environment.key)
                            .child(chip.key)
                            .child(status.key);

                          compRef3.update({
                            status: "Late"
                          });
                        } else if (
                          status.key === relId &&
                          chip.key === "Non Standard" &&
                          currentTime > checkNonStandardDepTime &&
                          checkStatus !== "Complete" &&
                          (date.key === newDateToday || date.key < newDateToday)
                        ) {
                          var compRef4 = firebase
                            .database()
                            .ref("releases")
                            .child(deployment.key)
                            .child("Deployments")
                            .child(date.key)
                            .child(environment.key)
                            .child(chip.key)
                            .child(status.key);

                          compRef4.update({
                            status: "Late"
                          });
                        } else if (
                          status.key === relId &&
                          date.key < newDateToday &&
                          checkStatus !== "Complete"
                        ) {
                          var compRef5 = firebase
                            .database()
                            .ref("releases")
                            .child(deployment.key)
                            .child("Deployments")
                            .child(date.key)
                            .child(environment.key)
                            .child(chip.key)
                            .child(status.key);

                          compRef5.update({
                            status: "Late"
                          });
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  componentDidMount(id) {
    this.updateStatus(); //Call an automatic status update for each of the deployments that triggers after a given amount of time specified below
    this.interval = setInterval(() => this.updateStatus(), 5000); //600000 for 10 minute interval
  }

  componentWillUnmount() {
    clearInterval(this.interval); //Clear and reset the interval timer after the specified time has been reached
  }
  render() {
    return (
      <div>
        <Chip
          label={this.props.comp.name + " : " + this.props.comp.version}
          style={{
            color: "white",
            background:
              this.props.comp.status === "Pending"
                ? "orange" //Is the status "Pending"? If yes, then set the background colour to orange.
                : this.props.comp.status === "Complete"
                ? "green"
                : "red" //If the status is not "Pending", then check if the status is "Complete". If yes, then set the background colour to green. If not, then set the background color to red.
          }}
          onClick={this.handleClick.bind(this, this.props.comp.id)}
          onDelete={this.handleDelete.bind(this, this.props.comp.id)}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.props.comp.name} v{this.props.comp.version}
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              Details: {this.props.comp.detail}{" "}
              {/* Calling the "detail" property, allowing the dialog content text to change dynamically, without the need for hardcoding. */}
            </DialogContentText>
            <DialogContentText>
              Status: {this.props.comp.status}
            </DialogContentText>
            <DialogContentText>
              {this.props.comp.depTime
                ? "Non Standard Deployment Time: " + this.props.comp.depTime
                : ""}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button
              onClick={this.handleIncomplete.bind(this, this.props.comp.id)}
              color="secondary"
              variant="contained"
            >
              Mark as Not Done
            </Button>
            <Button
              onClick={this.handleComplete.bind(this, this.props.comp.id)}
              color="primary"
              variant="contained"
            >
              Mark as Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(chips);
