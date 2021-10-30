import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from "./Header";
import AddContact from './AddContact';
import ContactList from './ContactList';

import './App.css';
import ContactDetails from './ContactDetails';
import EditContact from './EditContact';

const App = () => {

  const LOCAL_STORAGE_KEY = 'contacts';

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts) {
      setContacts(retrieveContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={ContactList} />
          <Route path="/add" component={AddContact} />
          <Route path="/edit" component={EditContact} />
          <Route path="/contact/:id" component={ContactDetails} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
