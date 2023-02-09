import PropTypes from 'prop-types';
import css from './ContactList.module.css'

import { ContactListItem } from './ContactListItem/ContactListItem';

export const ContactList = ({ items, onDelete }) => {
  return (
    <ul className={css.ul}>
      {items.map(({ id, name, number }) => (
        <ContactListItem
          id={id}
          name={name}
          number={number}
          key={id}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
