import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AddRounded } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import Swal from "sweetalert2";
import * as firebase from "firebase";

export default class FormDialog extends React.Component {
  state = {
    //Defining the initial state for each of the below components.
    open: false,
    relnum: "",
    releaseId: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true }); //Setting the "open" state to be true when the "Add Release" button is pressed, opening the dialog.
  };

  handleClose = () => {
    this.setState({ open: false }); //Setting the "open" state to be false when the user is finished with the dialog, closing the dialog.
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value //Handling the onChange event for the "Add Release" dialog.
    });
  };

  AddRelease = () => {
    //Referencing the Firebase database and adding the new release as a child.

    if (this.state.relnum === "") {
      Swal({
        title: "Invalid Input",
        text: "Please enter a valid Release ID to be created.",
        type: "error",
        confirmButtonText: "OK"
      });
      //Accounting for an input that returns a value of "" or undefined, as this cannot be processed by Firebase.
    } else {
      var ref = firebase
        .database()
        .ref()
        .child("releases"); //Referencing the Firebase database path.
      var newRelRef = ref.push(); //"Pushing" or adding a new child component to the above specified path.
      newRelRef.set({
        relnum: this.state.relnum //Setting the value of the new child component.
      });

      Swal({
        title: "Release Added",
        text: "The new release has successfully been added.",
        type: "success",
        showConfirmButton: false,
        timer: 1600
      });
      //Confirming the successful addition of a release to the database. This is a timed alert and will display for 1.6 seconds (1600 milliseconds).
    }
    this.setState({ open: false, relnum: "" });
    //Setting the component's "open" state to false as well as the "relnum" state to "" to close the dialog and avoid future invalid inputs respectively.
  };

  render() {
    return (
      <div>
        <Fab onClick={this.handleClickOpen}>
          <AddRounded />
        </Fab>{" "}
        {/* Binding the onClick handler for the "Add Release" button to the "handleClickOpen" method */}
        <Dialog
          open={this.state.open}
          onClose={
            this.handleClose
          } /* Binding the onClick handler for the "Cancel" button to the "handleClose" method */
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Release</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the Release ID to be created.
            </DialogContentText>
            <DialogContentText>
              Please note that this cannot be changed after creation.
            </DialogContentText>
            <form>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Eg: 19.5.0"
                type="text"
                fullWidth
                onChange={this.handleChange(
                  "relnum"
                )} /*Binding the onChange handler for the Text Field and passing in "relnum" as a parameter. */
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
