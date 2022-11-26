import { nanoid } from 'nanoid'
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';
import css from './App.module.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isNameAdded = name.toUpperCase();

    const isAdded = contacts.find(el => {
      return ( el.name.toUpperCase() === isNameAdded);
    });

    if (isAdded) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevContacts => [...prevContacts, contact]);
  }

  const deleteContact = e => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== e),
    );
  };

  const getContacts = () => {
    const isAddedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(isAddedFilter)
    );
  };

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  }

  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={css.contact_title}>Contacts</h2>

      {contacts.length > 0 ? (
        <>
          <Filter value={filter} onChange={filterChange} />
          <ContactList
            contacts={getContacts()}
            onDeleteContact={deleteContact} />
        </>
      ) : (
        <Notification message="Contact list is empty" />
      )}

    </div>
  );
}

export default App;
