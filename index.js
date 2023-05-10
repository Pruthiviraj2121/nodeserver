const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = "localhost";
const port = process.env.port || 3000;

const server = http.createServer((req,res) =>{

    // console.log(req.headers);
    console.log('Request for '+req.url + 'by method '+req.method)

    if(req.method == 'GET'){
        var fileURL;
        if(req.url == '/'){
            fileURL = "/index.html"
        }else{
            fileURL = req.url
        }
        var filePath = path.resolve('./public'+fileURL);

        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.existsSync(filePath, (exists) =>{
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html')
                    res.end('<html> <body> <h1> Error 404:'+ fileURL+' does not exists</h1></body></html>');
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                // createReadStream will make the file in a streams of bytes 
                fs.createReadStream(filePath).pipe(res);
                // .pipe() is the method where it join both file one by one 
                // and in here .pipe(res) will provide the file one by one to res.
            })
        }else{
            res.statusCode = 404;
            res.setHeader("Content-Type",'text/html');
            res.end('<html> <body> <h1> Error 404:'+ fileURL+' not a HTML file</h1></body></html>');
        }
    }else{
        res.statusCode = 404;
        res.setHeader("Content-Type",'text/html');
        res.end('<html> <body> <h1> Error 404:'+ fileURL+' not supportive</h1></body></html>');
    }

});

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`);
})