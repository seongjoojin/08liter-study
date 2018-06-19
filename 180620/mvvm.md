```html
<!DOCTYPE html>
<html>
<head>
  <title>Start Vue.js</title>
  <script src="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<body>
  <div id="simple">
    <h2>{{message}}</h2>
  </div>
   <script type="text/javascript">
      // 데이터를 저장하는 model 객체 선언 
      var model = {
        message : '첫번째 vue 앱이다!'
      };
      
      // Vue 객체이자 ViewModel 객체인 simple 객체 선언
      var simple = new Vue({
        // HTML 요소를 나타냄
        el : '#simple',
        // 모델 객체 참조
        data : model
      })
    </script>
  </body>
</html>
```

https://jsfiddle.net/hfv9mL36/2/

## View

사용자에게 보여줄 틀, 구조

```vue
<div id="simple">
    <h2>{{message}}</h2>
</div>
```

## ViewModel

뷰(구조)와 모델(데이터)를 연결하고 보여줄 정보를 제어.

상태(state, 데이터)와 연산(operations, 메서드) 모두 가질 수 있음.

```vue
var simple = new Vue({
    el: #simple,
    data : model
})
```

## Model

보여줄 데이터를 담은 객체를 선언하고 저장.

```vue
var model = {
    message : "hello!"
}
```