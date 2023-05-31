import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import styles from "../../assets/css/Storage/Storage.module.css";
import FileList from "../Storage/FileList";
import FileInfo from "../Storage/FileInfo";
import ColorThemeChanger from "../ColorThemeChanger/Color_Theme_Changer";

const Favorite = (props) => {
  const navigate = useNavigate();
  const favoriteFileList = props.fileList.filter((file) => file.favorite === true);

  const [files, setFiles] = useState(favoriteFileList); // favorite file list

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const favoriteFolderList = props.folderList.filter(
    (folder) => folder.favorite === true
  );

  const [folders, setFolders] = useState(favoriteFolderList); // favorite folder list

  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
  };

  const [currentFolderId, setCurrentFolderId] = useState(false); // 더블클릭한 folder's id
  const [currentFolderName, setCurrentFolderName] = useState("Root");

  const handleFolderDoubleClick = (folder) => {
    setCurrentFolderId(folder.id);
    setCurrentFolderName(folder.title);
  };

  // 선택된 폴더의 하위 파일 & 폴더 필터링
  const filteredFavoriteFiles = props.fileList.filter((file) =>
    currentFolderId
      ? file.favorite && file.folder_id === currentFolderId
      : file.favorite
  );
  //const filteredFolders = folders.filter((folder) => folder.parentId === selectedFolderId) && folder.favorite === true;

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
        <Sidebar currentPage="favorite" />
        <div className={styles.storage_block}>
          <FileList
            onDelete={handleDelete}
            fileList={files}
            filteredFileList={filteredFavoriteFiles}
            folderList={folders}
            filteredFolderList={filteredFavoriteFiles}
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
      <ColorThemeChanger colorTheme={props.colorTheme} handleChangeColorTheme={props.handleChangeColorTheme}/>
    </div>
  );
};

export default Favorite;
