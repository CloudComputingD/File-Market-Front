import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import styles from "../../assets/css/Storage/Storage.module.css";
import FileList from "./FileList";
import FileInfo from "./FileInfo";

<<<<<<< HEAD
const Storage = (props) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState(props.fileList); // file lsit
=======
const Storage = ({ fileList, folderList }) => {
  const [files, setFiles] = useState(fileList); // file list
>>>>>>> 0238382a930ac7458880f700cb0a842c1e7899e2

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const [folders, setFolders] = useState(props.folderList); // folder list

  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
  };

  const [currentFolderId, setCurrentFolderId] = useState(null); // 더블클릭한 folder's id
  const [currentFolderName, setCurrentFolderName] = useState("Root");

  const handleFolderDoubleClick = (folder) => {
    setCurrentFolderId(folder.id);
    setCurrentFolderName(folder.title);
  };

  // 선택된 폴더의 하위 파일 & 폴더 필터링
  const filteredFiles = files.filter(
    (file) => file.folder_id === currentFolderId
  );
  //const filteredFolders = folders.filter((folder) => folder.parentId === selectedFolderId);

  const handleNewFolder = () => {
    const folderName = prompt("Enter folder name!");
    if (folderName) {
      const newFolder = {
        id: Date.now(), // 고유한 id 생성. (임시로 현재 시간 사용)
        title: folderName,
        created_time: new Date().getTime(),
        deleted_time: null,
        favorite: false,
        user_id: 1,
        trash: false,
        size: 34235,
      };
      setFolders((prevFolders) => [...prevFolders, newFolder]); // 새로운 폴더 추가
    }
  };

  const handleRename = (targetFolder, targetFile) => {
    const newTitle = prompt("Enter new name!");
    if (targetFolder) {
      const updatedFolders = folders.map((folder) => {
        if (folder.id === targetFolder.id) {
          return { ...folder, title: newTitle };
        }
        return folder;
      });
      setFolders(updatedFolders);
      setSelectedFolder(null);
      alert("folder updated");
    }
    if (targetFile) {
      const updatedFiles = files.map((file) => {
        if (file.id === targetFile.id) {
          return { ...file, title: newTitle };
        }
        return file;
      });
      setFiles(updatedFiles);
      setSelectedFile(null);
      alert("file updated");
    }
  };

  const handleDelete = (targetFolder, targetFile) => {
    if (targetFolder) {
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== targetFolder.id)
      );
      setSelectedFolder(null);
    }

    if (targetFile) {
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== targetFile.id)
      );
      setSelectedFile(null);
    }
  };

  return (
    <div className={styles.storage_wrapper}>
      <Header navigate={navigate} handleSearch={props.handleSearch} />
      <div className={styles.storage_block_wrapper}>
        <Sidebar currentPage="storage" />
        <div className={styles.storage_block}>
          <FileList
            onDelete={handleDelete}
            fileList={files}
            filteredFileList={filteredFiles}
            folderList={folders}
            //filteredFolderList={filteredFolders}
            selectedFolder={selectedFolder}
            selectedFile={selectedFile}
            currentFolderName={currentFolderName}
            onFileSelect={handleFileSelect}
            onFolderSelect={handleFolderSelect}
            onFolderDoubleClick={handleFolderDoubleClick}
            onNewFolder={handleNewFolder}
            onRename={handleRename}
          ></FileList>
          <FileInfo file={selectedFile} folder={selectedFolder}></FileInfo>
        </div>
      </div>
    </div>
  );
};

export default Storage;
