import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = e => {
        const prop = e.currentTarget.name;
        switch (prop) {
            case 'name':
                setName(e.currentTarget.value);
                break;
            case 'number':
                setNumber(e.currentTarget.value);
                break;
            default:
                throw new Error('Error');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit({ name, number });
        setName('');
        setNumber('');
    };

    return (
        <div className={css.form_box}>
            <form className={css.contact_form} onSubmit={handleSubmit}>
                <lable className={css.contact_lable}>
                    <span className={css.label_text}>Name</span>
                    <input
                        className={css.input_name}
                        value={name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </lable>

                <label className={css.contact_lable}>
                    <span className={css.label_text}>Number</span>
                    <input
                        className={css.input_num}
                        value={number}
                        onChange={handleChange}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>

                <button type='submit' className={css.contact_btn_add}>Add contact</button>
            </form>
        </div>
    );

}

ContactForm.protoType = {
    onSubmit: PropTypes.func,
}

export default ContactForm;