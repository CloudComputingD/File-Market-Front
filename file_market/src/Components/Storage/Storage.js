import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import styles from "../../assets/css/Storage/Storage.module.css";
import FileList from "./FileList";
import FileInfo from "./FileInfo";

const Storage = ({ fileList, folderList }) => {
  const [data, setData] = useState([]);

  const onRemove = (targetId) => {
    const newFileList = data.filter((it) => it.id !== targetId);
    setData(newFileList);
  };

  return (
    <div className={styles.storage_wrapper}>
      <Header></Header>
      <div className={styles.storage_block_wrapper}>
        <Sidebar currentPage="storage" />
        <div className={styles.storage_block}>
          <FileList
            onRemove={onRemove}
            fileList={fileList}
            folderList={folderList}
          ></FileList>
          <FileInfo></FileInfo>
        </div>
      </div>
    </div>
  );
};

export default Storage;
