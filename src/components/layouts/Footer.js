import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CreateRelease from "../Releases/CreateRelease";
import Swal from "sweetalert2";

//import DashboardIcon from '@material-ui/icons/Dashboard';
import * as firebase from "firebase";

class footertab extends React.Component {
  handleChange = (event, value) => {
    this.setState({
      value
    });
    this.props.changeRelease(event.target.innerText);
  };

  constructor() {
    super();
    this.state = {
      releases: [],
      value: 0
    };
    Swal({
      title: "Choose a Release",
      html:
        "Before adding a deployment, be sure to select a release using the selector found at the bottom of the page.",
      type: "info",
      confirmButtonText: "OK"
    });
  }

  componentDidMount() {
    const rlzRef = firebase
      .database()
      .ref()
      .child("releases");
    rlzRef.on("value", snap => {
      var relarray = [];
      snap.forEach(element => {
        var item = element.val();
        item.key = element.key;
        relarray.push(item);
      });
      this.setState({
        releases: relarray
      });
      // if (relarray.length > 0) {
      //   this.props.changeRelease(relarray[0].relnum);
      // }
    });
  }

  render() {
    return (
      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <Paper square>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange.bind(this)}
            centered
          >
            {this.state.releases.map(relnum => (
              <Tab label={relnum.relnum} />
            ))}
            <CreateRelease />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default footertab;
