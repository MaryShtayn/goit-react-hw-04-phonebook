import PropTypes from 'prop-types';
import ContactItem from '../ContactItem';
import styled from 'styled-components';

const ListStyled = styled.ul`
  list-style: none;
`;
const ContactsList = ({ contactsList, onDelete }) => {
  return (
    <>
      <ListStyled>
        {contactsList.map(({ id, name, number }) => (
          <li key={id}>
            <ContactItem
              id={id}
              name={name}
              number={number}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ListStyled>
    </>
  );
};

ContactsList.defaultProps = {
  contactsList: [],
};

ContactsList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsList;
