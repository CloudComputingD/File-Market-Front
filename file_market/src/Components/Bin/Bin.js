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
    const fileList = props.fileList;
    const folderList = props.folderList;
    return(
        <div className={`${styles.bin_wrapper} ${colorTheme === 'light' ? null : styles.darkmode_bgcolor}`}>
            <Header colorTheme={colorTheme} navigate={navigate} handleSearch={props.handleSearch} />
            <div className={styles.bin_block_wrapper}>
                <Sidebar currentPage="bin"/>
                <div className={styles.bin_block}>
                    <FileList
                        fileList={fileList}
                        folderList={folderList}
                        // onDelete={handleDelete}
                        filteredFileList={fileList}
                        filteredFolderList={folderList}
                        // selectedFolder={selectedFolder}
                        // selectedFile={selectedFile}
                        // currentFolderName={currentFolderName}
                        // onFileSelect={handleFileSelect}
                        // onFolderSelect={handleFolderSelect}
                        // onFolderDoubleClick={handleFolderDoubleClick}
                        // onNewFolder={handleNewFolder}
                        // onRename={handleRename}
                    />
                    
                </div>
            </div>
            <ColorThemeChanger colorTheme={props.colorTheme} handleChangeColorTheme={props.handleChangeColorTheme}/>
        </div>
    )
}

export default Bin;