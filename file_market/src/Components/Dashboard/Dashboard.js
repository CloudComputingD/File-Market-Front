import React, { useState } from 'react';
import Chart from './Dashboard_Chart';
import FileTable from './Dashboard_Table';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import styles from '../../assets/css/Dashboard/Dashboard.module.css';
import { tempFileList } from '../../tempdata/tempData';

const Dashboard = () => {
    const fileList = (() => {
        const arr = [];
        tempFileList.forEach((el) => {
            if (el.extension !== '') {
                arr.push(el);
            }
        })
        return arr;
    });

    return(
        <div className={styles.dashboard_wrapper}>
            <Header />
            <div className={styles.dashboard_block_wrapper}>
                <Sidebar currentPage="dashboard"/>
                <div className={styles.dashboard_block}>
                    <Chart fileList={fileList} />
                    <FileTable fileList={fileList} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;