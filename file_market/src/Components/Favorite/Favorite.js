import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import styles from "../../assets/css/Storage/Storage.module.css";
import FileList from "../Storage/FileList";
import FileInfo from "../Storage/FileInfo";
import ColorThemeChanger from "../ColorThemeChanger/Color_Theme_Changer";

const Favorite = (props) => {
  const colorTheme = props.colorTheme;

  const navigate = useNavigate();

  return (
    <div
      className={`${styles.storage_wrapper} ${
        colorTheme === "light" ? null : styles.darkmode_storage_bgcolor
      }`}
    >
      <Header
        colorTheme={colorTheme}
        navigate={navigate}
        handleSearch={props.handleSearch}
      />
      <div className={styles.storage_block_wrapper}>
        <Sidebar currentPage="favorite" />
        <div className={styles.storage_block}>
          <FileList
            navigate={navigate}
            onDelete={props.handleDelete}
            fileList={props.files}
            filteredFileList={props.filteredFiles}
            folderList={props.folders}
            filteredFolderList={props.filteredFolders}
            selectedFolder={props.selectedFolder}
            selectedFile={props.selectedFile}
            currentFolderName={props.currentFolderName}
            onFileSelect={props.handleFileSelect}
            onFolderSelect={props.handleFolderSelect}
            onFolderDoubleClick={props.handleFolderDoubleClick}
            onNewFolder={props.handleNewFolder}
            onRename={props.handleRename}
            colorTheme={colorTheme}
          ></FileList>
          <FileInfo
            file={props.selectedFile}
            folder={props.selectedFolder}
            colorTheme={colorTheme}
            onFavorite={props.handleFavorite}
          ></FileInfo>
        </div>
      </div>
      <ColorThemeChanger
        colorTheme={props.colorTheme}
        handleChangeColorTheme={props.handleChangeColorTheme}
      />
    </div>
  );
};

export default Favorite;
