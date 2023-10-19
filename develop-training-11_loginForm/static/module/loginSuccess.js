const loginSuccesshtml = function(username){
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./loginForm.css">
</head>
<body>
  <h1>${username}편지를 보냈습니다!</h1>

  <form action="/send" method="POST">
      Title  <br> <input type="text" name="title"><br>
      Text  <br> <input type="text" name="text"><br><br>
      <input type="submit" value="send">
  </form>
</body>
</html>`

}

module.exports = loginSuccesshtml