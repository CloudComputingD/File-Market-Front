import styles from "../../assets/css/Storage/FileInfo.module.css";
import favoriteIcon from "../../assets/image/blackstaricon.png";
import notFavoriteIcon from "../../assets/image/staricon.png";
import infoIcon from "../../assets/image/infoicon.png";
import fileIcon from "../../assets/image/fileicon.png";
import folderIcon from "../../assets/image/foldericon.png";
import { FormatBytes } from "../../logics/Formatter";

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
            &nbsp;{props.file.title}
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
            &nbsp;{props.folder.title}
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
          File name: {props.file.title}
          <br></br>
          Author id: {props.file.user_id}
          <br></br>
          Size: {FormatBytes(props.file.size)}
          <br></br>
          Uploaded: {props.file.created_time}
          <br></br>
          Favorite: {props.file.favorite ? "O" : "X"}
          <br></br>
          Parent folder: {props.file.folder_id}
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
          Folder name: {props.folder.title}
          <br></br>
          Author id: {props.folder.user_id}
          <br></br>
          Size: {FormatBytes(props.folder.size)}
          <br></br>
          Uploaded: {props.folder.created_time}
          <br></br>
          Favorite: {props.folder.favorite ? "O" : "X"}
        </div>
      </div>
    );
  }
};

const FileInfo = (props) => {
  if (!props.file && !props.folder) {
    return <div>No file or folder selected</div>;
  }
  return (
    <div className={styles.fileinfo_wrapper}>
      <FavoriteFile
        file={props.file}
        folder={props.folder}
        colorTheme={props.colorTheme}
        onFavorite={props.onFavorite}
      ></FavoriteFile>
      <Information
        file={props.file}
        folder={props.folder}
        colorTheme={props.colorTheme}
      ></Information>
    </div>
  );
};

export default FileInfo;
