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

```
io.emit('이벤트명', 데이터);
```

io에 이벤트를 발생시키면 모든 소켓에게 이벤트를 발생시킬 수 있습니다. 엔드 포인트인 chat에 이벤트를 발생시키면 엔드 포인트에 연결된 객체만 이벤트가 발생함.

## 특정 소켓에게 이벤트 발생 - 1:1, 귓속말

```
io.to(소켓 아이디).emit('msgWhisperSend',msg)
```

해당 소켓 아이디에만 이벤트를 발생시킴. 1:1 접속을 할 땐 io.to()을 이용합니다. 만약 엔드 포인트가 있다면 io대신 엔드 포인트를 사용해도 됨. 

```
let chat = io.of('/chat').on('connection',(socket)=>{
})
```

여기서 *엔드 포인트(네임 스페이스)* chat임

## 특정 그룹(room)에게 이벤트 발생 - 1:n

소켓에는 그룹이라는 개념이 있음. 그룹에 포함된 소켓들에만 이벤트를 발생시킬 수 있음. 메신저에서 그룹 채팅을 구현할 땐 그룹을 이용하면 간단하게 구현할 수 있음.

```
socket.join('방 이름')
socket.leave('방 이름')
```

```
io.to('방 이름').emit('이벤트명',데이터);
socket.broadcast.to('방 이름').emit('이벤트명',데이터)
```

socket.broadcast.to는 해당 그룹에서 나를 제외하고 데이터를 전송하는 방법. 

## 소속된 그룹 리스트 보기

```
socket.rooms
```

해당 소켓 객체가 포함된 그룹을 보여줌.

## 소켓 연결이 끊겼을 때 이벤트 발생

소켓을 연결할 connection 이벹트가 발생하고 소켓이 끊겼을 땐 disconnect가 발생함

```
socket.on('disconncet',() => {
})
```