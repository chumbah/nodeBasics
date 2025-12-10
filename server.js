import http from 'http'
import { getDataFromDb } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'

const PORT =5000

const server = http.createServer(async (req,res)=> {
    const destinations = await getDataFromDb()

    if (req.url === '/api' && req.method ==='GET'){
        sendJSONResponse(res, 200, destinations)
        }
    else if(req.url.startsWith('/api/continent') && req.method === 'GET'){
            const continent = req.url.split('/').pop()
            const filteredData = destinations.filter((destinations) => {
                return destinations.continent.toLowerCase() === continent.toLowerCase()
            })
            sendJSONResponse(res, 200, filteredData)
        }
    else if(req.url.startsWith('/api/country') && req.method === 'GET') {
            const country = req.url.split('/').pop()
            const filteredData= destinations.filter((destinations) => {
                return destinations.country.toLowerCase() === country.toLowerCase()
            })
            sendJSONResponse(res, 200, filteredData)
    }
    else {
        sendJSONResponse(res, 404, {error: 'Route not found',message: 'The requested route does not exist'})
    }
})
server.listen(PORT, ()=>{
    console.log('server is running on port' + PORT )
})
