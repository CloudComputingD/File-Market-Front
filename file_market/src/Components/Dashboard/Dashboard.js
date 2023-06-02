import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from './Dashboard_Chart';
import FileTable from './Dashboard_Table';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import styles from '../../assets/css/Dashboard/Dashboard.module.css';
import ColorThemeChanger from '../ColorThemeChanger/Color_Theme_Changer';

const Dashboard = (props) => {
    const navigate = useNavigate();
    const colorTheme = props.colorTheme;

    return(
        <div className={`${styles.dashboard_wrapper} ${colorTheme === 'light' ? null : styles.darkmode_bgcolor}`}>
            <Header colorTheme={props.colorTheme} navigate={navigate} handleSearch={props.handleSearch} />
            <div className={styles.dashboard_block_wrapper}>
                <Sidebar colorTheme={props.colorTheme} currentPage="dashboard"/>
                <div className={styles.dashboard_block}>
                    <Chart extensionCategory={props.extensionCategory} colorTheme={colorTheme} fileList={props.files} />
                    <FileTable colorTheme={colorTheme} fileList={props.files} />
                </div>
            </div>
            <ColorThemeChanger colorTheme={props.colorTheme} handleChangeColorTheme={props.handleChangeColorTheme}/>
        </div>
    )
}

export default Dashboard;