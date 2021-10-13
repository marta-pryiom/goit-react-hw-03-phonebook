import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import './App.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContacts = info => {
    const searchSameName = this.state.contacts
      .map(el => el.name.toLowerCase())
      .includes(info.name.toLowerCase());

    if (searchSameName) {
      alert(`${info.name} is already in contacts`);
    } else {
      const newContact = { ...info, id: uuidv4() };
      this.setState(prev => ({
        contacts: [newContact, ...prev.contacts],
      }));
    }
  };
  deleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  setFilteredContacts = e => {
    this.setState({ filter: e.target.value });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  render() {
    const {
      addContacts,
      setFilteredContacts,
      getVisibleContacts,
      deleteContact,
    } = this;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContacts} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={setFilteredContacts} />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }
}

export default App;
