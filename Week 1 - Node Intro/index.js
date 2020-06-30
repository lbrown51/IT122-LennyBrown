const http = require("http");
const team = require("./data.js");

http.createServer((req, res) => {
    const path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            const numTeamMembers = team.getAll().length;
            const header = "<h1>First Node Site</h1>";
            const info = `<p>Number of members on the team - <b>${numTeamMembers}</b></p>`;
            res.end(`${header}${info}`);
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/html'});
            const firstLine = "Website for all kinds of people, made by Lenny Brown. ";
            const secondLine = "My life path so far is Philadelphia -> Rochester -> Thailand -> Seattle. ";
            const thirdLine =  "I was in the Data Science program at University of Rochester, but now ";
            const fourthLine = "I'm in the App Dev program at North Seattle College.";

            res.end(`<p style="padding: 50px;">${firstLine}${secondLine}${thirdLine}${fourthLine}</p>`);
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("404 - Not found");
            break;
    }
    
}).listen(process.env.PORT || 3000)