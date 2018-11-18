import React, {Component} from 'react';
import Modal from 'react-modal';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import {withStyles} from '@material-ui/core/styles';
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
import Header from "../../common/header/Header";
import './Profile.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

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
            username: "",
            profile_pic: "",
            media: "",
            follows: "",
            followed_by: "",
            full_name: "",
            full_name_t: "",
            modalIsOpen: false,
            uploaded_pics: [],
            hashtags: [],
            comments: [{
                content: "",
                user: "",
                id: ""
            }
            ],
            likes: "",
            caption: "",
            url: "",
            active: false,
            dispColor: "transparent",
            clicked: false,
            picId: "",
            id: "",
            isProfilePage: true
        }
    }

    componentWillMount() {
        if(sessionStorage.getItem("access-token") === null || sessionStorage.getItem("access-token") === '' ||
            sessionStorage.getItem("access-token") === undefined){
            this.props.history.push('/');
            return;
        }
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profile_pic: JSON.parse(this.responseText).data.profile_picture,
                    username: JSON.parse(this.responseText).data.username,
                    full_name: JSON.parse(this.responseText).data.full_name,
                    media: JSON.parse(this.responseText).data.counts.media,
                    follows: JSON.parse(this.responseText).data.counts.follows,
                    followed_by: JSON.parse(this.responseText).data.counts.followed_by
                });
            }
        });

        xhr.open("GET", "https://api.instagram.com/v1/users/self/?access_token=" + sessionStorage.getItem("access-token"));
        xhr.send(data);

        let xhrPic = new XMLHttpRequest();
        xhrPic.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    uploaded_pics: JSON.parse(this.responseText).data,
                    likes: JSON.parse(this.responseText).data.likes,
                    url: JSON.parse(this.responseText).data[0].images.standard_resolution.url,
                    id: JSON.parse(this.responseText).data.id,
                });
            }
        });

        xhrPic.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + sessionStorage.getItem("access-token"));
        xhrPic.send(data);
    }

    openModalHandler = () => {
        this.setState({modalIsOpen: true})
    }

    closeModalHandler = () => {
        this.setState({
            modalIsOpen: false,
            clicked: false
        })
    }

    editClickHandler = (e) => {
        // If temporary full name is not null.
        if (this.state.full_name_t !== "") {
            this.setState({full_name: this.state.full_name_t});
        }

        this.setState({modalIsOpen: false});
    }

    inputFullNameChangeHandler = (e) => {
        this.setState({full_name_t: e.target.value});
    }

    iconClickHandler = (count) => {
        const currentState = this.state.active;
        this.setState({active: !currentState});
        if (this.state.active === false) {
            count = count + 1;
            this.setState({
                dispColor: "red",
                likes: count
            })
        }
        else {
            count = count - 1;
            this.setState({
                dispColor: "transparent",
                likes: count
            })
        }
    }

    imageClickHandler = (pic, index) => {
        var pics = this.state.uploaded_pics[index];
        var captionReceived = pics.caption.text;
        var captionText = captionReceived.substring(0, captionReceived.indexOf("#"));

        this.setState({
            clickedPic: pics,
            clicked: true,
            url: pics.images.standard_resolution.url,
            hashtags: pics.tags,
            caption: captionText,
            likes: pics.likes.count,
            picId: pic.id
        });
    }

    commentClickHandler = () => {

        let commentsList = this.state.comments.slice();
        let starNode = [];

        starNode.user = this.state.username;
        starNode.content = this.state.comment;
        starNode.id = this.state.picId;
        commentsList.push(starNode);

        this.setState({comments: commentsList});
    }

    inputCommentChangeHandler = (e) => {
        this.setState({comment: e.target.value});
        //Reset the input filed after submitting the form
        e.target.value = "";
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {/* Header for profile Page */}
                <Header {...this.props}
                        profileHeader={this.state.isProfilePage}
                        profile_picture={this.state.profile_pic}/>
                <div className={classes.headerDiv}>
                    <div>
                        <Avatar className={classes.avatar} src={this.state.profile_pic} alt="profile"/>
                    </div>
                    <div className={classes.details}>
                        <Typography style={{marginBottom: '8px', fontSize: '30px'}} component="title" variant="title">
                            {this.state.username}
                        </Typography>
                        <Typography variant="subtitle2" color="textPrimary">
                            <span style={{marginRight: '120px', fontSize: '20px'}}>Posts: {this.state.media}</span>
                            <span style={{marginRight: '120px', fontSize: '20px'}}>Follows: {this.state.follows}</span>
                            <span style={{fontSize: '20px'}}>Followed By: {this.state.followed_by} </span>
                        </Typography>
                        <div className={classes.profileDiv}>
                            <Typography style={{fontSize: '25px'}} variant="subtitle1" color="textPrimary">
                                {this.state.full_name}
                            </Typography>
                            <Button variant="fab" mini color="secondary" aria-label="Edit"
                                    className={classes.editbutton} onClick={this.openModalHandler}>
                                <EditIcon/>
                            </Button>
                        </div>
                    </div>
                </div>
                <Modal style={customStyles} isOpen={this.state.modalIsOpen} contentLabel="Edit" ariaHideApp={false}
                       onRequestClose={this.closeModalHandler}>
                    <Typography variant='h4' align='left' gutterBottom>
                        Edit
                    </Typography>
                    <FormControl required>
                        <InputLabel htmlFor="fullname"> Full Name </InputLabel>
                        <Input type="text" id="fullname" full_name={this.state.full_name_t}
                               onChange={this.inputFullNameChangeHandler}></Input>
                    </FormControl>
                    <br/><br/>
                    <Button variant="contained" color="primary" onClick={this.editClickHandler}>UPDATE</Button>
                </Modal>
                <div className={classes.mainDiv}>
                    <GridList cellHeight={300} className={classes.gridList} cols={3}>
                        {this.state.uploaded_pics.map((pic, index) => (
                            <GridListTile key={pic.id}>
                                <img src={pic.images.standard_resolution.url} alt="pic"
                                     onClick={() => this.imageClickHandler(pic, index)}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div>
                    <Modal isOpen={this.state.clicked} ariaHideApp={false} onRequestClose={this.closeModalHandler}>
                        <div className={classes.flexcontainerDiv}>
                            <div>
                                <img src={this.state.url} alt="pic"/>
                            </div>

                            <div className={classes.rightDiv}>
                                <div className={classes.userDiv}>
                                    <Avatar src={this.state.profile_pic}/>
                                    <Typography style={{marginLeft: '10px'}}>{this.state.username}</Typography>
                                </div>
                                <Divider/>
                                <Typography variant="subtitle1">
                                    {this.state.caption}
                                </Typography>
                                <div className="tags">
                                    {this.state.hashtags.map(tag => (
                                        <Typography style={{color: '#29B6F6'}}>
                                            #{tag} &nbsp;
                                        </Typography>
                                    ))}
                                </div>
                                <div className={classes.bottom}>
                                    <div className={classes.userDiv}>
                                        <Icon style={{fontSize: "35px"}}
                                              onClick={() => this.iconClickHandler(this.state.likes)}>
                                            {(this.state.active) ? <Favorite className="red" fontSize="large"/> :
                                                <FavoriteIcon fontSize="large"/>}
                                        </Icon>
                                        <Typography className={classes.rightDiv}>{this.state.likes} likes</Typography>
                                    </div>
                                    <div>
                                        <Typography>
                                        <span>
                                            {this.state.comments.map(comment => (
                                                (comment.content && comment.id === this.state.picId &&
                                                    <div>
                                                        <span className="comments-span-heading">{comment.user}: </span>
                                                        <span className="comments-span-content">{comment.content}</span>
                                                    </div>
                                                )
                                            ))}
                                        </span>

                                        </Typography>
                                    </div>
                                    <div className={classes.userDiv}>
                                        <FormControl className={classes.comments}>
                                            <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                            <Input id="comment" type="text"
                                                   comment={this.state.comment}
                                                   onBlur={this.inputCommentChangeHandler}/>
                                        </FormControl>
                                        <Button className={classes.button} variant="contained" color="primary"
                                                onClick={this.commentClickHandler}>Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Profile);

