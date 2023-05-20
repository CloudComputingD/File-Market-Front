import styles from "../../assets/css/Storage/FileInfo.module.css";
import favoriteIcon from "../../assets/image/blackstaricon.png";
import infoIcon from "../../assets/image/infoicon.png";
import fileIcon from "../../assets/image/fileicon.png";
import folderIcon from "../../assets/image/foldericon.png";

const FavoriteFile = ({ file, folder }) => {
  if (file) {
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
          <div className="">&nbsp;{file.title}</div>
        </div>
      </div>
    );
  }
  if (folder) {
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
          <div className="">&nbsp;{folder.title}</div>
        </div>
      </div>
    );
  }
};

const Information = ({ file, folder }) => {
  if (file) {
    return (
      <div className={styles.information_wrapper}>
        <div className={styles.information_header}>
          <img className="" src={infoIcon} width={20} height={20}></img>
          &nbsp;Information
        </div>
        <img className={styles.information_img} src={fileIcon}></img>
        <div className={styles.information_text}>
          File name: {file.title}
          <br></br>
          Author id: {file.user_id}
          <br></br>
          Size: {file.size}
          <br></br>
          Uploaded: {file.created_time}
        </div>
      </div>
    );
  }

  if (folder) {
    return (
      <div className={styles.information_wrapper}>
        <div className={styles.information_header}>
          <img className="" src={infoIcon} width={20} height={20}></img>
          &nbsp;Information
        </div>
        <img className={styles.information_img} src={folderIcon}></img>
        <div className={styles.information_text}>
          Folder name: {folder.title}
          <br></br>
          Author id: {folder.user_id}
          <br></br>
          Size: {folder.size}
          <br></br>
          Uploaded: {folder.created_time}
        </div>
      </div>
    );
  }
};

const FileInfo = ({ file, folder }) => {
  if (!file && !folder) {
    return <div>No file or folder selected</div>;
  }
  return (
    <div className={styles.fileinfo_wrapper}>
      <FavoriteFile file={file} folder={folder}></FavoriteFile>
      <Information file={file} folder={folder}></Information>
    </div>
  );
};

export default FileInfo;
