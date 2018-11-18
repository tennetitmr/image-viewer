import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import './Login.css';
import {withStyles} from '@material-ui/core/styles';
import Header from "../../common/header/Header";
const styles = theme => ({
        root: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        card: {
            marginTop: '1%',
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
            passwordRequired : "dispNone",
            loggedIn : false,
            loginSuccess : true,
            userInfo: [],
            profileHeader: true

        };

    }

    componentWillMount(){

    }
    usernameChangeHandler = (e) => {
        this.setState({username : e.target.value});
    }

    passwordChangeHandler = (e) => {
        this.setState({password : e.target.value});

    }

    userSelfInfo(){
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                  console.log(this.responseText);
                //  let responseUser = JSON.parse(this.responseText).data;
               //   console.log(responseUser);
                //that.setState({
                    // profile_picture : JSON.parse(this.responseText).data.profile_picture
               // });
            }
        });
        const  uri = this.props.baseUrl + "users/self/?access_token=" +sessionStorage.getItem("access-token").trim();
        console.log(uri);
        xhr.open("GET", uri);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send();

    }

    loginClickHandler = () => {

        let userName = 'prakash';
        let userPassword= 'prakash';
        const accessToken = '8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65';

        this.state.username === "" ? this.setState( { usernameRequired: "dispBlock"}) :
            this.setState( { usernameRequired: "dispNone"});
        this.state.password === "" ? this.setState( { passwordRequired: "dispBlock"}) :
            this.setState( { passwordRequired: "dispNone"});

        if(this.state.username !== "" &&  this.state.loginPassword !== "") {
            if (userPassword === this.state.password && userName === this.state.username) {
                sessionStorage.setItem("access-token", accessToken);
                this.setState({loggedIn: true});
                //this.userSelfInfo();
                this.props.history.push('/home');
            } else {
                this.setState({loginSuccess: false});
            }
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header  baseUrl={this.props.baseUrl}
                         profileHeader={this.state.profileHeader}
                         loggedIn={this.loggedIn}/>
                <div className={classes.root}>
                <div className={classes.card}>
                    <Card>
                        <CardContent className= "app-login">
                            <FormControl>
                                <Typography variant="h5" component="h2">
                                    LOGIN
                                </Typography>
                            </FormControl>
                            <br/><br/>
                            <FormControl  style={{width: "100%"}} required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" onChange={this.usernameChangeHandler}/>
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br/><br/>
                            <FormControl  style={{width: "100%"}} required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" onChange={this.passwordChangeHandler}/>
                                <FormHelperText className={this.state.passwordRequired} > <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                        </CardContent>
                        <br /><br />
                        {this.state.loggedIn === true &&
                        <FormControl  style={{width: "100%"}}>
                            <span className="successText">Login Successful! </span>
                        </FormControl>
                        }
                        {
                            this.state.loginSuccess === false &&
                            <FormControl  style={{width: "100%"}}>
                                <span className="red">Incorrect username and/or password </span>
                            </FormControl>
                        }
                        <br /><br />
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>Login</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
            </div>

        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);