# :pushpin:  나만의 소설 만들기: Make your World 
Make your World를 통해 여러분이 원하는 새로운 이야기를 소설로 만들어보세요! 
<div align=center>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/e5b4c9b9-cdd1-4859-aa4b-60fc256cd804"/>
</div>
<div align=center>
by Team-A (ChaG.P.T) (2023.06 ~ 2023.08)
</div>

### [English Version](https://github.com/2023SVBootcamp-Team-A/project/blob/b6edd24334e1d8366e95945ecdda2353a8c17dbd/README_en.md)
- - - 

## Medium.com
[About Our Project 📕](https://medium.com/@chan4im/2023-silicon-valley-summer-bootcamp-chag-p-t-make-your-own-story-8421e5f6c3e9)

## Production
http://www.techeer-team-a.store/

## 📹 Demo Video (데모 업로드 후 수정 필요!)
[![Video Label](http://img.youtube.com/vi/OSPhfQPK0x8/0.jpg)](https://youtu.be/OSPhfQPK0x8)

## 📁 System Architecture
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/8a6dc146-d11f-44a4-be31-1e6f98c344d8">

## 🛠 Installation

### 사용설명서
준비물
- OpenAI secret key ([발급받으러 가기(비용이 발생할 수 있음)](https://platform.openai.com/))

1. Docker를 시스템에 설치합니다.
2. 아래의 shell 명령문을 똑같이 따라 칩니다.
```shell
$ git clone https://github.com/2023SVBootcamp-Team-A/project.git
```
3.  docker-compose.yml 파일과 .env 파일을 알맞은 위치에 작성합니다.
- .docker-compose.yml
```
version: "3"

services:
  frontend:
    container_name: frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - 5173:5173
    stdin_open: true
    volumes:
      - ./frontend/:/frontend
      - /frontend/node_modules
    tty: true
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true

  db:
    image: postgres
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydatabase

  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@makeyourworld.com
      - PGADMIN_DEFAULT_PASSWORD=password
    ports:
      - "8080:80"

  web:
    build:
      context: ./backend
      dockerfile: Dockerfile
    volumes:
      - ./backend:/backend/
    ports:
      - "8000:8000"
    depends_on:
      - db
    container_name: backend
    environment:
      - DJANGO_DEBUG=True
```
- /.env (docker-compose.yml 파일과 같은 디렉토리)
```
DEBUG=True
GF_USER=team-a
GF_PASSWORD=team-a
```
- /backend/config/.env
```
OPENAI_SECRET_KEY=(여기에 OpenAI secret key 입력)
DEBUG=True
DB_ENGINE=django.db.backends.postgresql
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=db
DB_PORT=5432
SECRET_KEY=django-insecure-
CORS_ORIGIN_WHITELIST=http://127.0.0.1:5173,http://13.125.48.224:5173,http://frontend:5173,http://13.125.48.224,http://www.techeer-team-a.store,http://www.techeer-team-a.store:5173,http://localhost:5173
ALLOWED_HOSTS=backend,13.125.48.224,www.techeer-team-a.store,techeer-team-a.store,localhost,127.0.0.1
```
4. 아래의 shell 명령문을 똑같이 따라 칩니다.
```shell
$ cd project
$ docker compose up -d --build
```
5. Docker Desktop에서 Docker Container들이 잘 실행되고 있는지 확인합니다.
6. Docker Desktop에서 backend container를 선택한 다음, django secret key를 확인합니다. ([확인 방법](https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/5c0e98cb-fad9-46c4-b0f3-95363cbb4dd6))
7. 확인한 django secret key를 .env 파일에 추가합니다.
- /backend/config/.env
```
OPENAI_SECRET_KEY=(여기에 OpenAI secret key 입력)
DEBUG=True
DB_ENGINE=django.db.backends.postgresql
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=db
DB_PORT=5432
SECRET_KEY=django-insecure-(여기에 django secret key 입력)
CORS_ORIGIN_WHITELIST=http://127.0.0.1:5173,http://13.125.48.224:5173,http://frontend:5173,http://13.125.48.224,http://www.techeer-team-a.store,http://www.techeer-team-a.store:5173,http://localhost:5173
ALLOWED_HOSTS=backend,13.125.48.224,www.techeer-team-a.store,techeer-team-a.store,localhost,127.0.0.1
```
8. 아래의 shell 명령문을 똑같이 따라 칩니다.
```shell
$ docker compose up -d --build
```
9. Docker Desktop에서 Docker Container들이 잘 실행되고 있는지 한 번 더 확인합니다.
10. 그 상태에서 'localhost:5173'에 접속하면 사용할 수 있습니다. 재밌는 시간 되길 바랍니다!

- - - 

## :page_with_curl: Features

<details>
<summary><h3>소설 설정 입력</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/7c44a770-09e2-4022-8d34-2cf782d75633"/>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/50590bbc-2bcc-4fb4-b3b9-3cd255810787"/>
<br />
<br />
만들 소설의 장르, 공간적 배경, 시대적 배경, 등장인물, 줄거리를 원하는 대로 선택하는 기능을 제공합니다. 

 기본 제공되는 선택지 외에도 사용자가 원하는 장르, 공간, 시대를 자유롭게 추가할 수 있습니다.
</details>

<details>
<summary><h3>대화형 소설 진행</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/1428844a-7ba8-4960-9849-dd122d4482d1"/>
<br />
<br />
진행과 선택을 반복하는 방식으로 사용자가 원하는 스토리의 소설을 만듭니다. 제공되는 선택지 중 하나를 선택해서 계속 진행하거나, 원하는 시점에 진행을 종료하고 결과 페이지로 이동할 수 있습니다.
</details>

<details>
<summary><h3>완성된 소설 확인</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/b3d3fb08-a301-43e8-b937-51b7c6201bb4"/>
<br />
<br />
완성된 소설은 실제 책을 읽는 것과 유사한 UI로 표현되어, 마치 자신이 만든 소설을 전자책으로 읽는 것과 같은 경험을 제공합니다.
</details>

<details>
<summary><h3>내가 쓴 소설 목록</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/635ee70b-b488-4a26-9b09-fe5fd7a65364"/>
<br />
<br />
사용자별로 자신이 쓴 목록을 책장 형태로 확인 가능한 UI로 제공합니다. 책 모양을 클릭하면 해당 소설의 완성된 내용을 확인하는 페이지로 이동합니다.
</details>

<details>
<summary><h3>전체 소설 목록</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/025bd505-3215-44d6-9e82-48c42a783eaf"/>
<br />
<br />
사용자 본인 뿐만이 아닌, 모든 사용자가 작성한 전체 소설 목록 또한 책장 형태의 UI로 확인할 수 있습니다. 페이지네이션을 적용하여 페이지별로 둘러볼 수 있으며, 마찬가지로 책 모양을 클릭하면 해당 소설의 완성된 내용을 확인할 수 있습니다.
</details>

- - - 
## 🔌 Tech Stack
<div align =center>

Area| Tech Stack|
:--------:|:------------------------------:|
**Frontend** | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?&style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245.svg?&style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF.svg?&style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?&style=for-the-badge&logo=TailwindCSS&logoColor=white"> <img src="https://img.shields.io/badge/Swiper-6332F6?&style=for-the-badge&logo=Swiper&logoColor=white">
**Backend** | <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"> <img src="https://img.shields.io/badge/DJANGO_REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white"> <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white"> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
**AI** | <img src="https://img.shields.io/badge/ChatGPT-00A67E?&style=for-the-badge&logo=OpenAI&logoColor=white"> <img src="https://img.shields.io/badge/DALL--E-412991?style=for-the-badge&logo=OpenAI&logoColor=white">
**DevOps** | <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=black"> <img src="https://img.shields.io/badge/gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=black"> <img src="https://img.shields.io/badge/Github_Actions-2088FF?style=for-the-badge&logo=Github-Actions&logoColor=black"> <img src="https://img.shields.io/badge/Amazon_EC2-FF9900?style=for-the-badge&logo=Amazon-EC2&logoColor=black">
**Monitoring** | <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white"> <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white"> <img src = "https://img.shields.io/badge/cadvisor-1478FF?style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/Sentry-362D59?&style=for-the-badge&logo=sentry&logoColor=white"> ![node-exporter](https://img.shields.io/badge/node_exporter-37D100?style=for-the-badge&logo=Prometheus&logoColor=white) ![Elastic Stack](https://img.shields.io/static/v1?style=for-the-badge&message=Elastic+Stack&color=005571&logo=Elastic+Stack&logoColor=FFFFFF&label=)
**etc** | ![GitHub](https://img.shields.io/static/v1?style=for-the-badge&message=GitHub&color=181717&logo=GitHub&logoColor=FFFFFF&label=) ![Slack](https://img.shields.io/static/v1?style=for-the-badge&message=Slack&color=4A154B&logo=Slack&logoColor=FFFFFF&label=) ![Notion](https://img.shields.io/static/v1?style=for-the-badge&message=Notion&color=000000&logo=Notion&logoColor=FFFFFF&label=) ![Figma](https://img.shields.io/static/v1?style=for-the-badge&message=Figma&color=F24E1E&logo=Figma&logoColor=FFFFFF&label=) ![Postman](https://img.shields.io/static/v1?style=for-the-badge&message=Postman&color=FF6C37&logo=Postman&logoColor=FFFFFF&label=) <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"> ![GitKraken](https://img.shields.io/static/v1?style=for-the-badge&message=GitKraken&color=179287&logo=GitKraken&logoColor=FFFFFF&label=) ![Visual Studio Code](https://img.shields.io/static/v1?style=for-the-badge&message=Visual+Studio+Code&color=007ACC&logo=Visual+Studio+Code&logoColor=FFFFFF&label=)
</div>

<details>
<summary><h3>Frontend</h3></summary>

## React Vite TypeScript
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/3c1afbf5-fcd7-4af2-9ce2-4e2b4a03db2b"/>
<br/>
React 프레임워크를 사용함으로서 SPA(Single Page Application) 형식의 페이지를 만들었으며, 로딩 지연 없이 변화된 콘텐츠만을 표시하는 방법으로로 사용자 경험을 향상시켰습니다. 

또한 정적 타입 언어인 TypeScript를 사용함으로서 컴파일 단계에서 에러를 빠르게 확인하고, 오류를 검색하는 시간을 줄이는 이점을 확보할 수 있었습니다. 

또한 번들러로 ESModule 기반의 Vite를 사용하여 전체를 번들링하지 않고도 서버를 실행함으로서 개발 서버의 실행 속도를 향상시켰습니다.


## Tailwind CSS
Tailwind CSS를 사용함으로서 HTML 상에서 클래스명을 설정하는 것만으로 미리 정의된 스타일을 적용할 수 있습니다. 

덕분에 네이밍 규칙을 통일하고 구조를 문서화하는 시간과 반응형 레이아웃 설정에 들이는 노력을 덜 수 있었으며, 일부 컴포넌트의 경우 별도의 CSS 파일 없이 스타일링을 적용할 수 있었습니다.

## Monitoring
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/fdfe912a-40a2-4e00-846a-5c4065333101"/><br/>
프론트엔드 에러 모니터링 및 트래킹 툴인 Sentry를 사용하여 에러를 추적할 수 있게 하였습니다. 

에러의 종류, 발생 위치 등에 대한 정보를 제공하므로 원인을 찾는 데 들이는 시간을 덜 수 있으며, 에러 발생 즉시 메일 알림을 받아 빠르게 확인할 수 있습니다.
</details>  

<details> 
<summary><h3>Backend</h3></summary>

## API
## Swagger
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/b65939a0-933b-488b-b16a-ad6de76d13d4"/>
</div>


</details>  
 
<details>
<summary><h3>Devops</h3></summary>

## Monitoring
Grafana + Prometheus, ELK

|**Django** |**Node exporter**|
|-----|-----|
<img alt="스크린샷 2023-08-04 오전 12 11 52" src="https://github.com/2023SVBootcamp-Team-A/project/assets/69853298/852a392a-fc06-431c-bd5a-2f635db1e84d" width="500px" height="300px">|<img alt="스크린샷 2023-08-03 오후 11 50 55" src="https://github.com/2023SVBootcamp-Team-A/project/assets/69853298/2df30dff-e206-40b0-8ea3-5e09289ca271" width="500px" height="300px">

|**cAdvisor** |**ELK**|
|-----|-----|
<img alt="스크린샷 2023-08-04 오전 12 15 41" src="https://github.com/2023SVBootcamp-Team-A/project/assets/69853298/bb85b7d4-82d1-4e0a-91f2-c16ee72936de" width="500px" height="300px">|<img alt="스크린샷 2023-08-04 오전 12 07 22" src="https://github.com/2023SVBootcamp-Team-A/project/assets/69853298/b7408adf-c067-44ba-95a3-a19a05bf435e" width="500px" height="300px">

1. Django에서 Prometheus를 통해 request,response에 대한 정보를 수집을 한 후 Grafana를 통해 시각화 하였습니다. 
2. Slack과 Grafana를 연동하여 설정한 CPU 사용량 범위를 벗어날 경우 Slack에 경고 알림이 오도록 구현하였습니다.
3. CAdvisor를 활용해 각 컨테이너의 cpu, memory사용량등을 알수 있게 하였고, 컨테이너별 네트워크 사용량을 알 수 있게하였습니다.
4. node exporter를 통해 서버의 메모리, cpu 사용량, network traffic 등을 알 수 있게 하였습니다. 
5. ELK 스택을 활용하여 nginx log를 모니터링하고, 시간대, 사이트별 응답코드, 응답코드 비율등을 모니터링 할 수 있게 설계하였습니다.

## Github Actions
Github Actions를 통해 CI/CD 파이프라인을 구축하여 코드 변경사항을 서버에 원할하게 반영할 수 있게 하였습니다.
</details>

- - - 
## 👪 Members
| Name    | <center>김연진</center>|<center>강석규</center> |<center>김하은</center> | 
| ------- | --------------------------------------------- | ------------------------------------ | --------------------------------------------- | 
| Profile | <center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/86517634?v=4" /></center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/8746067?v=4" /></center>|<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/e1998a20-40e0-4bc3-a242-14161ac453f3" /></center>|
| Role    | <center>Team Leader<br> Frontend, DevOps</center>   | <center>Frontend, <br> DevOps</center>    | <center>Frontend</center>  | 
GitHub | <center>[@homebdy](https://github.com/homebdy)</center> | <center>[@AlgeMoya](https://github.com/AlgeMoya) </center>| <center>[@HaeunKim01](https://github.com/HaeunKim01) </center>|

| Name    | <center>이승욱</center> | <center>이택</center> | <center>임형찬</center> | <center>채영진</center>
| ------- | --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| Profile |<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/b0476434-30fd-4222-b98d-21178e774189" /></center>|<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/2e55e092-5587-463d-8612-ab50e75c2761" /></center>|<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/731a3d49-c8f3-449d-9e30-970cbca92d23" /></center>|<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/25d3181f-8992-4ae9-a8b7-d9a28e7271ba" /></center>|
| Role    | <center>Backend,<br> DevOps</center> | <center>Backend</center> | <center>Frontend</center> | <center>Backend</center> |
GitHub | <center>[@josephuk77](https://github.com/josephuk77)</center> | <center>[@LeeTaek2T](https://github.com/LeeTaek2T) </center>| <center>[@V2LLAIN](https://github.com/V2LLAIN) </center>| <center>[@youngjin516](https://github.com/youngjin516)</center>

