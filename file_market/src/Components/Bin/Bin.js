import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import FileList from './Bin_Filelist';
import FileInfo from '../Storage/FileInfo';
import styles from '../../assets/css/Bin/Bin.module.css';

const Bin = (props) => {
    const navigate = useNavigate();
    const fileList = props.fileList;
    return(
        <div className={styles.bin_wrapper}>
            <Header navigate={navigate} handleSearch={props.handleSearch} />
            <div className={styles.bin_block_wrapper}>
                <Sidebar currentPage="bin"/>
                <div className={styles.bin_block}>
                    <FileList tempFileList={fileList} />
                    <FileInfo />
                </div>
            </div>
        </div>
    )
}

export default Bin;