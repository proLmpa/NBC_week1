# Spring B반 8조 — 미니 프로젝트



### 🗽 만나서 반갑습니다. 저희는 올T (All T)입니다 :D

<br>
    
저희 팀은 모두 이과이고, 각자 MBTI에 T가 들어가서 팀 이름을 **‘All T’** 로 지었습니다.!  
<img width="60%" src="https://user-images.githubusercontent.com/51445608/239481394-130e8709-50f9-4946-9c46-11c10446d80a.png"/>

👋 팀원 & 역할  
이름|역할|한마디|
|------|---|---|
|김희열|초기 코드 전체 작성, MBTI통계 기능 작업|실력이 쥐뿔만큼은 있어요|
|고은비|전체 css 디자인 작업|영혼없는 로봇같다는 말을 많이 듣습니다.|
|한지훈|MBTI버튼 선택 기능, 전체 멤버 조회 기능|제주도에 사는 개발자 지망생입니다.|
|송어진|전체코드 병합/수정, 주석작성|우리 팀 짱!|
|송이삭|MBTI api에 따라 CRUD기능 구현|제주도에 살았던 개발자 지망생입니다.|

👨‍👩‍👧‍👦 프로젝트 API 명세
기능|Method|URL|request|response|
|-------|---|---|---|---|
|팀원 전체 조회|GET|/member||{’name’ : name, ‘mbti’: mbti, ‘style’: style, ‘strength’: strength, ‘blog’: blog, ‘img’: img}|
|MBTI 성향 제출|POST|/mbti|{’IE’ : IE, ‘NS’:NS, ‘TF’: TF, ‘PJ’: PJ}|{’msg’: ‘입력 저장 완료!’}|
|MBTI 성향 조회|GET|/mbti||{’result’: all_mbti}|
|MBTI DB 초기화|DELETE|/mbti||{’msg’ : ‘mbti 초기화!’}|

✨ 프로젝트 시연

[![Video Label](http://img.youtube.com/vi/0i0m8-ukIHg/0.jpg)](https://www.youtube.com/watch?v=0i0m8-ukIHg))
