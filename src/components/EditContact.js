import React from 'react';
import api from '../api/contacts';
import { uuid } from 'uuidv4';

class EditContact extends React.Component {

  constructor(props) {
    super(props);
    const {id, name, email} = props.location.state.contact;

    this.state = {
      id,
      name,
      email
    };
  }
  
  updateContactHandler = async () => {
    
    const request = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email
    };

    const response = await api.put(`/contacts/${this.state.id}`, request);

    if (response.status === 200) {
      
      this.setState({
        name: '',
        email: ''
      });
      
      this.props.history.push('/');
    }
  };

  update = (e) => {
    e.preventDefault();

    if (this.state.name === '' || this.state.email === '') {
      alert('All the fields are mandatory');
      return;
    }

    this.updateContactHandler();
  };

  render () {

    return (
      <div className="ui main">
        
        <div style={{position: 'relative', top: '60px'}}>
            <h2>Edit Contact</h2>
        </div>

        <form
          onSubmit={this.update}
          className="ui form"
          style={{position: 'relative', top: '60px'}}
        >
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({name: e.target.value})}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({email: e.target.value})}
            />
          </div>

          <div>
            <button className="ui button blue">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditContact;