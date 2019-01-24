import React, { Component, Fragment } from "react";
import { Header, Footer } from "./layouts";
import Releases from "./Releases";
import * as firebase from "firebase";
import "../App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      releaseId: "",
      rows: [],
      reldate: new Date()
    };
  }

  getReleaseId = relnum => {
    return this.state.releases.filter(function(data) {
      return data.relnum === relnum;
    });
  };
  onReleaseChange(newReleaseId) {
    let that = this;
    let relArray = [];
    let depWindowOne = [];
    let depWindowTwo = [];
    let depWindowThree = [];
    let depWindowFour = [];
    const ref = firebase
      .database()
      .ref()
      .child("releases");
    const rlzRef = ref.orderByChild("relnum").equalTo(newReleaseId);
    rlzRef.on("value", snap => {
      relArray = [];
      snap.forEach(function(deployment) {
        var deps = deployment.child("Deployments");
        deps.forEach(function(relD) {
          var relDate = relD.key;
          relArray.push({ relDate: relDate });
          relD.forEach(function(env) {
            var envKey = env.key;
            env.forEach(function(depWindows) {
              var depWindowKey = depWindows.key;
              depWindowOne = [];
              depWindowTwo = [];
              depWindowThree = [];
              depWindowFour = [];
              depWindows.forEach(function(sys) {
                if (depWindowKey === "Afternoon") {
                  depWindowOne.push({
                    name: sys.val().Component,
                    detail: sys.val().detail,
                    id: sys.key,
                    status: sys.val().status,
                    version: sys.val().version
                  });
                }
                if (depWindowKey === "Evening") {
                  depWindowTwo.push({
                    name: sys.val().Component,
                    detail: sys.val().detail,
                    id: sys.key,
                    status: sys.val().status,
                    version: sys.val().version
                  });
                }
                if (depWindowKey === "Morning") {
                  depWindowThree.push({
                    name: sys.val().Component,
                    detail: sys.val().detail,
                    id: sys.key,
                    status: sys.val().status,
                    version: sys.val().version
                  });
                }
                if (depWindowKey === "Non Standard") {
                  depWindowFour.push({
                    name: sys.val().Component,
                    detail: sys.val().detail,
                    id: sys.key,
                    status: sys.val().status,
                    version: sys.val().version,
                    depTime: sys.val().depTime
                  });
                }
              });
            });
            relArray.push({
              relDate: "",
              relEnv: envKey,
              depWindowOne,
              depWindowTwo,
              depWindowThree,
              depWindowFour
            });
          });
        });

        that.setState({
          rows: relArray
        });
      });
    });
    this.setState({
      releaseId: newReleaseId
    });
  }
  render() {
    return (
      <Fragment>
        <Header />
        <h1>
          <strong>NPE Deployment Calendar</strong>
        </h1>
        <Releases releaseId={this.state.releaseId} rows={this.state.rows} />
        <Footer changeRelease={this.onReleaseChange.bind(this)} />
      </Fragment>
    );
  }
}

export default App;
