'use strict';

//Setting host IP and port address
const host = "0.0.0.0";
const port = "8080";

//load http module to make use of the protocol to interact with clients
const http = require("http");

//load fs module
const fs = require('fs').promises;

//define an event listener function and respond accordingly
const reqListens = function (req, res){
    //log requested url
    console.log(req.url);
    //check for requested url and respond accordingly
    if (req.url === "/") { 
    //load page.html file if root url requested
    fs.readFile(__dirname + "/page.html")
            //contents get loaded with page.html
            .then(contents => {
              //set header, sends an 'ok' code, and post associated content type
              res.setHeader("Content-Type", "text/html; charset=UTF-8");
              res.writeHead(200);
              res.end(contents);
        });

    }
    else {
  //if root url not requested, load JSON data file
    fs.readFile(__dirname + "/data.json")
            //contents get loaded with data.json
            .then(contents => {
              //set header, sends an 'ok' code, and post associated content type
              res.setHeader("Content-Type", "application/json; charset=UTF-8");
              res.writeHead(200);
              res.end(contents);
        });
    }
};

//create an http server and apply event listener function
const server = http.createServer(reqListens);

//listen for event through a port of an IP and respond through console
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
