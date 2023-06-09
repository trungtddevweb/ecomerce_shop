import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { getAllProducts } from '~/api/main'

const DashBoard = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getAll = async () => {
            try {
                const res = await getAllProducts()
                console.log(res.docs)
                setProducts(res.docs)
            } catch (err) {
                console.log(err)
            }
        }
        getAll()
    }, [])
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [500, 800, 1200, 900, 1500, 2000],
                backgroundColor: 'rgba(75,192,192,0.6)',
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
            {products &&
                products.map((product, index) => {
                    return <Typography key={index}>{product.price}</Typography>
                })}
        </Box>
    )
}

export default DashBoard
