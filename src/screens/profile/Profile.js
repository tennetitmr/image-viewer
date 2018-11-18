import React from 'react';
import Header from "../../common/header/Header";

class  Profile extends React.Component{


    render(){
        return(
            <div>
                <Header {...this.props}/>
                <div>
                    <p>Profile page</p>
                </div>

            </div>
        )
    }

}

export default Profile;