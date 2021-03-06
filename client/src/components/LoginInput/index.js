import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { login } from "../../actions/user.js";
import "./styles.css";
import "../../index.css";

class LoginInput extends React.Component {
  constructor(props) {
    super(props);
    // this.props.history.push("/login");
  }

  state = {
    username: "",
    password: "",
    wrongCreds: false,
  };

  handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      wrongCreds: false,
    });
  };

  handleKeyDown = (event) => {
    if (event.keyCode == 13) {
      const { appComponent, userType } = this.props;
      // if enter key was pressed
      this.checkCredentials(this, appComponent, userType);
    }
  };

  goToHome = () => {
    window.location.href = "/home";
  };

  goToAdminHome = () => {
    window.location.href = "/adminHome";
  };

  handleOnClick = () => {
    window.location.href = "/registration";
  };

  // phase 2 version
  checkCredentials = (loginComp, app, userType) => {
    login(loginComp, app, userType)
      .then((result) => {
        if (!result) {
          this.setState({ wrongCreds: true });
        }
      })
      .catch((error) => {
        this.setState({ wrongCreds: true });
      });
  };

  render() {
    const wrongCreds = this.state.wrongCreds;
    let wrongCredsMessage;

    if (wrongCreds) {
      wrongCredsMessage = (
        <div className="red smallMarginTop">
          <div>Incorrect credentials.</div>
          <div>Please try again.</div>
        </div>
      );
    }

    const { appComponent, userType } = this.props;

    return (
      <div>
        <div>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            onChange={this.handleOnChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        {/* <div className="marginTop"></div> */}
        <div>
          <TextField
            type="password"
            className="marginTop"
            label="Password"
            name="password"
            variant="outlined"
            onChange={this.handleOnChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        {window.location.pathname !== "/adminLogin" &&
          window.location.pathname !== "/adminHome" && (
            <div className="smallMarginTop">
              <span
                className="hover-pointer grey"
                onClick={() => this.handleOnClick()}
              >
                Need to register?
              </span>
            </div>
          )}
        <div>
          <Button
            className="smallMarginTop"
            variant="contained"
            color="primary"
            onClick={() => this.checkCredentials(this, appComponent, userType)}
          >
            LOG IN
          </Button>
        </div>
        {/* the following only renders if wrong credentials were input */}
        {wrongCredsMessage}
      </div>
    );
  }
}

export default LoginInput;
