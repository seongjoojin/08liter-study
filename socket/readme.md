## 필요 모듈 설치

express -> socket.io <br>
nuxt.js -> socket.io-client

## 소켓 사용을 위한 준비 - 서버

http 모듈을 가져오고 createServer를 이용하여 서버를 생성함.<br>
생성된 http 객체를 soket.io에 전달만 해주면 됨.

io는 soket에 express 앱을 등록한 객체를 전달하여 만든 소켓 객체임.

소켓은 on과 emit을 이용하여 구현함. on은 이벤트를 받고, emit은 이벤트를 전달함.

## 소켓 사용을 위한 준비 - 클라이언트

연결된 소켓 정보를 사용하여 소켓 서버와 데이터를 주고받을 수 있음.

## 사용하기

express 앱과 nuxt.js 앱을 실햄함.

express에서 nuxt.js를 제공해주는 형태가 아니므로 express와 nuxt.js앱을 독립적으로 실행해야함.

*emit('이벤트 명',전달할 데이터)*

*on('emit으로 발생한 이벤트명','emit으로 전달한 데이터')*

## 모든 소켓에게 이벤트 발생

```
socket.broadcast.emit('이벤트명',데이터);
socket.emit('이벤트명', 데이터);
```

모든 소켓에 이벤트를 발생시킬 땐 나를 제외한 소켓에 이벤트를 발생시키는 것과 나에게메만 이벤트를 발생할 수 있음.