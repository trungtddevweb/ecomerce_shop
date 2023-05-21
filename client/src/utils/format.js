import Payment from 'payment'

function clearNumber(value = '') {
    return value.replace(/\D+/g, '')
}

export function formatCreditCardNumber(value) {
    if (!value) {
        return value
    }

    const issuer = Payment.fns.cardType(value)
    const clearValue = clearNumber(value)
    let nextValue

    switch (issuer) {
        case 'amex':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`
            break
        case 'dinersclub':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`
            break
        default:
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(
                8,
                12
            )} ${clearValue.slice(12, 19)}`
            break
    }

    return nextValue.trim()
}

export function formatCVC(value, prevValue, allValues = {}) {
    const clearValue = clearNumber(value)
    let maxLength = 4

    if (allValues.number) {
        const issuer = Payment.fns.cardType(allValues.number)
        maxLength = issuer === 'amex' ? 4 : 3
    }

    return clearValue.slice(0, maxLength)
}

export function formatExpirationDate(value) {
    const clearValue = clearNumber(value)

    if (clearValue.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
    }

    return clearValue
}

export function formatFormData(data) {
    return Object.keys(data).map(d => `${d}: ${data[d]}`)
}

export function formatNumber(input) {
    // Lấy giá trị số nhập vào
    const value = input.valueAsNumber

    // Kiểm tra nếu giá trị không phải là NaN
    if (!isNaN(value)) {
        // Định dạng giá trị số theo định dạng tiền tệ vi-VN
        const formattedValue = value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        })

        // Cập nhật giá trị định dạng vào TextField
        input.value = formattedValue
    }
}

export function formatDate(dateString) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

export const formatPrice = value => {
    if (typeof value === 'number') {
        return value.toLocaleString('vi-VN')
    }
    return
}
