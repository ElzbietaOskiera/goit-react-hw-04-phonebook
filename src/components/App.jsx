import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsSave = JSON.parse(localStorage.getItem('contacts'));
    if (contactsSave) {
      this.setState({ contacts: contactsSave });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  createContactItem = ({ name, number }) => {
    const isIncludesName = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!isIncludesName) {
      this.setState(prevState => ({
        contacts: [{ id: nanoid(), name, number }, ...prevState.contacts],
      }));
    } else alert(`${name} is already in contacts`);
  };

  deleteContactItem = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== itemId),
    }));
  };

  changeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({
      filter: value,
    });
  };

  filterContactItem = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filterItem = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filterItem;
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.createContactItem} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        {contacts.length > 0 && (
          <ContactList
            items={this.filterContactItem()}
            onDelete={this.deleteContactItem}
          />
        )}
      </>
    );
  }
}
