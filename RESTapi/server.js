import http from 'http';

const Port  = 4000;
const server = http.createServer((req,res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);



    console.log(req.headers);
})

server.listen(Port, console.log('Server listening on port ' + Port)) 

