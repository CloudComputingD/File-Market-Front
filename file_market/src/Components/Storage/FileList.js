import { useState } from "react";
import styles from "../../assets/css/Storage/FileList.module.css";
import uploadIcon from "../../assets/image/uploadicon.png";
import downloadIcon from "../../assets/image/downloadicon.png";
import renameIcon from "../../assets/image/renameicon.png";
import newFolderIcon from "../../assets/image/addfoldericon.png";
import binIcon from "../../assets/image/binicon.png";
import fileIcon from "../../assets/image/fileicon.png";
import folderIcon from "../../assets/image/foldericon.png";

const Button = ({ onEdit, onRemove }) => {
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

        <button className={styles.btn_else} onClick={onRemove}>
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

const Files = ({ fileList }) => {
  const [files, setFiles] = useState([]);

  return (
    <div className={styles.files_wrapper}>
      <h2 className={styles.filelist_title_wrapper}>파일</h2>
      <div className={styles.files_body}>
        {fileList.map((file) => (
          <div className={styles.files_each} key={file.id}>
            <img
              className={styles.folderIcon}
              src={fileIcon}
              alt={file.title}
            />
            <br></br>
            {file.title}
          </div>
        ))}
      </div>
    </div>
  );
};

const Folders = ({ folderList }) => {
  const [folders, setFolders] = useState([]);

  return (
    <div className={styles.files_wrapper}>
      <h2 className={styles.filelist_title_wrapper}>폴더</h2>
      <div className={styles.files_body}>
        {folderList.map((folder) => (
          <div className={styles.files_each} key={folder.id}>
            <img
              className={styles.folderIcon}
              src={folderIcon}
              alt={folder.title}
            />
            <br></br>
            {folder.title}
          </div>
        ))}
      </div>
    </div>
  );
};

const FileList = ({ fileList, folderList, onRemove }) => {
  // function handleRemove() {
  //   if (window.confirm(`${id}번째 파일/폴더를 정말 삭제하시겠습니까?`)) {
  //     onRemove(id);
  //   }
  // }
  return (
    <div className={styles.filelist_wrapper}>
      {/* <Button handleRemove={handleRemove}></Button> */}
      <Button></Button>
      <Folders folderList={folderList}></Folders>
      <Files fileList={fileList}></Files>
    </div>
  );
};

export default FileList;
