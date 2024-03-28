import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJs,
    Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
} from 'chart.js';
import { getLastDays } from '../../lib/Features';

ChartJs.register(Tooltip,
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend);

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        }, y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    }
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    }
}

const LineChart = ({ value = [] }) => {
    const labels = getLastDays();
    const data = {
        labels,
        datasets: [
            {
                label: 'Revanue',
                data: value,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <>
            <Line data={data} options={lineChartOptions} />
        </>
    )
}

const DoughnutChart = ({ value = [] }) => {
    const data = {
        labels: ['Single Chats', 'Group Chats'],
        datasets: [
            {
                label: 'Total Chats vs Group Chats',
                data: value,
                fill: true,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                offset:10,
            },
        ],
    };
    return (
        <Doughnut data={data} options={doughnutChartOptions}  style={{zIndex:'1'}}/>
    )
}


export { LineChart, DoughnutChart }