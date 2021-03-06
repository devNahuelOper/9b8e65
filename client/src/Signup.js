import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { register } from "./store/utils/thunkCreators";

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className="container">
      <Box
        sx={{
          width: 425,
          background: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
          "&:hover": {
            backgroundColor: "primary.secondary",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Grid container item className="chat-area">
          <FontAwesomeIcon icon={faCommentDots} className="chat-icon" />
          <Typography variant="h5" className="chat-text">
            Converse with anyone in any language
          </Typography>
        </Grid>
      </Box>
      <Box className="sign-in">
        <Grid container className="create-account">
          <Typography className="have-account">Need to log in?</Typography>
          <Button
            className="register-btn"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </Grid>
        <form className="welcome-form" onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <Typography variant="h5" className="welcome-back">
                Create an account.
              </Typography>
              <FormControl>
                <TextField
                  className="user-input"
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  className="user-input"
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  className="user-input"
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  className="user-input"
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Button
              className="login-btn"
              type="submit"
              color="primary"
              variant="contained"
              size="large"
            >
              Create
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
