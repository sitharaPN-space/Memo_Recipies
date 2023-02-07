import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email:'', password:'', confirmPassword:''};


const Auth = () => {
    const classes = useStyles();
    const clientId = "767197306847-mt8qf30s89r1sdk9hqnhhi3s0llvn8pn.apps.googleusercontent.com";
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    useEffect(()=> {
        const initClient = () => {
            gapi.client.init({
                clientId : clientId,
                scope: ''
            });
        };

        gapi.load('client:auth2', initClient);
    });


    const handleSubmit = (e) => {
        e.preventDefault();
      
        if(isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const switchMode = () => {
        setFormData(initialState);
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj // if profileObj is null it won't throw an error instead undefined 
        const token = res?.tokenId;

        try {
            dispatch( {type: 'AUTH', data: {result, token}});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
      //  console.log(res);
    }

    const googleFailure = (err) => {
        console.log(err);
        console.log('Google sign in was unsuccessful')
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword} />
                    {
                        isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                    }
                    </Grid> 

                    <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}               
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                                >
                                    Google Sign In
                                </Button>
                        )}
                        />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already have an account? Sign In' : "Dont't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;
