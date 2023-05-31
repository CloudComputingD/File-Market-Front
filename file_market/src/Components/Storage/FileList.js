import React, { useState } from "react";
import styles from "../../assets/css/Storage/FileList.module.css";
import uploadIcon from "../../assets/image/uploadicon.png";
import downloadIcon from "../../assets/image/downloadicon.png";
import renameIcon from "../../assets/image/renameicon.png";
import newFolderIcon from "../../assets/image/addfoldericon.png";
import binIcon from "../../assets/image/binicon.png";
import fileIcon from "../../assets/image/fileicon.png";
import folderIcon from "../../assets/image/foldericon.png";
import { Link } from "react-router-dom";

const Button = ({
  onRename,
  onDelete,
  onNewFolder,
  selectedFolder,
  selectedFile,
  currentFolderName,
}) => {
  const handleNewFolderClick = () => {
    if (onNewFolder) {
      onNewFolder();
    }
  };

  return (
    <div className={styles.btn_wrapper}>
      <div className={styles.btn_title_wrapper}>{currentFolderName}</div>
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
            alt="uploadIcon"
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
            alt="donwloadIcon"
          />
          <div className={styles.text_wrapper}>&nbsp;Download</div>
        </button>

        <button className={styles.btn_else} onClick={handleNewFolderClick}>
          <img
            className={styles.img_else}
            src={newFolderIcon}
            height={14}
            width={14}
            alt="newFolderIcon"
          />
          <div className={styles.text_wrapper}>&nbsp;New Folder</div>
        </button>

        <button
          className={styles.btn_else}
          onClick={() => onRename(selectedFolder, selectedFile)}
        >
          <img
            className={styles.img_else}
            src={renameIcon}
            height={14}
            width={14}
            alt="renameIcon"
          />
          <div className={styles.text_wrapper}>&nbsp;Rename</div>
        </button>

        <button
          className={styles.btn_else}
          onClick={() => onDelete(selectedFolder, selectedFile)}
        >
          <img
            className={styles.img_else}
            src={binIcon}
            height={14}
            width={14}
            alt="binIcon"
          />
          <div className={styles.text_wrapper}>&nbsp;Delete</div>
        </button>
      </div>
    </div>
  );
};

const Files = ({ filteredFileList, onFileSelect }) => {
  const [hoveredFile, setHoveredFile] = useState(null);

  const handleFileClick = (file) => {
    onFileSelect(file);
  };

  const handleFileMouseEnter = (file) => {
    setHoveredFile(file);
  };

  const handleFileMouseLeave = () => {
    setHoveredFile(null);
  };

  return (
    <div className={styles.files_wrapper}>
      <h2 className={styles.filelist_title_wrapper}>파일</h2>
      <div className={styles.files_body}>
        {filteredFileList.map((file) => (
          <div
            className={styles.files_each}
            key={file.id}
            onClick={() => handleFileClick(file)}
            onMouseEnter={() => handleFileMouseEnter(file)}
            onMouseLeave={handleFileMouseLeave}
            style={{
              background: hoveredFile === file ? "lightblue" : "transparent",
              fontWeight: hoveredFile === file ? "bold" : "normal",
            }}
          >
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

const Folders = ({ folderList, onFolderSelect, onFolderDoubleClick }) => {
  const [hoveredFolder, setHoveredFolder] = useState(null);

  const handleFolderClick = (folder) => {
    onFolderSelect(folder);
  };

  const handleFolderMouseEnter = (folder) => {
    setHoveredFolder(folder);
  };

  const handleFolderMouseLeave = () => {
    setHoveredFolder(null);
  };

  return (
    <div className={styles.files_wrapper}>
      <h2 className={styles.filelist_title_wrapper}>폴더</h2>
      <div className={styles.files_body}>
        {folderList.map((folder) => (
          <div
            className={styles.files_each}
            key={folder.id}
            onClick={() => handleFolderClick(folder)}
            onMouseEnter={() => handleFolderMouseEnter(folder)}
            onMouseLeave={handleFolderMouseLeave}
            onDoubleClick={() => onFolderDoubleClick(folder)}
            style={{
              background:
                hoveredFolder === folder ? "lightblue" : "transparent",
              fontWeight: hoveredFolder === folder ? "bold" : "normal",
            }}
          >
            <Link
              to={`/storage/` + folder.id}
              style={{ textDecoration: "none", color: "black" }}
              key={folder.id}
            >
              <img
                className={styles.folderIcon}
                src={folderIcon}
                alt={folder.title}
              />
              <br></br>
              {folder.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const FileList = ({
  fileList,
  filteredFileList,
  onFileSelect,
  folderList,
  //filteredFolderList,
  onFolderSelect,
  onFolderDoubleClick,
  selectedFolder,
  selectedFile,
  currentFolderName,
  onDelete,
  onNewFolder,
  onRename,
}) => {
  return (
    <div className={styles.filelist_wrapper}>
      <Button
        onNewFolder={onNewFolder}
        onDelete={onDelete}
        selectedFolder={selectedFolder}
        selectedFile={selectedFile}
        onRename={onRename}
        currentFolderName={currentFolderName}
      ></Button>
      <Folders
        folderList={folderList}
        onFolderSelect={onFolderSelect}
        onFolderDoubleClick={onFolderDoubleClick}
      ></Folders>
      <Files
        fileList={fileList}
        filteredFileList={filteredFileList}
        onFileSelect={onFileSelect}
      ></Files>
    </div>
  );
};

export default FileList;
