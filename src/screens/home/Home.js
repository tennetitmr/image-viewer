import React, {Component} from  'react';
class Home extends Component {
     userSelfURI = 'https://api.instagram.com/v1/users/self/?access_token=YourAccessToken';
    constructor(){
        super();
        this.state = {
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }
    componentWillMount() {
        if(!this.state.loggedIn){
            this.props.history.push('/');
        }
    }
    render (){
        return (
            <div>
                <div>
                    <p>Home</p>
                </div>
            </div>

        )
    }
}

export default Home;