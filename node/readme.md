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