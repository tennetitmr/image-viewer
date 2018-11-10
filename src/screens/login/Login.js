import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import './Login.css'

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
        root: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        card: {
            marginTop: '5%',
            maxWidth: 345
        }

    })
;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            usernameRequired: "dispNone",
            passwordRequired : "dispNone"

        }
    }
    usernameChangeHandler = (e) => {
        this.setState({username : e.target.value});
    }

    passwordChangeHandler = (e) => {
        this.setState({password : e.target.value});

    }
    loginClickHandler = () => {

        let userName = 'prakash';
        let userPassword= 'prakash';
        const accessToken = '';

        this.state.username === "" ? this.setState( { usernameRequired: "dispBlock"}) :
            this.setState( { usernameRequired: "dispNone"});
        this.state.password === "" ? this.setState( { passwordRequired: "dispBlock"}) :
            this.setState( { passwordRequired: "dispNone"});

        if(this.state.username !== "" &&  this.state.loginPassword !== "") {
            if (userPassword === this.state.password && userName === this.state.username) {
                sessionStorage.setItem("access-token", accessToken);
                this.setState({loggedIn: true});
                this.props.history.push('/home')
            } else {
                this.setState({loginSuccess: false});
            }
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <AppBar className="app-header">
                        <Toolbar>
                            <Typography className="app-logo">
                                Image Viewer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.card}>
                    <Card>
                        <CardContent>
                            <FormControl>
                                <Typography variant="h5" component="h2">
                                    LOGIN
                                </Typography>
                            </FormControl>
                            <br/><br/>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" onChange={this.usernameChangeHandler}/>
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br/><br/>
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" onChange={this.passwordChangeHandler}/>
                                <FormHelperText className={this.state.passwordRequired} > <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>Login</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>

        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);