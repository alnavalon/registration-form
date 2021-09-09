import {useEffect, useRef, useState} from 'react';
import styles from './CustomSelect.module.css';

// The component emulates "select" HTML element
export const CustomSelect = ({list, inputName, placeholder, handleSelectChange}) => {
    const selectRef = useRef();
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [activeItem, setActiveItem] = useState(-1);

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
        return () => document.body.removeEventListener('click', handleOutsideClick);
    }, []);

    useEffect(() => {
        activeItem > -1 ? handleSelectChange(inputName, list[activeItem]) : handleSelectChange(inputName, '');
    }, [activeItem]);


    const handleOutsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath());
        if (!path.includes(selectRef.current)) {
            setVisiblePopup(false);
        }
    };
    const toggleVisibleSelection = () => {
        setVisiblePopup(prev => !prev);
    };

    const onKeyDownActions = (e) => {
        let currentKey = e.key;
        let lastIndex = list.length - 1;

        if (currentKey === 'ArrowRight' || currentKey === 'ArrowDown') {
            activeItem < lastIndex && setActiveItem(prev => prev + 1);
        } else if (currentKey === 'ArrowLeft' || currentKey === 'ArrowUp') {
            activeItem > 0 && setActiveItem(prev => prev - 1);
        } else if (currentKey === 'Enter' || currentKey === 'Escape') {
            toggleVisibleSelection();
        } else if (currentKey === 'Tab') {
            visiblePopup && toggleVisibleSelection();
        }
    };

    return (
        <>
            <label className={styles.inputLabel} htmlFor={inputName}>Язык</label>
            <div className={styles.container} onClick={toggleVisibleSelection} ref={selectRef}>
                <input className={styles.input}
                       type="text"
                       name={inputName}
                       id={inputName}
                       onKeyDown={onKeyDownActions}
                       placeholder={placeholder}
                       value={activeItem === -1 ? '' : list[activeItem]}
                       readOnly
                />
                {
                    visiblePopup &&
                    <ul className={styles.optionsContainer}>
                        {
                            list.map((item, index) =>
                                <li className={activeItem === index ? styles.activeListItem : ''}
                                    key={`${item}_${index}`}
                                    onClick={() => {
                                        setActiveItem(index);
                                    }}
                                >
                                    {item}
                                </li>
                            )
                        }
                    </ul>
                }
            </div>
        </>
    );
};
