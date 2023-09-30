const ApiCode = {
    SUCCESS: {
        isError: false,
        message: 'Operation Done Successfully',
        statusCode: 200,
        apiCode: 'OPERATION_SUCCESS'
    },
    INTERNAL_SERVER_ERROR: {
        isError: true,
        message: 'Internal Server Error',
        statusCode: 500,
        apiCode: 'INTERNAL_SERVER_ERROR'
    },
    AXIOS_ERROR: {
        isError: true,
        message: 'Axios Error',
        statusCode: 400,
        apiCode: 'AXIOS_ERROR'
    },
    RATE_LIMIT_EXCEEDED: {
        isError: true,
        message: 'Rate Limit Exceeded. Please try again later',
        statusCode: 429,
        apiCode: 'RATE_LIMIT_EXCEEDED'
    },
    URL_NOT_FOUND: {
        isError: true,
        message: 'URL Not Found',
        statusCode: 404,
        apiCode: 'URL_NOT_FOUND'
    }
}

module.exports = ApiCode