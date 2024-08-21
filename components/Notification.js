import React, { useState, useEffect } from 'react';
import styles from '../styles/Notification.module.css';

const Notification = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 1000); 
        }, 3000); 

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`${styles.notification} ${!visible ? styles.hidden : ''}`}>
            {message}
            <div className={styles.notificationBar}></div>
        </div>
    );
};

export default Notification;
