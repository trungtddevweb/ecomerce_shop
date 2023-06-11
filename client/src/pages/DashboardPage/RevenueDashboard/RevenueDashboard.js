import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { getAllProducts } from '~/api/main'
import { labelsMonthChart, optionsChart } from 'src/utils/const'

const RevenueDashboard = () => {
    const [products, setProducts] = useState([])
    const LIMIT = 1000

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts(LIMIT)
                setProducts(res.docs)
            } catch (err) {
                console.log(err)
            }
        }
        fetchProducts()
    }, [])

    const revenueProduct = products?.map(product => product.monthlyRevenue)
    const monthlyValues = new Array(12).fill(0)

    // Tính tổng giá trị của từng tháng từ mảng dữ liệu
    revenueProduct?.forEach(item => {
        Object.keys(item).forEach(key => {
            const month = parseInt(key.split('-')[0], 10)
            monthlyValues[month - 1] += item[key]
        })
    })

    const data = {
        labels: labelsMonthChart,
        datasets: [
            {
                label: 'Tổng giá trị đơn hàng đã bán',
                data: monthlyValues,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            }
        ]
    }

    return (
        <Box>
            <Bar data={data} options={optionsChart} />
        </Box>
    )
}

export default RevenueDashboard
