# 프로젝트 생성

express-generator를 이용하여 프로젝트를 생성할땐 express 프로젝트명 형태로 입력

## package.json 파일

package.json 파일은 해당 프로젝트의 정보와 의존성 모듈을 기록하는 곳

debug 설정을 통해 라우트가 일치 여부, 사용하고 있는 미들웨어, 현재 동작 중인 애플리케이션모드, 요청-응답시간을 알 수 있음.

server-favicon을 미들웨어는 클라이언트에게 favicon파일을 제공함. favicon 파일은 ico 확장자를 가짐

jade는 express에서 사용하는 html 렌더링 템플릿 엔진. express에서는 2개의 템플릿 엔진을 사용함. 첫 번째는 jade(pug), 두 번째는 ejs임

생성시 선택하여 생성 가능합니다.
```
express --ejs test
express --jade test
```

body-parser 미들웨어는 클라이언트가 요청한 body 데이터를 파싱하는 미들웨어

cookie-parser 미들웨어는 클라이언트가 요청한 헤더에 있는 쿠키를 파싱하는 미들웨어

morgan 미들웨어는 서버 콘솔(터미널) 창에 클라이언트의 요청 로그를 찍는 미들웨어

npm install 하게되면 dependencies에 기록된 모듈들을 내려받음

## app.js

app.js는 서버에 필요한 미들웨어를 등록한 가장 중요한 파일임.

## bin 디렉터리

bin 디렉터리는 app.js 파일을 가져와 서버를 실행하는 www 파일을 가지고 있음.

app.js 파일을 가져와 http 모듈을 이용해서 서버를 등록하고 서버 등록 중 문제에 대해 처리하는 역할을 함

서버가 잘 등록 되었는지, 서버 등록 중 문제가 발생하지 않았는지 설정. 서버를 몇 번 포트로 열지 설정함

## routes 디렉터리

routes 디렉터리는 라우터 설정한 파일을 정의함. 여기서 설정된 파일을 app.js가 호출하여 미들웨어를 등록함

## public 디렉터리

public은 필요한 정적파일을 관리하는 디렉터리. images, javascript, styles 디렉터리로 나뉘어져 있음. 이미지, javascript, css 파일을 독립적으로 관리함

## views 디렉터리

views 디렉터리는 HTML으로 렌더링되는 템플릿 엔진 파일을 관리함

# express 실행

```
npm run start

node ./bin/wwwk
```