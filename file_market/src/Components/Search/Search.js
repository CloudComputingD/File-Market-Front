import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../../assets/css/Search/Search.module.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import FileList from '../Storage/FileList';
import FileInfo from '../Storage/FileInfo';

const Search = (props) => {
    const navigate = useNavigate(); 
    const fileList = props.searchedFiles;
    return(
        <div className={styles.search_wrapper}>
            <Header navigate={navigate} handleSearch={props.handleSearch} />
            <div className={styles.search_block_wrapper}>
                <Sidebar currentPage="search"/>
                <div className={styles.search_block}>
                <FileList
                    fileList={fileList}
                    folderList={props.searchedFolders}
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
        </div>
    )
}

export default Search;