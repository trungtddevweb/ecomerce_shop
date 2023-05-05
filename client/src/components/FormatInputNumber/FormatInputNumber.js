import React, { useState } from 'react'

const FormatInputNumber = ({ ...props }) => {
    const [value, setValue] = useState('')

    const formatValue = event => {
        // Lấy giá trị nhập vào và định dạng theo định dạng số tiếng Việt (vi-VN)
        const inputValue = event.target.value
        const formattedValue = Number(inputValue).toLocaleString('vi-VN')

        // Cập nhật giá trị của input và state "value"
        event.target.value = formattedValue
        setValue(formattedValue)
    }

    return <input type='number' value={value} onChange={formatValue} {...props} />
}

export default FormatInputNumber
