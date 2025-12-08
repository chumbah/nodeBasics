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
        else if(req.url.startsWith('api/continent') && req.method === 'GET'){
            res.end(JSON.stringify(destinations.filter(destination => destination.continent.toLowerCase() === req.url.split('/')[2].toLowerCase())))

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
