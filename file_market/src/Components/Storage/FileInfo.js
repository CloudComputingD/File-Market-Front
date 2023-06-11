import React, { useState, useEffect } from "react";
import styles from "../../assets/css/Storage/FileInfo.module.css";
import favoriteIcon from "../../assets/image/blackstaricon.png";
import notFavoriteIcon from "../../assets/image/staricon.png";
import infoIcon from "../../assets/image/infoicon.png";
import fileIcon from "../../assets/image/fileicon.png";
import folderIcon from "../../assets/image/foldericon.png";
import { FormatBytes } from "../../logics/Formatter";
import { API_GetFileInfo, API_GetFolderInfo, API_SetFileFavorite, API_SetFolderFavorite } from "../../API/APIManager";

const FavoriteFile = (props) => {
  if (props.file) {
    return (
      <div
        className={`${styles.favoritefile_wrapper} ${
          props.colorTheme === "light"
            ? null
            : styles.darkmode_favoritefile_wrapper
        }`}
      >
        <div className={styles.favoritefile_header}>
          <img
            className={`${styles.favorite_mark} ${
              props.colorTheme === "light"
                ? null
                : styles.darkmode_information_icon
            }`}
            src={props.file.favorite ? favoriteIcon : notFavoriteIcon}
            width={25}
            height={25}
            onClick={() => props.onFavorite(null, props.file)}
          ></img>
          <div
            className={`${
              props.colorTheme === "light"
                ? null
                : styles.darkmode_information_text
            }`}
          >
            &nbsp;{props.file.name}
          </div>
        </div>
      </div>
    );
  }
  if (props.folder) {
    return (
      <div
        className={`${styles.favoritefile_wrapper} ${
          props.colorTheme === "light"
            ? null
            : styles.darkmode_favoritefile_wrapper
        }`}
      >
        <div className={styles.favoritefile_header}>
          <div>
            <img
              className={`${styles.favorite_mark} ${
                props.colorTheme === "light"
                  ? null
                  : styles.darkmode_information_icon
              }`}
              src={props.folder.favorite ? favoriteIcon : notFavoriteIcon}
              width={25}
              height={25}
              onClick={() => props.onFavorite(props.folder, null)}
            ></img>
          </div>
          <div
            className={`${
              props.colorTheme === "light"
                ? null
                : styles.darkmode_information_text
            }`}
          >
            &nbsp;{props.folder.name}
          </div>
        </div>
      </div>
    );
  }
};

const Information = (props) => {
  if (props.file) {
    return (
      <div className={styles.information_wrapper}>
        <div
          className={`${styles.information_header} ${
            props.colorTheme === "light"
              ? null
              : styles.darkmode_information_text
          }`}
        >
          <img
            className={`${styles.information_icon} ${
              props.colorTheme === "light"
                ? null
                : styles.darkmode_information_icon
            }`}
            src={infoIcon}
            width={20}
            height={20}
          ></img>
          &nbsp;Information
        </div>
        <img
          className={`${styles.information_img} ${
            props.colorTheme === "light"
              ? null
              : styles.darkmode_information_icon
          }`}
          src={fileIcon}
        ></img>
        <div
          className={`${styles.information_text} ${
            props.colorTheme === "light"
              ? null
              : styles.darkmode_information_text
          }`}
        >
          Size: {FormatBytes(props.file.file_size)}
          <br></br>
          Uploaded: {props.file.modified_time.split('T')[0]}
          <br></br>
          Extension: {props.file.extension.split('/')[1]}
        </div>
      </div>
    );
  }

  if (props.folder) {
    return (
      <div className={styles.information_wrapper}>
        <div
          className={`${styles.information_header} ${
            props.colorTheme === "light"
              ? null
              : styles.darkmode_information_text
          }`}
        >
          <img
            className={`${styles.information_icon} ${
              props.colorTheme === "light"
                ? null
                : styles.darkmode_information_icon
            }`}
            src={infoIcon}
            width={20}
            height={20}
          ></img>
          &nbsp;Information
        </div>
        <img
          className={`${styles.information_img} ${
            props.colorTheme === "light"
              ? null
              : styles.darkmode_information_icon
          }`}
          src={folderIcon}
        ></img>
        <div
          className={`${styles.information_text} ${
            props.colorTheme === "light"
              ? null
              : styles.darkmode_information_text
          }`}
        >
          Size: {FormatBytes(props.folderSize)}
          <br></br>
          Uploaded: {props.folder.created_time.split('T')[0]}
          <br></br>
          Files: {props.folder.files.length}
          <br></br>
        </div>
      </div>
    );
  }
};

const FileInfo = (props) => {
  // if (!props.file && !props.folder) {
  //   return <div>No file or folder selected</div>;
  // }
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState(null);
  const [folderSize, setFolderSize] = useState(0);

  async function handleFavorite(targetFolder, targetFile) {
    if (targetFolder) {
      let result = await API_SetFolderFavorite(targetFolder.id, localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
      getFolderInfo();
      props.handleFavChange();
    }

    if (targetFile) {
      let result = await API_SetFileFavorite(targetFile.id, localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
      getFileInfo();
      props.handleFavChange();
    }
  };

  async function getFileInfo() {
    if (props.file !== null) {
      const result = await API_GetFileInfo(props.file);
      setFile(result);
    } else {
      setFile(null);
    }
  }
  
  async function getFolderInfo() {
    if (props.folder !== null) {
      const result = await API_GetFolderInfo(props.folder);
      setFolder(result);
      let size = 0;
      result.files.forEach((el) => {
        size += el.file_size;
      })
      setFolderSize(size);
    } else {
      setFolder(null);
    }
  }

  useEffect(() => {
    getFileInfo();
  }, [props.file])

  useEffect(() => {
    getFolderInfo();
  }, [props.folder])

  return (
    <div className={styles.fileinfo_wrapper}>
      <FavoriteFile
        file={file}
        folder={folder}
        colorTheme={props.colorTheme}
        onFavorite={handleFavorite}
      ></FavoriteFile>
      <Information
        file={file}
        folder={folder}
        folderSize={folderSize}
        colorTheme={props.colorTheme}
      ></Information>
    </div>
  );
};

export default FileInfo;
