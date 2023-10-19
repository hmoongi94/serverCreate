const http = require('http');
const fs = require('fs');
// 편리한 사용을 위해 url 내장 모듈을 사용했다.
const url = require('url');


const server = http.createServer((req, res) => {

  // const parsedUrl = url.parse(req.url, true); // 구문을 분석하고 URL 객체를 반환한다.
  // url 내장 모듈이 지원하는 특정 메서드로 parse 는 '구문 분석', 즉 파싱을 편리하게 해준다.
  // console.log("parsedUrl -> ", parsedUrl);

  // 가독성을 위한 단순 함수 래핑
  function serverErrorLog() {
    res.writeHead(500);
    return res.end('서버에 문제가 생겻습니다.');
  }

  // console.log("어떤 요청이 들어오는지 확인", "url -> ", req.url, "method -> ", req.method);


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
  } else if (req.method === 'POST' && req.url === '/login') {
    // HTML 폼 태그 작성 부분에서 method="POST"로 지정하는 것으로 변경
    let body = '';
    const querystring = require('querystring');
    // 몸통이라는 임의의 변수에 담는다. 'POST' 요청은 본문이라는 것이 존재하기 때문에 
    // body라는 변수에 데이터를 '담아둔다'라고 표현한다.
    // 해당 body 변수는 'POST' 요청이 들어올때마다 초기화 된다.
    // 따라서 if()안에서만 사용할 수 있다.
    // if()기준 body 변수는 지역변수이다.
    
    req.on('data', (chunk) => {
      body += chunk.toString(); //데이터를 문자열로 변환
      // toString()을 사용하지 않으면,
      // 버퍼(buffer) 데이터를 문자열로 변환하지 않고 그대로 둔다.
      // += -> body.concat(chunk).toString 변환가능?
      // const ParsedBody = Buffer.concat(body).toString
    })
    
    req.on('end', () => {
      // console.log(`form 입력으로부터 받은 데이터 확인 ->`, parsedBody)
      // console.log(`form 입력으로부터 받은 데이터 확인 ->`, username)
      // console.log(`form 입력으로부터 받은 데이터 확인 ->`, password)
      // console.log(`form 입력으로부터 받은 데이터 확인 ->`, email)
      const parsedBody = querystring.parse(body); //요청 본문을 파싱
      const { username, password1, password2, email } = parsedBody;

      fs.readFile("./static/loginSuccess.html", "utf8", (err, data) => {
        if (err) {
          serverErrorLog();
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data)
        } 
        // else {
        //   res.writeHead(200, { "Content-Type": "text/plain"})
        //   res.end("로그인정보가 틀립니다.")
        // }
      })
    })
    // } else if (req.method === "GET" && parsedUrl.pathname === "/login") {
    //   // 해당 조건식은 사용자가 입력 요청이 들어오면 실행된다.
    //   // 사용자와 '자동화된 서버'의 상호작용 중 대표적인 사례
    //   console.log("form 입력으로부터 받은 데이터 확인 -> ", parsedUrl.query);
    //   console.log("form 입력으로부터 받은 데이터 확인 -> ", parsedUrl.query.username);
    //   console.log("form 입력으로부터 받은 데이터 확인 -> ", parsedUrl.query.password);
    //   res.writeHead(200, { 'Content-Type': 'text/plain' });
    //   res.end("login success!!");
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`cli 창에서 컨트롤 누른후  옆에 포트 누르면 편리하게 확인 -> http://localhost:${PORT}/`);
});
