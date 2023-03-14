const ErrorMessages = ({ errors, fieldName }) => {
    let message
    const error = errors[fieldName]

    if (error) {
        if (error?.type === 'required') {
            message = `${fieldName} không được để trống!`
            message = message.replace(/^\w/, (c) => c.toUpperCase())

            return (
                <p className="text-danger">{message}</p>
            )
        }

        if (error?.type === 'email') {
            message = `${fieldName} không hợp lệ!`
            message = message.replace(/^\w/, (c) => c.toUpperCase())

            return (
                <p className="text-danger">{message}</p>
            )
        }

        if (error?.type === 'min') {
            message = `${fieldName} ít nhất có 6 kí tự!`
            message = message.replace(/^\w/, (c) => c.toUpperCase())

            return (
                <p className="text-danger">{message}</p>
            )
        }

        if (error?.type === 'oneOf') {
            message = `${fieldName} không khớp với password!`
            message = message.replace(/^\w/, (c) => c.toUpperCase())

            return (
                <p className="text-danger">{message}</p>
            )
        }
    }

    return null;
};


export default ErrorMessages