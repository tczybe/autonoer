const http = require('http');

let app = http.createServer((req, res) => {
  console.log("A request is made.");
  console.log(req);
  // res.writeHead(200, {
  //   'Content-type': 'application/json',
  //   // 'Access-Control-Allow-Origin': 'autonoer'
  // });
  // const word = {content: "You are connected!"};
  // res.end(JSON.stringify(word));
  // //console.log(res);
});

app.listen(4444);
