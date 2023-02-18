import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

 
  const createContactItem = ({ name, number }) => {
    const isIncludesName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!isIncludesName) {
      setContacts(prevState => {
        const contact = { id: nanoid(), name, number };
        return [contact, ...prevState];
      });
    } else alert(`${name} is already in contacts`);
  };

  
  const changeFilter = ({ target }) => setFilter(target.value);

  const filterContactItem = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterItem = contacts.filter(({name}) =>
      name.toLowerCase().includes(normalizedFilter)
    );
    return filterItem;
  };

  const deleteContactItem = itemId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== itemId));
  };

    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={createContactItem} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length > 0 && (
          <ContactList
            items={filterContactItem()}
            onDelete={deleteContactItem}
          />
        )}
      </>
    );
  }
