import React from 'react';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import './Header.css'
export class Header extends React.Component{

    render(){

        return (
            <div>
                <AppBar className="app-header">
                    <Toolbar>
                        <Typography className="app-logo">
                            Image Viewer
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

}