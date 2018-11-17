import React, { Component } from 'react';
import Modal from 'react-modal';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import Icon from "@material-ui/core/Icon";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	mainDiv: {
		marginLeft: '25px',
		marginRight: '25px'
	},
	avatar: {
		width: '120px',
		height: '120px',
	},
	flexcontainerDiv: {
		display: 'flex',
		justifyContent: 'center',
		borderWidth: '20px',
		borderColor: 'black'
	},
	headerDiv: {
		display: 'flex',
		alignItems: 'center',
		margin: '20px',
		marginLeft: '250px'
	},
	userDiv: {
		display: 'flex',
		alignItems: 'center',
		margin: '10px'
	},
	typeDiv: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	profileDiv: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '10px'
	},
	rightDiv: {
		marginLeft: '12px'
	},
	comments: {
		width: '80%'
	},
	editbutton: {
		marginLeft: '10px'
	},
	button: {
		float: 'right',
		width: '10%'
	},
	bottom: {
		marginTop: '270px'
	},
	subheader: {
		width: '100%',
	},
	card: {
		display: 'flex',
	},
	details: {
		marginLeft: '30px',
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 151,
	},

	playIcon: {
		height: 38,
		width: 38,
	},
});

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            username:"",
            profile_pic:"",
            media:"",
            follows:"",
            followed_by:"",
            full_name:"",
            full_name_t:"",
            modalIsOpen : false,
            uploaded_pics:[],
            hashtags:[],
            comments: [],
            likes:"",
            caption:"",
            url:"",
            active: false,
            dispColor: "transparent",
            clicked: false,
        }
    }


