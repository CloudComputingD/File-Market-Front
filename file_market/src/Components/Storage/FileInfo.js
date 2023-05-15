import styles from "../../assets/css/Storage/FileInfo.module.css";
import favoriteIcon from "../../assets/image/blackstaricon.png";
import infoIcon from "../../assets/image/infoicon.png";
import fileIcon from "../../assets/image/fileicon.png";

const FavoriteFile = () => {
  return (
    <div className={styles.favoritefile_wrapper}>
      <div className={styles.favoritefile_header}>
        <div>
          <img
            className={styles.favorite_mark}
            src={favoriteIcon}
            width={25}
            height={25}
          ></img>
        </div>
        <div className="">&nbsp;FileName</div>
      </div>
    </div>
  );
};

const Information = ({
  file_attribute,
  directory,
  size,
  uploaded,
  extension,
}) => {
  return (
    <div className={styles.information_wrapper}>
      <div className={styles.information_header}>
        <img className="" src={infoIcon} width={20} height={20}></img>
        &nbsp;Information
      </div>
      <img className={styles.information_img} src={fileIcon}></img>
      <div className={styles.information_text}>
        File Attribute: {file_attribute}
        <br></br>
        Directory: {directory}
        <br></br>
        Size: {size}
        <br></br>
        Uploaded: {uploaded}
        <br></br>
        Extension: {extension}
      </div>
    </div>
  );
};

const FileInfo = () => {
  return (
    <div className={styles.fileinfo_wrapper}>
      <FavoriteFile></FavoriteFile>
      <Information></Information>
    </div>
  );
};

export default FileInfo;
