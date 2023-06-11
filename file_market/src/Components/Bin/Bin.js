import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import FileList from '../Storage/FileList';
import FileInfo from '../Storage/FileInfo';
import styles from '../../assets/css/Bin/Bin.module.css';
import ColorThemeChanger from '../ColorThemeChanger/Color_Theme_Changer';

const Bin = (props) => {
    const colorTheme = props.colorTheme;
    const navigate = useNavigate();
    return(
        <div className={`${styles.bin_wrapper} ${colorTheme === 'light' ? null : styles.darkmode_bgcolor}`}>
            <Header colorTheme={colorTheme} navigate={navigate} handleSearch={props.handleSearch} />
            <div className={styles.bin_block_wrapper}>
                <Sidebar currentPage="bin"/>
                <div className={styles.bin_block}>
                    <FileList
                        curPage={"bin"}
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
                    />
                    <FileInfo
                        handleFavChange={props.handleFavChange}
                        file={props.selectedFile}
                        folder={props.selectedFolder}
                        colorTheme={colorTheme}
                        onFavorite={props.handleFavorite}
                    ></FileInfo>
                </div>
            </div>
            <ColorThemeChanger colorTheme={props.colorTheme} handleChangeColorTheme={props.handleChangeColorTheme}/>
        </div>
    )
}

export default Bin;