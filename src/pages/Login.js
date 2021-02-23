import React, { useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, Checkboxes } from 'mui-rff';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { usePasswordPeekInput } from '../hooks/usePasswordPeekInput';
import { BaseForm } from '../forms/BaseForm';
import { Copyright } from '../components/Copyright';
import { useAuth } from '../contexts/AuthContext';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import background from '../assets/images/login-bg.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    width: '50%',
    height: 'auto',
    margin: theme.spacing(2),
    marginBottom: theme.spacing(4)
  }
}));

export const useRedirectIfLoggedInEffect = () => {
  const auth = useAuth();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if(auth.isAuthenticated) {
      history.replace(from);
    }
  }, [history, from, auth.isAuthenticated])
}

export const Login = () => {
  useRedirectIfLoggedInEffect();
  
  const classes = useStyles();
  const { show:showPassword, adornment } = usePasswordPeekInput();
  const auth = useAuth();
  const onSubmit = useCallback(async (formValues) => {
    try {
      await auth.login({
        username: formValues.username,
        password: formValues.password,
        keepConnected: formValues.keepConnected
      })
    } catch(error) {
      console.error('login error', error)
    }
  }, [auth])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>

          <Typography component="h1" variant="h6">
            Para acessar, entre com sua conta.
          </Typography>

          <BaseForm className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: adornment
              }}
            />
            <Checkboxes name="keepConnected" color="primary" required={true} data={{ label: 'Manter Conectado', value: true }} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              size="large"
            >
              ENTRAR
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
          </BaseForm>
        </div>
      </Grid>
    </Grid>
  );
}