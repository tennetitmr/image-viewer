import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Header from "../../common/header/Header";
import './Home.css';
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
const dateFormat = require('dateformat');

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            profile_picture: '',
            created_time: '',
            media: [],
            like_button: 'inherit',
            numberOfLikes: 0,
            comments: [],
            commentText: '',
            commentCount: 0,
            url: '',
            tags: [],
            id: '',
            commentIndex: 0,
            active: false

        }
    }


    componentWillMount() {
        if(sessionStorage.getItem("access-token") === null || sessionStorage.getItem("access-token") === '' ||
            sessionStorage.getItem("access-token") === undefined){
            this.props.history.push('/');
            return;
        }
        this.fetchUser();
        this.fetchUserMedia('');
    }


    fetchUser() {
        fetch("https://api.instagram.com/v1/users/self/?access_token=" + sessionStorage.getItem("access-token"))
            .then(res => res.json())
            .then(result => {
                //console.log(result.data.username);
                this.setState({
                    profile_picture: result.data.profile_picture,
                    username: result.data.username
                });
            })
    }


    fetchUserMedia(searchString) {
        fetch("https://api.instagram.com/v1/users/self/media/recent?access_token=" + sessionStorage.getItem("access-token"))
            .then(res => res.json())
            .then(result => {
                //console.log(result.data);
                if (searchString !== '') {
                    this.setState({
                        media: result.data.filter(d => d.caption.text.includes(searchString))
                    });
                } else {
                    this.setState({
                        media: result.data,
                        created_time: result.data[0].created_time,
                        tags: result.data.tags
                    });
                }
            })
    }

    //this is used to call search input of header
    searchChangeHandler = (e) => {
        var searchString = e.target.value;
        // console.log("search.." + searchString);
        let currentArray = this.state.media;
        if (searchString !== undefined && searchString !== '') {
            this.fetchUserMedia(e.target.value);
        } else {
            currentArray = [];
            this.setState({media: currentArray})
        }
    }

    likeClickHandler = (count, index) => {
        const currentState = this.state.active;
        this.setState({
            active: !currentState
        });

        // increase count when like is clicked
        var update_pics = this.state.media;
        if (this.state.active === false) {
            update_pics[index].likes.count += 1;
            count = count + 1;
            this.setState({
                media: update_pics,
                id: index,
                like_button: 'error'
            })
        }
        // decrease count if icon is clicked again for the same index
        else if (this.state.active === true && this.state.id === index) {
            update_pics[index].likes.count -= 1;
            this.setState({
                media: update_pics,
                like_button: 'inherit'
            })
        }
    }

    //adding comments to image card
    addClickHandler = (index) => {
        let currentArray = this.state.comments;
        if (this.state.commentIndex !== index) {
            console.log("if true..............")
            this.setState({
                commentIndex: -1,
            })
            currentArray = [];
        }

        this.setState({
            comments: currentArray.concat(this.state.commentText),
            commentIndex: index
        })

    }

    //this used to change the state of comment input
    commentChangeHandler = (e) => {
        this.setState({commentText: e.target.value})
    }

    render() {
        return (
            <div>
                <Header {...this.props} onChange={this.searchChangeHandler}
                        profile_picture={this.state.profile_picture}/>
                <Grid container spacing={16} className="grid-container">
                    {this.state.media.length > 0 && this.state.media.map((m, index) => (
                            <Grid item xs={6} key={m.id}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="Recipe" src={this.state.profile_picture}/>
                                        }
                                        title={this.state.username}
                                        subheader={dateFormat(new Date(parseInt(m.created_time)), "dd/mm/yyyy' 'HH:MM:ss")}
                                    />
                                    <CardContent>
                                        <CardMedia
                                            style={
                                                {
                                                    height: 0,
                                                    paddingTop: '56.25%'
                                                }
                                            }
                                            image={m.images.standard_resolution.url}
                                            title="upgrade pic"
                                        />
                                        <hr/>
                                        <Typography component="p" className="caption-text">
                                            {m.caption.text.split('\n')[0]}
                                        </Typography>
                                        <div className="tag">
                                            {m.tags.map((tag, i) => (
                                                <Typography style={{color: '#29B6F6'}} key={i}>
                                                    #{tag} &nbsp;
                                                </Typography>
                                            ))
                                            }
                                        </div>
                                        <div className="tag-like">
                                            <div>
                                                <IconButton aria-label="Add to favorites"
                                                            onClick={() => this.likeClickHandler(m.likes.count, index)}>
                                                    {this.state.active && index === this.state.id ? (
                                                            <Favorite
                                                                color={this.state.like_button}
                                                                fontSize="large"
                                                            />)
                                                        :
                                                        <FavoriteBorder
                                                            fontSize="large"
                                                        />
                                                    }
                                                </IconButton>
                                            </div>
                                            <div className="likes">
                                                <Typography component="h2" variant="h6">
                                                    {m.likes.count} Likes
                                                </Typography>
                                            </div>

                                        </div>
                                        <div>
                                            {
                                                this.state.commentIndex === index && this.state.comments.map((c, index) =>
                                                    (<p key={index}>
                                                            {c}
                                                        </p>
                                                    ))
                                            }
                                        </div>
                                        <CardActions>
                                            <FormControl style={{width: "100%"}}>
                                                <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                            <Input
                                                id="comment"

                                                onChange={this.commentChangeHandler}
                                            />
                                            </FormControl>
                                            <Button variant="contained" color="primary"
                                                    onClick={() => this.addClickHandler(index)}
                                            >
                                                ADD
                                            </Button>

                                        </CardActions>
                                    </CardContent>
                                </Card>

                            </Grid>

                        )
                    )}
                </Grid>
            </div>


        )

    }

}


export default Home;