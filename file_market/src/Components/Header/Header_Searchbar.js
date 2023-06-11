import React, { useState } from "react";
import styles from "../../assets/css/Header/Header_Searchbar.module.css";

const Searchbar = (props) => {
  const colorTheme = props.colorTheme;
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div className={styles.searchbar_wrapper}>
      <input
        type="search"
        placeholder="Enter to search"
        className={`${styles.search_input} ${
          colorTheme === "light" ? null : styles.darkmode_input_bgcolor
        }`}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      ></input>
      <button
        className={`${styles.search_button} ${
          colorTheme === "light" ? null : styles.darkmode_button
        }`}
        onClick={() => {
          props.handleSearchKey(searchValue);
          setSearchValue(null);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
