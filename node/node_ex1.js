const http = require('http');

http.createServer( (req, res) => {
    let {url, method, headers} = req
    let body = {};
    console.log(url, method)

    req.on('data', (data) => {
      console.log(data)
      console.log(data.toString())
      data.toString().split('&').map(item => {
          let s = item.split('=')
          let key = s[0]
          let value = s[1]
          body[key] = value
      })
    }).on('end', () => {
      console.log(body)
    }).on('error', (err) => {
      console.log(err)
    });

    res.writeHead(200);
    res.end('hello world');
}).listen(3000, () => {
    console.log('server on : 3000port')
});
