import React from 'react';
import Header from "../../common/header/Header";

class  Profile extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          profileHeader :  true
      }
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