import React from 'react';
import {Link} from 'react-router-dom';
import user from '../images/user.png';

const ContactCard = props => {

  const {contact, deleteContactHandler} = props;
  if (contact) {
    
    const {id, name, email} = contact;

    return (
      <div className="item">
        <img className="ui avatar image" src={user} alt="user" />
        <div className="content" style={{position: 'relative'}}>
          <Link
            to={{
              pathname: `/contact/${id}`,
              state: {contact: props.contact}
            }}
          >
            <div className="header">{name}</div>
            <div>{email}</div>
          </Link>

          <Link
            to={{
              pathname: '/edit',
              state: {contact: props.contact}
            }}
          >
            <i
              className="edit alternate outline icon"
              style={{position: 'absolute', color: 'red', top:'10px', left: '120vh'}}
            />
          </Link>
          
          <i
            className="trash alternate outline icon"
            style={{position: 'absolute', color: 'red', top:'10px', left: '125vh'}}
            onClick={() => deleteContactHandler(id)}
          />
        </div>
      </div>
    );
  }

  return (
    <div>No data</div>
  );
  
};

export default ContactCard;