import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import './Header.css'
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {withStyles} from "@material-ui/core";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component{
    state = {
        auth: true,
        anchorEl: null,
    };
    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render(){
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div >
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <AppBar className="app-header">
                    <Toolbar>
                        <Typography className="app-logo">
                            Image Viewer
                        </Typography>
                        <div className="search-container">
                        <div className="search-box" >
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item className="searchIcon">
                                    <SearchIcon  />
                                </Grid>
                                <Grid item>
                                    <Input id="input-with-icon-grid" placeholder="Search..." />
                                </Grid>

                            </Grid>
                        </div>
                        </div>
                        <Grid item>
                            {auth && (
                                <div>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>

                                    </Menu>
                                </div>
                            )}
                        </Grid>
                    </Toolbar>
                </AppBar>

            </div>
        )
    }

}
export default Header;
