import React from 'react'
import { Box } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

const DashBoard = () => {
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [500, 800, 1200, 900, 1500, 2000],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            },
            {
                label: 'Lợi nhuận',
                data: [300, 500, 900, 600, 1200, 1700],
                backgroundColor: 'rgba(75,194,194,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            }
        ]
    }

    // Cấu hình biểu đồ
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return (
        <Box>
            <Bar data={data} options={options} />
        </Box>
    )
}

export default DashBoard
