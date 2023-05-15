import React from 'react';
import styles from '../../assets/css/Bin/Bin_Fileinfo.module.css';
import StarIcon from '../../assets/image/staricon.png';

const FileInfoHeader = () => {
    return(
        <div className={styles.fileinfo_header_wrapper}>
            <div className={styles.fileinfo_header}>
                <img src={StarIcon} className={styles.header_image}/>
                파일 이름
            </div>
        </div>
    )
}

const FileInfoBlock = () => {
    return(
        <div className={styles.fileinfo_block_wrapper}>
            Info Block
        </div>
    )
}

const FileInfo = () => {
    return(
        <div className={styles.fileinfo_wrapper}>
            <FileInfoHeader />
            <FileInfoBlock />
        </div>
    )
}

export default FileInfo;