import { Typography } from '@mui/material'

const ErrorMessages = ({ errors, fieldName }) => {
    let message
    const error = errors[fieldName]

    if (error) {
        if (error?.type === 'required') {
            message = `${fieldName} không được để trống!`
            message = message.replace(/^\w/, c => c.toUpperCase())

            return (
                <Typography color='error' variant='subtitle2' fontStyle='italic'>
                    {message}
                </Typography>
            )
        }

        if (error?.type === 'email') {
            message = `${fieldName} không hợp lệ!`
            message = message.replace(/^\w/, c => c.toUpperCase())

            return (
                <Typography color='error' variant='subtitle2' fontStyle='italic'>
                    {message}
                </Typography>
            )
        }

        if (error?.type === 'min') {
            message = `${fieldName} ít nhất có 6 kí tự!`
            message = message.replace(/^\w/, c => c.toUpperCase())

            return (
                <Typography color='error' variant='subtitle2' fontStyle='italic'>
                    {message}
                </Typography>
            )
        }

        if (error?.type === 'oneOf') {
            message = `${fieldName} không khớp với password!`
            message = message.replace(/^\w/, c => c.toUpperCase())

            return (
                <Typography color='error' variant='subtitle2' fontStyle='italic'>
                    {message}
                </Typography>
            )
        }
    }

    return null
}

export default ErrorMessages
