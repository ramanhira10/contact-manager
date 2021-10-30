import React from 'react';
import {Link} from 'react-router-dom';
import user from '../images/user.png';

const ContactDetails = props => {

  const {name, email} = props.location.state.contact;

  return (
    <div className="main" style={{position: 'relative'}}>
      <div className="ui card centered">
        <div className="image" style={{position: 'absolute', top: '40px'}}>
          <img src={user} alt="user" />
          <div className="content" style={{textAlign: 'center'}}>
            <div className="header">{name}</div>
            <div className="description">{email}</div>
          </div>
        </div>
        <div className="center-div" style={{position: 'absolute', top:'300px', left: '40px'}}>
          <Link to="/">
            <button className="ui button blue center">Back to Contact List</button>
          </Link>
          
        </div>
      </div>
      
    </div>
  );
};

export default ContactDetails;