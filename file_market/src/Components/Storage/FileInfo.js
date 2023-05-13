import styles from "../../assets/css/Storage/FileInfo.module.css";
import favoriteIcon from "../../assets/image/favoriteicon.png";
const FavoriteFile = () => {
  return (
    <div className={styles.favoritefile_wrapper}>
      <div className={styles.favoritefile_header}>
        <div>
          <img className="" src={favoriteIcon} width={20} height={20}></img>
        </div>
        <div className="">&nbsp;FileName</div>
      </div>
    </div>
  );
};

const Information = () => {
  return <div className={styles.information_wrapper}>Information..</div>;
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
