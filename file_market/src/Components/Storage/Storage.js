import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import styles from "../../assets/css/Storage/Storage.module.css";
import Button from "./Button";
import Information from "./Information";

const Storage = () => {
  return (
    <div className={styles.storage_wrapper}>
      <Header></Header>
      <div className={styles.storage_block_wrapper}>
        <Sidebar currentPage="storage" />
        <Button></Button>
        <Information></Information>
      </div>
    </div>
  );
};

export default Storage;
