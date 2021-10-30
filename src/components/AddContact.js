import React from 'react';
import api from '../api/contacts';
import { uuid } from 'uuidv4';

class AddContact extends React.Component {

  state = {
    name: "",
    email: ""
  };
  
  addContactHandler = async contactToAdd => {
    
    const request = {
      id: uuid(),
      ...contactToAdd
    };

    const response = await api.post('/contacts', request);

    if (response.status === 201) {
      
      this.setState({
        name: '',
        email: ''
      });
      
      this.props.history.push('/');
    }
  };

  add = (e) => {
    e.preventDefault();

    if (this.state.name === '' || this.state.email === '') {
      alert('All the fields are mandatory');
      return;
    }

    this.addContactHandler(this.state);
  };

  render () {

    return (
      <div className="ui main">
        
        <div style={{position: 'relative', top: '60px'}}>
            <h2>Add Contact</h2>
        </div>

        <form onSubmit={this.add} className="ui form" style={{position: 'relative', top: '60px'}}>
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
          </div>

          <div>
            <button className="ui button blue">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddContact;