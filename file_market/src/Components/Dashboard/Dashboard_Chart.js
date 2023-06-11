import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from '../../assets/css/Dashboard/Dashboard_Chart.module.css';
import { CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { Categorize } from '../../logics/Categorize';
import * as API_MANAGER from '../../API/APIManager';
import { FormatBytes, FormatNumber } from '../../logics/Formatter';
import { API_TotalSize } from '../../API/APIManager';

const ChartModeButton = (props) => {

    return(
        <div className={styles.dashboard_chart_mode_button_wrapper}>
            <CDropdown>
                <CDropdownToggle color='secondary'>
                    {props.chartMode === 'total' ? "Total" : "Extension"}
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem onClick={() => props.handleModeChange('total')}>Total</CDropdownItem>
                    <CDropdownItem onClick={() => props.handleModeChange('extension')}>Extension</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        </div>
    )
}

const Chart = (props) => {
    const [fileList, setFileList] = useState([]);
    const maxSize = 10000000;
    const [usedSize, setUsedSize] = useState(0);
    const [Series, setSeries] = useState([]);
    const [extensionCategory, setExtensionCategory] = useState([0, 0, 0, 0]);
    const extensionLabel = ["image", "txt", "application", "etc"];
    const [totalData, setTotalData] = useState({
        series: Series,
        options: {
            chart: {
                type: 'donut',
            },
            legend: {
                position: 'bottom'
            },
            responsive: [{
                breakpoint: 480,
            }],
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            value: {
                                fontSize: '22px',
                                show: true,
                                color: 'blue',
                                formatter: FormatBytes
                            },
                        },
                    }
                }
            },
            labels: ["used", "free"],
        },
    });

    const [extensionData, setExtensionData] = useState({
        series: Series,
        options: {
            chart: {
                type: 'donut',
            },
            legend: {
                position: 'bottom'
            },
            responsive: [{
                breakpoint: 480,
            }],
            plotOptions: {
                pie: {
                    donut: {
                        hollow: {  
                            margin: 15,
                            size: '100%',
                        },
                        labels: {
                            show: true,
                            value: {
                                fontSize: '22px',
                                show: true,
                                color: 'blue',
                                formatter: FormatNumber
                            },
                        },
                    }
                }
            },
            labels: extensionLabel,
        },
    });
    const [chartMode, setChartMode] = useState('total');
    const [chartData, setChartData] = useState(totalData);

    function handleModeChange(toMode) {
        if (chartMode !== toMode) {
            setChartMode(toMode);
            if (toMode === 'total') {
                setSeries([usedSize, maxSize - usedSize]);
                setChartData(totalData);
            } else {
                setSeries(extensionCategory);
                setChartData(extensionData);
            }
        }
    }

    async function makeFileList(userId) {
        let result = await API_MANAGER.API_UserFileList(userId);
        const cate = Categorize(await result);
        setExtensionCategory(cate);
        console.log(cate);
    }


    async function getTotalSize(userId) {
        let result = await API_TotalSize(userId);
        setSeries([result, maxSize - result]);
        setUsedSize(result);
    }

    useEffect(() => {
        makeFileList(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
        getTotalSize(localStorage.getItem('userInfo').split(',')[0].split(":")[1]);
    }, [])

    return(
        <div className={styles.dashboard_chart_wrapper}>
            <div className={styles.dashboard_chart_mode_button_wrapper}>
                <CDropdown>
                    <CDropdownToggle color='secondary'>
                        {chartMode === 'total' ? "Total" : "Extension"}
                    </CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem onClick={() => handleModeChange('total')}>Total</CDropdownItem>
                        <CDropdownItem onClick={() => handleModeChange('extension')}>Extension</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </div>
            <div className={styles.dashboard_chart_block}>
                <ReactApexChart 
                    options={chartData.options}
                    series={Series}
                    type="donut" 
                    width="500"
                />
            </div>
        </div>
    )
}

export default Chart;