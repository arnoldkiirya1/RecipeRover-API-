module.exports = {
    success: (res, data, status, message) => {
        res.json({
            code: 200,
            status,
            data,
            message
        })
    },
    failed: (res, error, status, message) => {
        res.json({
            code: 500,
            status,
            data: null,
            error,
            message
        })
    },
    successWithToken: (res, data, token, status, message) => {
        res.json({
            status,
            data,
            token,
            message
        })
    }
}