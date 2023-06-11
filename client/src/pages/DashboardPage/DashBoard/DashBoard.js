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

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1

    const generateMonthlyLabels = () => {
        const labels = []

        for (let i = 1; i <= currentMonth; i++) {
            labels.push(`Tháng ${i}`)
        }

        return labels
    }
    const processDataForChart = () => {
        const data = {
            labels: generateMonthlyLabels(),
            datasets: []
        }

        products.forEach((product, index) => {
            const revenueValues = Object.values(product.monthlyRevenue)
            const hasRevenue = revenueValues.some(revenue => revenue > 0)

            if (hasRevenue) {
                const dataset = {
                    label: product.category,
                    data: revenueValues,
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 2
                }

                data.datasets.push(dataset)
            }
        })

        return data
    }

    const chartData = processDataForChart()
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
            <Bar data={chartData} options={options} />
        </Box>
    )
}

export default DashBoard
