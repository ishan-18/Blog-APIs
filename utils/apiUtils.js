function createResponse(body, code) {
    return {
        body: body,
        status: {
            apiCode: code.apiCode,
            isError: code.isError,
            message: code.message,
            statusCode: code.statusCode,
        },
    };
}

module.exports = createResponse
