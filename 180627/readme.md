# pages 디렉토리

## pages API

```vue
<template>
  <h1>hello world</h1>
</template>
<script>
  export default {

    // vue 인스턴스가 생성되기 전 store 초기화
    fetch({store, params}){
    },

    // 인스턴스가 생성될 때 호출
    created () {
    },

    // 비동기적으로 데이터 생성 json 형태로 반환하면 data ()와 머지됨
    asyncData (context) {
      return {}
    },

    // 데이터 생성
    data () {
      return {}
    },

    // 없어도 됨!, 해당 페이지 <head> 커스텀마이징
    head () {
      return {
        title: '',
        meta: [
          { hid: '고유값', name: '설명', content: '커스텀 설명' }
        ]
      }
    },

    // 해당 파일에 동작시킬 메소드 정의
    methods: {
    },

    // 복잡한 계산식일 때 computed 이용
    computed: {
    },

    // 외부 컴포넌트 추가{a,b,c}의 형태로 작성. 각각 컴포넌트는 import a from 'a'로 가져옴
    components: {
    },

    // 없어도 됨!, layout 설정, 기본 레이아웃 사용시 지워도 됨
    layout: '',

    // 없어도 됨!, 미들웨어 설정, middleware : 'authenticated'는 middleware 디렉토리의 authenticated.js 파일 실행
    middleware:'',

    // 없어도 됨!, 최상단 true, 최하단 false
    scrollToTop: true || false
  }
</script>
```

## asyncData 메소드

asyncData는 컴포넌트에서 데이터 설정을 할 때 비동기적으로 생성되는 데이터 일때 asyncData를 사용함. 서버에서 데이터를 가져와서 사용한다면 asyncData를 사용함. 

```vue
export default {
    asyncData (context) {
        // 서버에서 데이터를 받아오는 부분
        
        return { message2 : 'world' }
    },
    data () {
        return { message1 : 'hello' }
    }
}
```
## fetch 메소드

fetch는 vuex인 데이터 스토어에 넣기 위해 사용함. 비동기적으로도 작동 할 수 있음.

```vue
<template>
    <h1>messages: {{ $store.state.data }}</h1>
</template>
<script>
export default {
    fetch ({ store, params }) {
        
        // 데이터 가져오는 부분
        store.commit('dataUpdate',data)
    }
}
</script>
```

## head

head 메소드는 각 페이지에서 head 태그를 수정할 수 있음

```vue
<template>
    <h1> {{ title }} </h1>
</template>
<script>
    export default {
        data () {
            return {
                title: 'hello world'
            }
        },
        head () {
            return {
                title: this.title,
                meta: [
                    { hid: '1', name: '에반', content:'저의 사이트 입니다.'}
                ]
            }
        }
    }
</script>
```

## layout

```vue
<script>
export default {
    layout (content) {
        return 'boardDefault'
    }
}
</script>
```

## middleware

미들웨어를 통해 컴포넌트가 호출되기 전에 특정 코드를 실행시킬 수 있음.

```vue
// /middleware/auth.js
export default function ({ store, redirect }) {
    if (로그인 하지 않았을때) {  // store.state.isLogin으로 스토어에 접근할 수 있음.
        return redirect('/signin')
    }
}
```

```vue
<template>
    <h1>유저 상세페이지</h1>
</template>
<script>
export default {
    middleware: 'auth'
}
</script>
```

유저 상세 페이지에 접근한다고 했을 때, 반드시 로그인을 해야함. 스토어에는 로그인 유무를 저장하고 미들웨어에서 스토어에 저장된 로그인 유무값을 통해 판단한 후 로그인 하지 않았다면 redirect를 통해 로그인 페이지로 옮겨주고 로그인했다면 해당 페이지를 그냥 띄워줍니다.

## scrollToTop

```vue
<template>
    <h1>hello world</h1>
</template>
<script>
export default {
    scrollToTop: false
}
</script>
```

scrollToTop은 페이지의 스크롤 상단/하단 여부를 결정짓는 속성. false : 하단, true : 상단

# 설정 파일 (nuxt.config.js)

## cache (캐시)

cache는 컴포넌트 캐시의 허용 유무. 캐시되는 컴포넌트의 수와 캐시되는 시간 설정

```vue
module.exports = {
    cache: {
        max: 1000,
        maxAge: 100*60*60 // default 15min - ms 단위
    }
}
```

## loading (로딩)

loading은 페이지 이동 시 상단에 뜨는 프로그래스 바에 대한 설정. 프로그래스바를 사용할지 여부, 색상, 에러 발생했을 때 색상, 높이, 프로그래스 바 최대 진행시간을 설정할 수 있음.

```vue
module.exports = {
    loading: {
        color: 'blue',
        height: '5px',
        failedColor: 'red',
        duration:1000*10 // default 5s
    }
}
```

*color*는 프로그래스 바 색상<br>
*height*는 프로그래스 바 높이<br>
*failedColor*는 에러 발생 시 프로그래스 바 색상<br>
*duration*은 프로그래스 바의 최대 진행시간. 기본값은 5초.


#### 출처 : 자바스크립트로 서버와 클라이언트 구축하기