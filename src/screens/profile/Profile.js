import React from 'react';
import Header from "../../common/header/Header";

class  Profile extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          profileHeader :  true,
          profile_picture : '',
          username: ''
      }
  }
  componentWillMount(){
      this.fetchUser();
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
    render(){
        return(
            <div>
                <Header {...this.props} profileHeader={this.state.profileHeader}
                        profile_picture={this.state.profile_picture}/>
                <div>
                    <p>Profile page</p>
                </div>

            </div>
        )
    }

}

export default Profile;