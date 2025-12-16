import http from 'http';

const PORT = 5000

const server = http.createServer((req,res) => {
    res.setHeader('content-Type', 'text/html')
    res.statusCode = 200
    res.end('<html><h>The server is working.</h></html>')

})

server.listen(PORT, console.log("Server is running on port " + PORT));