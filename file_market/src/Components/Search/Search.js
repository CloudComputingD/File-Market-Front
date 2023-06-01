import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../../assets/css/Search/Search.module.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import FileList from '../Storage/FileList';
import FileInfo from '../Storage/FileInfo';
import ColorThemeChanger from '../ColorThemeChanger/Color_Theme_Changer';

const Search = (props) => {
    const colorTheme = props.colorTheme;
    const navigate = useNavigate(); 
    const fileList = props.searchedFiles;
    return(
        <div className={`${styles.search_wrapper} ${colorTheme === 'light' ? null : styles.darkmode_bgcolor}`}>
            <Header colorTheme={colorTheme} navigate={navigate} handleSearch={props.handleSearch} />
            <div className={styles.search_block_wrapper}>
                <Sidebar currentPage="search"/>
                <div className={styles.search_block}>
                <FileList
                    fileList={fileList}
                    filteredFileList={fileList}
                    folderList={props.searchedFolders}
                    filteredFolderList={props.searchedFolders}
                    // onDelete={handleDelete}
                    // selectedFolder={selectedFolder}
                    // selectedFile={selectedFile}
                    // onFileSelect={handleFileSelect}
                    // onFolderSelect={handleFolderSelect}
                    // onNewFolder={handleNewFolder}
                    // onRename={handleRename}
                />
                    <FileInfo />
                </div>
            </div>
            <ColorThemeChanger colorTheme={props.colorTheme} handleChangeColorTheme={props.handleChangeColorTheme}/>
        </div>
    )
}

export default Search;