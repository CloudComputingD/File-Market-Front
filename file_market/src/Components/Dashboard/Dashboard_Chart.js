import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from '../../assets/css/Dashboard/Dashboard_Chart.module.css';
import { FormatBytes } from '../../logics/FormatBytes';

const ChartModeButton = (props) => {
    const total_button = props.chartMode === 'total' ? styles.dashboard_chart_cur_mode_button : styles.dashboard_chart_mode_button;
    const extension_button = props.chartMode === 'extension' ? styles.dashboard_chart_cur_mode_button : styles.dashboard_chart_mode_button;

    return(
        <div className={styles.dashboard_chart_mode_button_wrapper}>
            <button className={total_button}
                onClick={() => {
                    props.handleModeChange('total');
                }}>
                Total
            </button>
            <button className={extension_button}
                onClick={() => {
                    props.handleModeChange('extension');
                }}>
                Extension
            </button>
        </div>
    )
}

const Chart = (props) => {
    const [fileList, setFileList] = useState(props.fileList);
    const maxSize = 15000000000;
    const [totalSize, setTotalSize] = useState(() => {
        let sum = 0;
        for (let i = 0; i < fileList.length; i++) {
            sum += fileList[i].size;
        }
        return sum;
    });

    const [totalData, setTotalData] = useState({
        series: [totalSize, maxSize - totalSize],
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
                    // hollow: {  
                    //   margin: 15,
                    //   size: '70%',
                    //   image: '../../css/images/a-icon.jpg',
                    //   imageWidth: 64,
                    //   imageHeight: 64,
                    //   imageClipped: false
                    // },
                        labels: {
                            show: true,
                            value: {
                                fontSize: '22px',
                                show: true,
                                color: 'blue',
                            },
                        },
                    }
                }
            },
            labels: ["used", "free"],
            title: {
                text: 'Total',
                align: 'center'
            },
        },
    });

    const [extensionData, setExtensionData] = useState({
        series: [1, 2, 3],
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
                    // hollow: {  
                    //   margin: 15,
                    //   size: '70%',
                    //   image: '../../css/images/a-icon.jpg',
                    //   imageWidth: 64,
                    //   imageHeight: 64,
                    //   imageClipped: false
                    // },
                        labels: {
                            show: true,
                            value: {
                                fontSize: '22px',
                                show: true,
                                color: 'blue',
                            },
                        },
                    }
                }
            },
            labels: ["temp1", "temp2", "temp3"],
            title: {
                text: 'Total',
                align: 'center'
            },
        },
    });

    const [chartMode, setChartMode] = useState('total');
    const [chartData, setChartData] = useState(totalData);

    function handleModeChange(toMode) {
        if (chartMode !== toMode) {
            setChartMode(toMode);
            if (toMode === 'total') {
                setChartData(totalData);
            } else {
                setChartData(extensionData);
            }
        }
    }

    return(
        <div className={styles.dashboard_chart_wrapper}>
            <ChartModeButton handleModeChange={handleModeChange} chartMode={chartMode}/>
            <div className={styles.dashboard_chart_block}>
                <ReactApexChart 
                    options={chartData.options}
                    series={chartData.series}
                    type="donut" 
                    width="700"
                />
            </div>
        </div>
    )
}

export default Chart;