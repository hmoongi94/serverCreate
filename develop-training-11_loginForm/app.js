const http = require('http');
const fs = require('fs');
const url = require('url');
let parsedBody1
let parsedBody2
// const loginSuccess = require('./static/module/loginSuccess');


const server = http.createServer((req, res) => {
  function serverErrorLog() {
    res.writeHead(500);
    return res.end('서버에 문제가 생겻습니다.');
  }

  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('./static/loginForm.html', 'utf8', (err, data) => {
      if (err) {
        serverErrorLog();
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/loginForm.css' && req.method === 'GET') {
    fs.readFile('./static/loginForm.css', 'utf8', (err, data) => {
      if (err) {
        serverErrorLog();
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else if (req.url === '/loginSuccess.css' && req.method === 'GET') {
    fs.readFile('./static/loginSyccess.css', 'utf8', (err, data) => {
      if (err) {
        serverErrorLog();
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else if (req.url === '/loginForm.js' && req.method === 'GET') {
    fs.readFile('./static/module/signUpAssetModule.js', 'utf8', (err, data) => {
      if (err) {
        serverErrorLog();
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript' })
      res.end(data)
    })
    // } else if (req.url === '/loginSuccess.js' && req.method === 'GET') {
    //   fs.readFile('./static/module/loginSuccess.js', 'utf8', (err, data) => {
    //     if (err) {
    //       serverErrorLog();
    //     }
    //     res.writeHead(200, { 'Content-Type': 'application/javascript' })
    //     res.end(data)
    //   })
  } else if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    const querystring = require('querystring');
    // const signUpAsset = require('./static/module/signUpAssetModule.js')

    req.on('data', (chunk) => {
      body += chunk.toString(); //데이터를 문자열로 변환
      // console.log(chunk)
      // console.log(body)
    })
    req.on('end', () => {
      parsedBody1 = querystring.parse(body);
      const loginSuccesshtml = require("./static/module/loginSuccess.js")
      console.log(parsedBody1)
      // loginSuccess = require("./loginSuccess.js")
      console.log(parsedBody1.username)
      // console.log(loginSuccess)
      const { username, password1, password2, email } = parsedBody1;
      if (password1 === password2 && username !== "" && email !== "") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(loginSuccesshtml(parsedBody1.username))
      } else {
        res.end("login Fail!")
      }

    })

  } else if (req.method === 'POST' && req.url === '/send') {
    let body = '';
    const querystring = require('querystring');
    // const signUpAsset = require('./static/module/signUpAssetModule.js')

    req.on('data', (chunk) => {
      body += chunk.toString(); //데이터를 문자열로 변환
      // console.log(chunk)
      // console.log(body)
    })
    req.on('end', () => {
      parsedBody2 = querystring.parse(body);
      console.log(parsedBody2)
      const successLetter = require("./static/module/successLetter.js")
      // loginSuccess = require("./loginSuccess.js")
      // console.log(loginSuccess)
      const { title, text } = parsedBody2;
      if (title !== "" && text !=="") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(successLetter(parsedBody1.username,parsedBody2.title))
      } else {
        res.end("fail send letter")
      }

    })


  } else {
    res.writeHead(404);
    res.end('Not Found');
  }

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`cli 창에서 컨트롤 누른후  옆에 포트 누르면 편리하게 확인 -> http://localhost:${PORT}/`);
});
