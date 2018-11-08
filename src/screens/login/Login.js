import React from 'react';
import AppBar from  '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import   './Login.css'
class Login extends React.Component {

    render () {
        return (
            <div>
                <AppBar className= "app-header">
                    <Toolbar>
                        <Typography  className= "app-logo" >
                            Image Viewer
                        </Typography>
                    </Toolbar>

                </AppBar>
            </div>
        );
    }
}

export  default Login;