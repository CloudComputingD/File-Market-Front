import React, { useEffect, useState } from 'react';
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
                        curPage={"search"}
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

export default Search;