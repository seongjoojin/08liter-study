# 요청 객체, 응답 객체

### 요청 객체(request)

서버는 클라이언트의 요청사항을 해석하기 위해 요청 객체에 포함된 요청 메소드, URL, 헤더, 요청바디를 사용함.

```js
const http = require('http');

http:createServer( (req, res) => {
    console.log(req);
    res.writeHead(200);
    res.end('hello world');
}).listen(3000, () => {
   console.log('server on : 3000port') 
});
```

### 응답객체

요청 객체를 이용하여 사용자의 요청을 파악했다면, 응답 객체를 이용하여 사용자에게 원하는 형태로 응답해야 함

가장 많이 사용하는 응답코드

- 200 : 성공적으로 요청 처리
- 201 : 성공적으로 데이터를 추가함
- 404 : 요청한 리소스가 없음
- 500 : 서버의 문제로 에러 발생