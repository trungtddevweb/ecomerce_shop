const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data)

const error = (res, error) =>
    responseWithData(res, 500, {
        status: 500,
        message: 'Oopps! Something went wrong!',
        error
    })

const badRequest = (res, message) =>
    responseWithData(res, 400, {
        status: 400,
        message
    })

const created = (res, data) => responseWithData(res, 201, data)

const success = (res, data) => responseWithData(res, 200, data)

const getData = (res, data) => responseWithData(res, 200, data)

const unAuthorized = res =>
    responseWithData(res, 401, {
        status: 401,
        message: 'Unauthorized'
    })

const tokenNotValid = res =>
    responseWithData(res, {
        status: 401,
        message: 'Token is not valid'
    })

const forbidden = res =>
    responseWithData(res, {
        status: 403,
        message: 'Access denied'
    })

const notFound = res =>
    responseWithData(res, 404, {
        status: 404,
        message: 'Not Found'
    })

export default { error, badRequest, created, unAuthorized, notFound, tokenNotValid, forbidden, getData, success }
