import React from 'react';
import UserProfile from './Header_Userprofile';
import Searchbar from './Header_Searchbar';
import styles from '../../assets/css/Header/Header.module.css';

const Header = () => {

    return(
        <div className={styles.header}>
            <Searchbar />
            <UserProfile />
        </div>
    )
}

export default Header;