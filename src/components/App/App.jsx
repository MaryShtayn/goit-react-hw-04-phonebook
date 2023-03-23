import { useState, useEffect } from 'react';

import ContactForm from '../ContactForm';
import ContactsList from '../ContactsList';
import Filter from '../Filter';
import { GlobalStyle } from 'components/GlobalStyle';
import { Layout, MainTitle, Title } from './App.styled';

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);
    return parsedContacts;
  }
  return [];
};
export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if (contacts.find(contact => contact.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    setContacts([...contacts, newContact]);
  };

  const filterContacts = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    if (!filter) return contacts;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  return (
    <Layout>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSave={addContact} />

      <Title>Contacts</Title>
      <Filter onFilter={filter} onChange={filterContacts} />
      <ContactsList
        contactsList={getFilteredContacts()}
        onDelete={deleteContact}
      />

      <GlobalStyle />
    </Layout>
  );
};
