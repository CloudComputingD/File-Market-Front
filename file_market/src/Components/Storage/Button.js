import uploadIcon from "../../assets/image/uploadicon.png";
import styles from "../../assets/css/Storage/Button.module.css";
const Button = () => {
  return (
    <div className="btn">
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
          src={uploadIcon}
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
          src={uploadIcon}
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
          src={uploadIcon}
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
          src={uploadIcon}
          height={14}
          width={14}
        />
        <div className={styles.text_wrapper}>&nbsp;Delete</div>
      </button>
    </div>
  );
};

export default Button;
