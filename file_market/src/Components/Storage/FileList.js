import uploadIcon from "../../assets/image/uploadicon.png";
import downloadIcon from "../../assets/image/downloadicon.png";
import renameIcon from "../../assets/image/renameicon.png";
import newFolderIcon from "../../assets/image/addfoldericon.png";
import binIcon from "../../assets/image/binicon.png";
import styles from "../../assets/css/Storage/FileList.module.css";

const Button = () => {
  return (
    <div className={styles.btn_wrapper}>
      <div className={styles.btn_title_wrapper}>FolderName</div>
      <div className={styles.btn}>
        <button
          className={styles.btn_upload}
          onClick={() => {
            alert("Upload Folder or File");
          }}
        >
          <img
            className={styles.img_upload}
            src={uploadIcon}
            height={14}
            width={14}
          />
          <div className={styles.text_wrapper}>&nbsp;Upload</div>
        </button>

        <button
          className={styles.btn_else}
          onClick={() => {
            alert("Download Folder or File");
          }}
        >
          <img
            className={styles.img_else}
            src={downloadIcon}
            height={14}
            width={14}
          />
          <div className={styles.text_wrapper}>&nbsp;Download</div>
        </button>

        <button
          className={styles.btn_else}
          onClick={() => {
            alert("Make Folder");
          }}
        >
          <img
            className={styles.img_else}
            src={newFolderIcon}
            height={14}
            width={14}
          />
          <div className={styles.text_wrapper}>&nbsp;New Folder</div>
        </button>

        <button
          className={styles.btn_else}
          onClick={() => {
            alert("Rename Folder or File");
          }}
        >
          <img
            className={styles.img_else}
            src={renameIcon}
            height={14}
            width={14}
          />
          <div className={styles.text_wrapper}>&nbsp;Rename</div>
        </button>

        <button
          className={styles.btn_else}
          onClick={() => {
            alert("Delete Folder or File");
          }}
        >
          <img
            className={styles.img_else}
            src={binIcon}
            height={14}
            width={14}
          />
          <div className={styles.text_wrapper}>&nbsp;Delete</div>
        </button>
      </div>
    </div>
  );
};

const Files = () => {
  return <div className={styles.files_wrapper}>files</div>;
};

const FileList = () => {
  return (
    <div className={styles.filelist_wrapper}>
      <Button></Button>
      <Files></Files>
    </div>
  );
};

export default FileList;
