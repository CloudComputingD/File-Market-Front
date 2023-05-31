import React, { useState } from 'react';
import UserProfile from './Header_Userprofile';
import Searchbar from './Header_Searchbar';
import styles from '../../assets/css/Header/Header.module.css';

const Header = (props) => {

    function handleSearchKey(key) {
        if (key !== null && key !== '') {
            props.handleSearch(key);
            props.navigate('/search');
        }
    }

    return(
        <div className={styles.header}>
            <Searchbar handleSearchKey={handleSearchKey}/>
            <UserProfile />
        </div>
    )
}

export default Header;