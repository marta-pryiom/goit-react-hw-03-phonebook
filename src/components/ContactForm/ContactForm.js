import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  shortNameId = uuidv4();
  shortTelId = uuidv4();
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const obj = {
      name,
      number,
    };
    this.props.onSubmit(obj);
    this.reset();
  };

  reset() {
    this.setState({
      name: '',
      number: '',
    });
  }

  render() {
    const { handleSubmit, shortNameId, handleChange, shortTelId } = this;
    const { name, number } = this.state;
    return (
      <div className={s.Container}>
        <form className={s.Form} onSubmit={handleSubmit}>
          <label htmlFor={shortNameId} className={s.FormTitle}>
            Name
          </label>
          <input
            className={s.FormInput}
            value={name}
            id={shortNameId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            onChange={handleChange}
            required
          />
          <label htmlFor={shortTelId} className={s.FormTitle}>
            Number
          </label>
          <input
            className={s.FormInput}
            value={number}
            id={shortTelId}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            onChange={handleChange}
            required
          />
          <button type="submit" className={s.FormBtn}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
