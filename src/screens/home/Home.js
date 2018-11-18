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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Header from "../../common/header/Header";
import './Home.css';

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
            active: false

        }
    }


    componentDidMount() {

        console.log("calling api............");

        this.fetchUser();
        this.fetchUserMedia('');


    }


    fetchUser() {

        fetch("https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65")

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
        fetch("https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65")
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

    inputChangeHandler = (e) => {
        var searchString = e.target.value;
        // console.log("search.." + searchString);
        if (searchString !== undefined && searchString !== '') {
            this.fetchUserMedia(e.target.value);
        } else {
            this.setState({media: []})
            // console.log("empty search.............." + this.state.media);
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
        else if (this.state.active === true && this.state.id === index){
            update_pics[index].likes.count -= 1;
            this.setState({
                media: update_pics,
                like_button: 'inherit'
            })
        }
    }

    addClickHandler = (e) => {
        console.log("add comment")
        this.setState({
            comments: this.state.comments.concat(this.state.commentText)
        })
        this.state.commentCount += 1;

    }
    commentChangeHandler = (e) => {
        this.setState({commentText: e.target.value})
    }

    render() {

        return (
            <div>
                <Header {...this.props} onChange={this.inputChangeHandler}
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
                                            {m.tags.map(tag => (
                                                <Typography style={{color: '#29B6F6'}}>
                                                    #{tag} &nbsp;
                                                </Typography>
                                            ))
                                            }
                                        </div>
                                        <div>
                                            <IconButton aria-label="Add to favorites"  onClick={() => this.likeClickHandler(m.likes.count,  index)}>
                                                {this.state.active && index === this.state.id ? (
                                                        <Favorite
                                                            color={this.state.like_button}
                                                        />)
                                                    :
                                                    <FavoriteBorder
                                                    />
                                                }
                                            </IconButton>
                                            <Typography variant="subtitle1">
                                                {m.likes.count} Likes
                                            </Typography>
                                        </div>
                                        <div>
                                            {
                                                this.state.comments.map(c => {
                                                    return (<p key={this.state.commentCount}>
                                                            {c}
                                                        </p>
                                                    )
                                                })
                                            }
                                        </div>
                                        <CardActions>
                                            <TextField
                                                id="standard-with-placeholder"
                                                placeholder="Add a comment"
                                                fullWidth
                                                margin="normal"

                                                onChange={this.commentChangeHandler}
                                            />
                                            <Button variant="contained" color="primary"
                                                    onClick={this.addClickHandler}
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