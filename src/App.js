import React, { Component } from "react";
import "./App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp({
  apiKey: "AIzaSyDWJLRO6NRUtV5eAQBzv45AnKBBHZsuT3Y",
  authDomain: "react-fribase-auth.firebaseapp.com"
});

class App extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false,
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              {this.state.isSignedIn ? (
                <span>
                  <button onClick={() => firebase.auth().signOut()}>
                    Signed out!
                  </button>
                  <h1> Welcome {firebase.auth().currentUser.displayName} !</h1>
                  <img src={firebase.auth().currentUser.photoURL} alt="Auth Picture"/>
                </span>
              ) : (
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
