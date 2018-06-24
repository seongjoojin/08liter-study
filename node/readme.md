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

사용자의 요청에 따라 처리할땐 두 가지만 기억하면 됨

- URL
- methods

URL로 어떤 메소드로 요청했는지만 파악하고 해당 요청에 맞추어 코드를 실행하여 응답하면 됨

# node js 도구들

## supervisor

코드가 바뀌면 자동으로 서버를 재시작해줌

주의할점 :  재시작되는 동안 서버가 꺼져 있는 상태이기 때문에 일시적으로 요청을 응답하지 못할 수 있음, js 파일의 변경만 감지

```
supervisor [파일명]
```

## forever

서버를 백그라운드로 실행시켜주는 도구

백그라운드에서 실행한다는 의미는 서버를 실행시킨 터미널을 종료해도 서버가 종료되지 않고 계속 실행하는 것을 의미함.

```
forever start [파일명] # 서버 백그라운드로 시작
forever stop [숫자] # 백그라운드에서 돌고있는 서버 종료
forever restart [숫자] # 백그라운드에서 돌고있는 서버 재시
```

## pm2

백그라운드로 등록해주는 도구. forever보다 많은 기능 지원

### 서버 등록(start)
```
pm2 start 이름.js
```
 
### 서버 종료(stop)


```
pm2 stop id

pm2 stop [App name] 
```

서버를 종료만 하고 프로세스는 죽이지 않음.

### 서버 정보 보기(show)

```
pm2 show id

pm2 show [App name] 
```

해당 서버의 정보를 볼 수 있음.

### 모니터링(monit)

```
pm2 monit
```

pm2로 등록된 서버들을 모니터링 할 수 있음

키보드 방향키를 통해 서버를 선택할 수 있음

Global Logs에서는 서버에서 출력되는 각종 로그를 확인할 수 있음.

### 클러스터링

클러스터링 = 분신. 서버가 하나만 떠 있는 상태에서 해당 서버가 죽으면 서비스는 동작할 수 없음. 하지만 클러스터링을 이용하면 하나의 서버를 여러 대 띄워 서버 한 쪽이 죽더라도 다른 서버가 살아있기 때문에 서비스는 유지할 수 있음.

```
pm2 start name.js -i 6
```

클러스터링하기 위해서는 -i 옵션을 주고 숫자를 입력함. 해당 서버를 몇 개를 띄울지 정해주는 숫자임. 일반적으로 CPU코어 개수만큼 넣어줌(0을 입력하면 자동으로 코어 개수에 맞춰서 띄어)

클러스터링으로 동작 중인 서버는 mode가 fork가 아니라 *cluster*로 표시함

만약 개수를 바꾸고 싶다면 scale을 이용하여 재조정할 수 있음

```
pm2 scale app 3 # App name을 넣어줌
```

# npm과 package.json

npm : Node Package Manager 노드로 생성한 패키지/프로젝트를 관리하는 도구

패키지/프로젝트 정보를 가지고 있는 것이 package.json

# express

## 라우팅 콜백함수 인자

사용자가 요청하는 API를 정의하고 실행될 콜백함수을 구현함. <br>
사용자 요청에 따라 실행하는 콜백함수는 3개의 인자를 받음

요청 객체, 응답 객체, next 객체

### 요청 객체

http 통신 요청 객체에서 클라이언트가 포함된 데이터를 사용하기 위해서는 URL을 파싱해서 사용해야만 했음. express에서는 이러한 것들을 미리 파싱해 주기 때문에 편리하게 사용 가능함.

- params
- query
- body

### 응답 객체

등록된 라우터의 콜백함수 두 번째 인자로 응답 객체를 받음. express에서는 클라이언트에게 다양한 형태로 응답할 수 있음.

- download() : 해당 파일을 다운로드함
- json() : JSON 형태로 데이터를 응답함
- redirect() : 해당 경로로 강제이동함
- render() : express에서 제공하는 pug와 ejs라고 하는 템플릿 엔진을 HTML로 렌더링할 때 사용함
- send() : 응답할 경우 전송된 데이터에 따라 알맞은 형식으로바뀌어서 전송함
- status() : 상태코드를 바꿔줄때 사용함. status()는 체이닝 형태로 작성할 수 있

## 미들웨어

### express에서 제공하는 미들웨어

#### morgan

클라이언트의 요청 로그를 확인하는 미들웨어 <br>
200은 녹색, 404는 황색, 500은 적색으로 표시되어 로그를 한 눈에 보기 쉬움

```
const logger = require('morgan');
app.use(logger('dev'));
```

#### body-parser

클라이언트가 body에 포함한 데이터를 파싱하기 위해 필요한 미들웨어

```
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

bodyParser를 제대로 사용하기 위해서는 bodyParser.json()의 형태로 호출해야함. body에는 데이터의 제한이 없지만 node.js에서는 100Kb로 제한이 걸려 있음.

하지만 json()에 옵션을 추가하여 제한을 변경할 수 있음

```
app.use(bodyParser.json({limit: 5000000})); // 5MB까지 제한 해제
```

#### cookie-parser

헤더에 포함한 쿠키를 JSON 형태로 파싱하는 미들웨어

```
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

#### multer

파일 업로드를 위한 미들웨어

#### express.static

정적파일 제공을 위한 미들웨어. express는 CSS, Javascript, images파일 같은 정적파일을 하나의 디렉토리에서 관리함

#### passport

사용자 인증을 위한 미들웨어. passport를 이용하면 페북, 네이버에서 제공하는 인증시스템을 이용할 수 있음. 인증시스템을 직접 만들 수 있음.

### 미들웨어(라우터)에서 중요한 점

하나의 미들웨어(라우터)에서 응답이 여러 번 등장하면 안됨
