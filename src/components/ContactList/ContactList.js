import css from './ContactList.module.css';
import { Filter } from 'components/Filter/Filter';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { useSelector, useDispatch } from 'react-redux';
import { Audio } from 'react-loader-spinner';

import {
  getContactsList,
  getFilter,
  getIsLoading,
  getError,
} from 'redux/selectors';
import PropTypes from 'prop-types';
import { deleteContact, getContacts } from 'redux/operations';

function ContactList() {
  const contacts = useSelector(getContactsList);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  const filteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const deleteContacts = id => {
    dispatch(deleteContact(id));
    dispatch(getContacts());
  };

  return (
    <>
      <Filter />
      {isLoading && !error && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      )}
      <ul className={css.contactsList}>
        {!isLoading &&
          filteredContacts().map(({ id, name, number }) => (
            <ContactItem
              key={id}
              id={id}
              name={name}
              number={number}
              onDeleteBtn={() => deleteContacts(id)}
            />
          ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export { ContactList };
