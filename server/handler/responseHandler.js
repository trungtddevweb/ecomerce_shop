const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

const error = (res, error) => responseWithData(res, 500, {
    status: 500,
    message: "Oopps! Something went wrong!",
    error: error.errors.name.message || error

})

const badRequest = (res, message) => responseWithData(res, 400, {
    status: 400,
    message,
})

const created = (res, data) => responseWithData(res, 201, data)

const unAuthorized = (res) => responseWithData(res, 401, {
    status: 401,
    message: "Unauthorized",
})

const notFound = (res) => responseWithData(res, 404, {
    status: 404,
    message: "Not Found",
})

export default { error, badRequest, created, unAuthorized, notFound }