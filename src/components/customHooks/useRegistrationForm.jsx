import {useState} from 'react';

const useRegistrationForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    function validate(inputs, inputName) {
        const newErrors = {...errors};

        switch (inputName) {
            case 'name': {
                if (!/^[А-ЯA-Zа-яa-z -]+$/.test(inputs.name)) {
                    newErrors.name = 'Введено некорректное значение';
                } else {
                    delete newErrors.name;
                }
                break;
            }
            case 'email': {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
                    newErrors.email = 'Введено некорректное значение';
                } else {
                    delete newErrors.email;
                }
                break;
            }
            case 'number': {
                if (!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/.test(inputs.number)) {
                    newErrors.number = 'Введено некорректное значение';
                } else {
                    delete newErrors.number;
                }
                break;
            }
            case 'agreement': {
                if (!inputs.agreement) {
                    newErrors.agreement = 'Введено некорректное значение';
                } else {
                    delete newErrors.agreement;
                }
                break;
            }
            case 'language': {
                if (!inputs.language) {
                    newErrors.language = 'Введено некорректное значение';
                } else {
                    delete newErrors.language;
                }
                break;
            }
            default:
                break;
        }

        return newErrors;
    }

    const handleInputChange = (event) => {
        const inputType = event.target.type;
        const inputName = event.target.name;

        const newData = {
            ...values,
            [inputName]: inputType === 'checkbox' ? event.target.checked : event.target.value
        };

        const validationErrors = validate(newData, inputName);
        setErrors(validationErrors);
        setValues(newData);
    };

    const handleSelectChange = (inputName, value) => {
        const newData = {
            ...values,
            [inputName]: value
        };
        setValues(newData);
        const validationErrors = validate(newData, inputName);
        setErrors(validationErrors);
    };

    return {
        handleInputChange,
        handleSelectChange,
        values,
        errors
    };
};
export default useRegistrationForm;