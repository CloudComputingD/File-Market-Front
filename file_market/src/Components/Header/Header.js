import React, { useState } from 'react';
import UserProfile from './Header_Userprofile';
import Searchbar from './Header_Searchbar';
import styles from '../../assets/css/Header/Header.module.css';

const Header = (props) => {
    const colorTheme = props.colorTheme;

    function handleSearchKey(key) {
        if (key !== null && key !== '') {
            props.handleSearch(key);
            props.navigate('/search');
        }
    }

    return(
        <div className={styles.header_wrapper}>
            <div className={styles.logo_wrapper}>

            </div>
            <div className={`${styles.header} ${colorTheme === 'light' ? null : styles.darkmode_header_bgcolor}`}>
                <Searchbar colorTheme={colorTheme} handleSearchKey={handleSearchKey}/>
                <UserProfile colorTheme={colorTheme} />
            </div>
        </div>
        
    )
}

export default Header;