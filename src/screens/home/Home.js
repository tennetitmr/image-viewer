import React, {Component} from  'react';
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography/Typography";
class Home extends Component {
     userSelfURI = 'https://api.instagram.com/v1/users/self/?access_token=YourAccessToken';
    constructor(){
        super();
        this.state = {
            isHomePage : true
        }
    }
   /* componentDidMount() {
            this.props.history.push('/');

    }*/
    render (){
        return (
            <div>
                <Header {...this.props} />
                <div>
                    {console.log(this.props.loggedIn)}
                    <p>Home</p>
                </div>
            </div>

        )
    }
}

export default Home;