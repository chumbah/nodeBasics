import http from 'http'
import { getDataFromDb } from './database/db.js'
const PORT =5000

const server = http.createServer(async (req,res)=> {
    const destinations = await getDataFromDb()

    if (req.url === '/api' && req.method ==='GET'){
        res.setHeader ('Content-Type', 'application/json')
        res.statusCode = 200
        res.end (JSON.stringify (destinations)
        )}
    else if(req.url.startsWith('/api/continent') && req.method === 'GET'){
            const continent = req.url.split('/').pop()
            const filteredData = destinations.filter((destinations) => {
                return destinations.continent.toLowerCase() === continent.toLowerCase()
            })
            res.setHeader('content-type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(filteredData)
        )}
    else if(req.url.startsWith('/api/country') && req.method === 'GET') {
            const country = req.url.split('/').pop()
            const filteredData= destinations.filter((destinations) => {
                return destinations.country.toLowerCase() === country.toLowerCase()
            })
            res.setHeader('content-type', 'applicatiion/json')
            res.statucode = 200
            res.end(JSON.stringify(filteredData))
    }
    else {
        res.setHeader ('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify({error: 'Route not found',message: 'The requested route does not exist'}))
    }
})
server.listen(PORT, ()=>{
    console.log('server is running on port' + PORT )
})
