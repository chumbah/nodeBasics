import http, { get } from 'http'
import { getDataFromDb } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByParams } from './utils/getDataByParams.js'
import {getDataByQueryParams} from './utils/getDataByQueryParams.js'

const PORT =5000

const server = http.createServer(async (req,res)=> {
    const destinations = await getDataFromDb()

    const  urlObj = new URL(req.url, `http://${req.headers.host}`)

    const queryObj= Object.fromEntries(urlObj.searchParams)

    

    if (urlObj.pathname === '/api' && req.method ==='GET'){
        let filteredData = getDataByQueryParams(destinations, queryObj)
        sendJSONResponse(res, 200, filteredData)
        }
    else if(req.url.startsWith('/api/continent') && req.method === 'GET'){
            const continent = req.url.split('/').pop()
            const filteredData = getDataByParams(destinations, 'continent', continent)
            sendJSONResponse(res, 200, filteredData)
            }
    else if(req.url.startsWith('/api/country') && req.method === 'GET') {
            const country = req.url.split('/').pop()
            const filteredData= getDataByParams(destinations, 'country', country) 
            sendJSONResponse(res, 200, filteredData)
    }
    else {
        sendJSONResponse(res, 404, {error: 'Route not found',message: 'The requested route does not exist'})
    }
})
server.listen(PORT, ()=>{
    console.log('server is running on port' + PORT )
})
