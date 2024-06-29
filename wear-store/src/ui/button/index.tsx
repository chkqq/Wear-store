import React from 'react';
import styles from './style.module.scss';

interface ButtonProps {
  icon?: string;
  text?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon && <img src={icon} alt="icon" className={styles.icon} />}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};

export default Button;
