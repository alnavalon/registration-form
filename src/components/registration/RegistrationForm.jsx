import React from 'react';
import styles from './RegistrationForm.module.css';
import {CustomSelect} from '../common/customSelect/CustomSelect';
import {InputError} from '../common/inputError/InputError';
import useRegistrationForm from '../customHooks/useRegistrationForm';

const languageList = ['Русский', 'Английский', 'Китайский', 'Испанский'];
const inputsList = [
    {
        id: 'name',
        name: 'name',
        label: 'Имя',
        placeholder: 'Введите Ваше имя',

    },
    {
        id: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'Введите Ваш email'
    },
    {
        id: 'number',
        name: 'number',
        label: 'Номер телефона',
        placeholder: 'Введите номер телефона'
    },
];

export function RegistrationForm(props) {
    const {values, errors, handleInputChange, handleSelectChange} = useRegistrationForm({
        name: null,
        email: null,
        number: null,
        language: null,
        agreement: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <div className={styles.registrationContainer}>
            <h2 className={styles.header}>Регистрация</h2>
            <p className={styles.subheader}>Уже есть аккаунт? <a href="#" className={styles.link}>Войти</a></p>
            <form className={styles.registration__form} onSubmit={handleSubmit}>
                {
                    inputsList.map(item => (
                        <React.Fragment key={item.id}>
                            <label className={styles.inputLabel} htmlFor={item.id}>{item.label}</label>
                            <input type="text"
                                   name={item.name}
                                   id={item.id}
                                   className={styles.input}
                                   placeholder={item.placeholder}
                                   onChange={handleInputChange}
                            />
                            <div className={styles.errorContainer}>
                                {errors[item.id] && <InputError>{errors[item.id]}</InputError>}
                            </div>
                        </React.Fragment>
                    ))
                }

                <CustomSelect list={languageList}
                              inputName="language"
                              placeholder="Язык"
                              handleSelectChange={handleSelectChange}/>

                <div className={styles.checkboxContainer}>
                    <input className={styles.checkboxInput} type="checkbox"
                           name="agreement"
                           id="agreement"
                           onChange={handleInputChange}
                    />
                    <label htmlFor="agreement">Принимаю <a href="#"
                                                           className={styles.link}>условия</a> использования</label>
                </div>
                <button className={styles.submitButton}
                        type="submit"
                        disabled={Object.keys(errors).length > 0 || Object.values(values).some(item => item == null)}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}