import React, { useState, useEffect } from "react";
import * as API_MANAGER from "../../API/APIManager";
import styles from "../../assets/css/Storage/FileList.module.css";
import uploadIcon from "../../assets/image/uploadicon.png";
import downloadIcon from "../../assets/image/downloadicon.png";
import renameIcon from "../../assets/image/renameicon.png";
import newFolderIcon from "../../assets/image/addfoldericon.png";
import binIcon from "../../assets/image/binicon.png";
import fileIcon from "../../assets/image/fileicon.png";
import folderIcon from "../../assets/image/foldericon.png";
import rootIcon from "../../assets/image/rooticon.png";
import UploadModal from "./Upload_Modal";

const Button = (props) => {
  const [open, setOpen] = useState(false);
  function closeModal() {
    setOpen(false);
  }

  if (props.curPage === 'bin') {
    return (
      <div className={styles.btn_wrapper}>
        <div
          className={`${styles.btn_title_wrapper} ${
            props.colorTheme === "light"
              ? null
              : styles.darkmode_btn_title_wrapper
          }`}
        >
          {props.currentFolderName}
        </div>
        <div className={styles.btn}>
          <button
            className={styles.btn_else}
            onClick={() =>
              props.onRestore(props.selectedFolder, props.selectedFile)
            }
          >
            <img
              className={styles.img_else}
              src={renameIcon}
              height={14}
              width={14}
              alt="renameIcon"
            />
            <div className={styles.text_wrapper}>&nbsp;Restore</div>
          </button>
  
          <button
            className={styles.btn_else}
            onClick={() =>
              props.onTrashDelete(props.selectedFolder, props.selectedFile)
            }
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
    )
  } else {
    return (
      <div className={styles.btn_wrapper}>
        <div
          className={`${styles.btn_title_wrapper} ${
            props.colorTheme === "light"
              ? null
              : styles.darkmode_btn_title_wrapper
          }`}
        >
          {props.currentFolderName}
        </div>
        <div className={styles.btn}>
          <button
            className={styles.btn_upload}
            onClick={() => {
              setOpen(true);
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
          {open ? <UploadModal closeModal={closeModal} currentFolderId={props.currentFolderId} makeFileList={props.makeFileList}/> : null}
  
          <button
            className={styles.btn_else}
            onClick={() => {
              props.handleDownload(props.selectedFile)
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
          
  
          <button className={styles.btn_else} onClick={props.handleNewFolderClick}>
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
            onClick={() =>
              props.onRename(props.selectedFolder, props.selectedFile)
            }
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
            onClick={() =>
              props.onDelete(props.selectedFolder, props.selectedFile)
            }
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
  }
};

const Folders = ({
  filteredFolderList,
  onFolderSelect,
  onFolderDoubleClick,
  onFileSelect,
  colorTheme,
  navigate,
}) => {
  const handleFolderClick = (folder) => {
    if (folder === null) {
      onFolderSelect(null);
    } else {
      onFolderSelect(folder.id);
    }
  };

  const handleRootFolderClick = (navigate) => {
    onFileSelect(null);
    onFolderDoubleClick(null, navigate);
    handleFolderClick(null);
  };

  return (
    <div className={styles.files_wrapper}>
      <h2
        className={`${styles.filelist_title_wrapper} ${
          colorTheme === "light" ? null : styles.darkmode_filelist_title_wrapper
        }`}
      >
        folder
      </h2>
      <div className={styles.files_body}>
        <div className={styles.files_each} onClick={() => handleRootFolderClick(navigate)}>
          <img
            className={`${styles.rootIcon} ${
              colorTheme === "light" ? null : styles.darkmode_folderIcon
            }`}
            src={rootIcon}
            alt="root folder"
          />
          <br></br>
          <div className={styles.each_title}></div>
          <text
            className={`${styles.text} ${
              colorTheme === "light" ? null : styles.darkmode_text
            }`}
          >
            ./
          </text>
        </div>
        {filteredFolderList.map((folder) => (
          <div
            className={styles.files_each}
            key={folder.id}
            onClick={() => handleFolderClick(folder)}
            onDoubleClick={() => onFolderDoubleClick(folder, navigate)}
          >
            <img
              className={`${styles.folderIcon} ${
                colorTheme === "light" ? null : styles.darkmode_folderIcon
              }`}
              src={folderIcon}
              alt={folder.name}
            />
            <br></br>
            <div className={styles.each_title}></div>
            <text
              className={`${styles.text} ${
                colorTheme === "light" ? null : styles.darkmode_text
              }`}
            >
              {folder.name}
            </text>
          </div>
        ))}
      </div>
    </div>
  );
};

const Files = ({ currentFolderId, fileList, filteredFileList, onFileSelect, colorTheme }) => {
  const handleFileClick = (file) => {
    onFileSelect(file.id);
  };
  
  return (
    <div className={styles.files_wrapper}>
      <h2
        className={`${styles.filelist_title_wrapper} ${
          colorTheme === "light" ? null : styles.darkmode_filelist_title_wrapper
        }`}
      >
        file
      </h2>
      <div className={styles.files_body}>
        {filteredFileList.map((file) => (
          <div
            className={styles.files_each}
            key={file.id}
            onClick={() => handleFileClick(file)}
          >
            <img
              className={`${styles.folderIcon} ${
                colorTheme === "light" ? null : styles.darkmode_folderIcon
              }`}
              src={fileIcon}
              alt={file.name}
            />
            <br></br>
            <text
              className={`${styles.text} ${
                colorTheme === "light" ? null : styles.darkmode_text
              }`}
            >
              {file.name}
            </text>
          </div>
        ))}
      </div>
    </div>
  );
};

const FileList = (props) => {
  const [currentFolderId, setCurrentFolderId] = useState(localStorage.getItem("currentFolderId")); // 더블클릭한 folder's id
  const [currentFolderName, setCurrentFolderName] = useState("My Storage");
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [filteredFileList, setFilteredFileList] = useState([]);
  const [filteredFolderList, setFilteredFolderList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  async function handleDownload(targetFile) {
    if (targetFile) {
      let result = await API_MANAGER.API_GetFileInfo(targetFile);
      result = await API_MANAGER.API_DownloadFile(localStorage.getItem('userInfo').split(',')[0].split(":")[1], result.name);
      const disposition = result.headers['content-disposition'];
      const fileName = decodeURI(
        disposition
          .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
          .replace(/['"]/g, '')
      );
      const blob = new Blob([result.data]);
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileURL;
      link.style.display = 'none';
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  async function handleRename(targetFolder, targetFile) {
    if (targetFolder) {
      const newTitle = prompt("Enter new name!");
      let result = await API_MANAGER.API_FolderRename(targetFolder, localStorage.getItem('userInfo').split(',')[0].split(":")[1], newTitle);
      makeFolderList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    }

    if (targetFile) {
      const newTitle = prompt("Enter new name!");
      let result = await API_MANAGER.API_FileRename(targetFile, localStorage.getItem('userInfo').split(',')[0].split(":")[1], newTitle);
      makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], currentFolderId);
    }
  }

  async function handleTrashDelete(targetFolder, targetFile) {
    if (targetFolder) {
      let result = await API_MANAGER.API_TrashDeleteFolder(targetFolder, localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
      makeFolderList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    }

    if (targetFile) {
      let result = await API_MANAGER.API_TrashDeleteFile(targetFile, localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
      makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], currentFolderId);
    }
  }

  async function handleRestore(targetFolder, targetFile) {
    if (targetFolder) {
      let result = await API_MANAGER.API_RestoreFolder(targetFolder, localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
      makeFolderList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    }

    if (targetFile) {
      let result = await API_MANAGER.API_RestoreFile(targetFile, localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
      makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], currentFolderId);
    }
  }

  async function handleNewFolderClick() {
    const folderName = prompt("Enter folder name!");
    if (folderName) {
      const result = await API_MANAGER.API_CreateFolder(localStorage.getItem('userInfo').split(',')[0].split(":")[1], folderName);
      makeFolderList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    }
  };

  async function handleDeleteClick(targetFolder, targetFile) {
    if (targetFolder) {
      const result = await API_MANAGER.API_DeleteFolder(localStorage.getItem('userInfo').split(',')[0].split(":")[1], targetFolder);
      makeFolderList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    }

    if (targetFile) {
      const result = await API_MANAGER.API_DeleteFile(localStorage.getItem('userInfo').split(',')[0].split(":")[1], targetFile);
      makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], currentFolderId);
    }
  };

  async function makeFolderList(userId) {
    if (props.curPage === 'bin') {
      let result = await API_MANAGER.API_GetDeletedFolderList(userId);
      setFilteredFolderList(result);
    } else {
      let result = await API_MANAGER.API_UserFolderList(userId);
      setFolders(result);
      let filteredFolders = [];
      if (currentFolderId === "1"){
        filteredFolders = result.filter((folder) =>
          currentFolderId ? folder.trash === false ? folder.id != currentFolderId : folder : folder
        );
      }
      if (props.curPage === "favorite") {
        filteredFolders = filteredFolders.filter((folder) => folder.favorite === true);
      } else if (props.curPage === "search") {
        filteredFolders = filteredFolders.filter((folder) => folder.name.includes(localStorage.getItem("searchKey")) === true);
      }
      setFilteredFolderList(filteredFolders);
    }
  }

  async function makeFileList(userId, folderId) {
    if (props.curPage === 'storage') {
      let result = await API_MANAGER.API_FolderFileList(userId, folderId);
      setFilteredFileList(result);
    } else if (props.curPage === 'bin') {
      let result = await API_MANAGER.API_GetDeletedFileList(userId);
      setFilteredFileList(result);
    } else {
      let result = await API_MANAGER.API_UserFileList(userId);
      if (props.curPage === "search") {
        result = result.filter((file) => file.name.includes(localStorage.getItem("searchKey")) === true);
      } else if (props.curPage === "favorite") {
        result = result.filter((file) => file.favorite === true);
      }
      setFilteredFileList(result);
    }
  }

  useEffect(() => {
    makeFolderList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], currentFolderId);
  }, [])

  const handleFolderDoubleClick = (folder, navigate) => {
    if (folder !== null) {
      localStorage.setItem("currentFolderId", folder.id);
      setCurrentFolderId(folder.id);
      setCurrentFolderName(folder.name);
      setFilteredFolderList([]);
      makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], folder.id);
    } else {
      localStorage.setItem("currentFolderId", 1);
      setCurrentFolderId(1);
      setCurrentFolderName("My Storage");
      const filteredFolders = folders.filter((_folder) =>
        _folder.id ? _folder.id != 1 : folder
      );
      setFilteredFolderList(filteredFolders);
      makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], 1);
    }
    navigate('/storage');
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
  };

  useEffect(() => {
    makeFolderList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1], currentFolderId);
  }, [localStorage.getItem("searchKey")])

  return (
    <div className={styles.filelist_wrapper}>
      <Button
        handleDownload={handleDownload}
        curPage={props.curPage}
        handleNewFolderClick={handleNewFolderClick}
        onDelete={handleDeleteClick}
        selectedFolder={props.selectedFolder}
        selectedFile={props.selectedFile}
        onRename={handleRename}
        currentFolderId={currentFolderId}
        currentFolderName={props.currentFolderName}
        colorTheme={props.colorTheme}
        makeFileList={makeFileList}
        onTrashDelete={handleTrashDelete}
        onRestore={handleRestore}
      ></Button>
      <Folders
        navigate={props.navigate}
        folderList={props.folderList}
        filteredFolderList={filteredFolderList}
        onFolderSelect={props.onFolderSelect}
        onFileSelect={props.onFileSelect}
        onFolderDoubleClick={handleFolderDoubleClick}
        colorTheme={props.colorTheme}
      ></Folders>
      <Files
        fileList={props.fileList}
        currentFolderId={currentFolderId}
        filteredFileList={filteredFileList}
        onFileSelect={props.onFileSelect}
        colorTheme={props.colorTheme}
      ></Files>
    </div>
  );
};

export default FileList;
