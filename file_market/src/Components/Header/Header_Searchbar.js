import React, { useState } from 'react';
import styles from '../../assets/css/Header/Header_Searchbar.module.css';

const Searchbar = (props) => {
    const [searchValue, setSearchValue] = useState(null);

    return(
        <div className={styles.searchbar_wrapper}>
            <input
                type="search"
                placeholder='Search'
                className={styles.search_input}
                value={searchValue}
                onChange={(event) => {
                    setSearchValue(event.target.value);
                }}
                >
            </input>
            <button
                className={styles.search_button}
                onClick={() => {
                    props.handleSearchKey(searchValue);
                }}>
                Search
            </button>
        </div>
    )
}

export default Searchbar;