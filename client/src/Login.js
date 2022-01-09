import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { login } from "./store/utils/thunkCreators";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
          <FontAwesomeIcon icon={faCommentDots} className="chat-icon"/>
          <Typography variant="h5" className="chat-text">
            Converse with anyone in any language
          </Typography>
        </Grid>
      </Box>
      <Box className="sign-in">
        <Grid container item className="create-account">
          <Typography className="have-account">
            Don't have an account?
          </Typography>
          <Button
            className="register-btn"
            onClick={() => history.push("/register")}
          >
            Create account
          </Button>
        </Grid>
        <form className="welcome-form" onSubmit={handleLogin}>
          <Grid>
            <Grid>
              <Typography variant="h5" className="welcome-back">
                Welcome back!
              </Typography>
              <FormControl margin="normal" required>
                <TextField
                  className="user-input email"
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                className="user-input password"
                label="Password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
            <Grid>
              <Button
                className="login-btn"
                type="submit"
                color="primary"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </Grid>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
