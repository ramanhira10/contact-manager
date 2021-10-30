import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';
import api from '../api/contacts';

const ContactList = () => {

  const searchInputRef = useRef('');
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const deleteContactHandler = async id => {

    await api.delete(`/contacts/${id}`);

    const newContactList = contacts.filter(contact => contact.id !== id);

    setContacts(newContactList);
  };

  const retrieveContacts = async () => {
    const response = await api.get('./contacts');
    return response.data;
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) {
        setContacts(allContacts);
      }
    };
    getAllContacts();
  }, []);

  const searchHandler = (st) => {
    if (st !== '') {
      const newContactList = contacts.filter(
        contact => Object.values(contact).join(' ').toLowerCase().includes(st)
      );
      if (newContactList && newContactList.length > 0) {
        setContacts(newContactList);
      } else {
        setContacts([]);
      }
    }
  };

  const getSearchTerm = () => {
    setSearchTerm(searchInputRef.current.value);
    searchHandler(searchInputRef.current.value);
  };

  const renderContactList = contacts.map(contact => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        deleteContactHandler={deleteContactHandler}
      />
    );
  });

  return (
    <div className="main" style={{position: 'relative'}}>
      <h2 style={{position: 'absolute', top: '40px'}}>Contact List</h2>
      <div className="ui search" style={{position: 'absolute', top: '80px'}}>
        <div className="ui icon input">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="search contact"
            className="prompt"
            value={searchTerm}
            onChange={getSearchTerm}
          />
          <i className="search icon" />
        </div>
      </div>
      
      <Link to="/add">
        <button className="ui button blue" style={{position: 'absolute', top: '80px', right: '10px'}}>Add Contact</button>
      </Link>
      
      <div className="ui celled list" style={{position: 'relative', top: '130px'}}>
        {renderContactList}
      </div>
    </div>
    
  );
};

export default ContactList;