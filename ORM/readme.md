# ORM을 이용한 데이터베이스 연동

## ORM

ORM : Object Relational Mapping

데이터베이스와 애플리케이션의 관계를 나타내는 오브젝트.

### ORM의 이점

ORM을 사용하기 위해서는 데이터베이스에 정의된 테이블을 객체로 만들어야함.

위와 같은 것을 *모델*이라고함.

ORM의 이점

1. 데이터베이스 조작법을 모르고도 데이터베이스를 조작할 수 있음. 즉, 테이블 생성부터 조회, 삽입, 수정, 삭제할 수 있음.
2. 코드 가독성이 올라감. ORM은 쿼리문 형태가 아니라 메소드를 호출하는 형태로 호출하기 때문에 코드를 유지보수하는데 이점이 있음.
3. ORM을 모듈이 제공하는 디비에 대해서는 모델 파일만 있다면 디비 종류에 상관없이 사용할 수 있음.

### sequelize

node.js에는 sequelize 모듈을 통해 ORM을 사용할 수 있음.

```
npm install -s mysql2

npm install -s sequelize
```

Promise 형태를 사용함. Promise 패턴 형태로 다루고 async/await도 바로 사용 할 수 있음.

## 모델

new Sequelize()를 이용하여 데이터베이스 연결 객체에서 define을 통해 모델을 만들 수 있음

첫 번째 인자로는 모델의 이름. <br>
두 번째 인자는 해당 테이블의 컬럼 정보. type, primaryKey, autoIncrement, allowNull, defaultValue를 이용하여 옵션을 설정 할 수 있음. autoIncrement, primaryKey는 기본값이 false임. allowNull은 기본값이 true이며, true이면 빈 값을 허용한다는 의미임. *STRING, TEXT, INTEGER, DATE*의 타입을 사용할 수 있음.<br>
세 번째 인자로는 모델(테이블)의 옵션.<br>
*timestamp*의 경우는 Sequelize가 자동으로 createdAt, updatedAt를 생성할지에 대한 유뮤임. 모델을 이용하여 데이터를 생성하거나 수정하면 createdAt와 updatedAt의 값을 자동으로 추가/수정함.<br>
*freeze TableName*은 define에 전달된 첫 번째 인자를 자동으로 tableName으로 바꾸는 유무를 설정함. false이면 첫 번째 인자로 tableName을 변경함<br>
*tableName*은 데이터베이스에서 있는 데이블의 실제이름.

### 효율적인 모델 관리

모델을 models 디렉터리에서 파일 단위로 관리함. 

### 관계 설정

sequelize에서는 join을 위해 include를 사용함. 이때 미리 어떤 테이블과 관계가 있는지 알려줘야함.

## 데이터 생성

create, findOrCreate, bulkCreate

### create

create는 *컬럼:값*을 넣어주면 해당 컬럼과 값을 데이터베이스에 추가함

### findOrCreate

특정 컬럼에서 값을 검사하고 존재하지 않을 때만 데이터를 생성하고 싶으면 findOrCreate를 사용하면 됨. findOrCreate는 내부적으로 데이터 조회를 하므로 조회된 데이터와 데이터의 유무를 알려줌.

findOrCreate는 then 대신 spread를 사용하고 결과를 받는 콜백함수는 첫 번째 인자로 find한 결과 또는 생성된 데이터를 가져옴. 두 번째 인자는 데이터 생성 유무임. false는 where로 검사한 데이터가 이미 존재하여 생성하지 않았다는 의미이고, true는 데이터가 생성되었음을 알려줌.

### bulkCreate

한 번에 여러 개의 데이터를 삽입하고 싶다면 bulkCreate를 이용하면 됨.

bulkCreate에 JSON으로 이루어진 데이터를 리스트 형태로 만들어서 넘겨주면 됨.

## 데이터 수정/삭제

update, destroy

### 수정 - update

where를 이용하여 필터링을 한 후 수정해야 함.

update는 첫 번째 인자로 수정할 데이터를 넣음. 두 번째 인자로 where를 이용하여 수정될 데이터를 찾음.

### 삭제 - destroy

where로 삭제할 값을 필터링한 후 삭제함.

## 데이터 조회

findAll, find, findById, findAndCountAll

### findAll

findAll은 모든 데이터를 다 가져옴

where가 없으면 모든 값을 다 출력함. raw:true를 이용하면 간결하게 결과를 확인할 수 있음.

### find

find는 가장 먼저 등장하는 하나의 데이터만 가져옴

### findById

findById는 아이디 값을 이용하여 조회하는 메소드임.

### findAndCountAll

데이터를 조회하고 데이터와 전체 데이터의 개수를 받아올 수 있음.

### 데이터 조회 시 옵션 설정

- *컬럼 선택* : 특정 컬럼만 가져오고 싶을 땐 *attributes*를 사용함
- *LIMIT, OFFSET* : 개수와 몇 번째 데이터부터 사용할지 정해주는 키워드임
- *ORDER BY* : 정렬 할 땐 *order* 키워드를 사용함.
- *WHERE* : 쿼리문에서와 동일하게 사용 가능함
- *join* : *include*를 사용함