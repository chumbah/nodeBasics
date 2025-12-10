export const sendJSONResponse = (res, statusCode, payload) =>{
    res.setHeader('content-type', 'application/json')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}