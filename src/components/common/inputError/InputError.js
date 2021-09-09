import styles from './InputError.module.css';

export const InputError = (props) => {
    return (
        <p className={styles.errorText}>{props.children}</p>
    )
};