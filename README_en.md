# :pushpin: MyW (Make your World)
Create the your own novel is that easy with our MyW. Just select the keyword and write simple plot, then proceed sequentially, and you will get your own novel!
<div align=center>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/e5b4c9b9-cdd1-4859-aa4b-60fc256cd804"/>
</div>
<div align=center>
by Team-A (ChaG.P.T) (2023.06 ~ 2023.08)
</div>

### [Korean Version](https://github.com/2023SVBootcamp-Team-A/project/blob/b6edd24334e1d8366e95945ecdda2353a8c17dbd/README.md)
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

### How to start the server
Requirement
- Your own OpenAI secret key ([Get your key from here(may incur costs)](https://platform.openai.com/))
- Your own AWS S3 Bucket ([Get your AWS S3 Bucket from here(may incur costs)](https://aws.amazon.com/ko/s3/getting-started/))

1. Install Docker on your system
2. follow the shell command below
```shell
$ git clone https://github.com/2023SVBootcamp-Team-A/project.git
```
3. make the docker-compose.yml file and .env file at right location
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
- /.env (Directory where docker-compose.yml is located)
```
DEBUG=True
GF_USER=team-a
GF_PASSWORD=team-a
```
- /backend/config/.env
```
OPENAI_SECRET_KEY=(input your OpenAI secret key here)
DEBUG=True
DB_ENGINE=django.db.backends.postgresql
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=db
DB_PORT=5432
AWS_ACCESS_KEY_ID=(input your AWS access key id here)
AWS_SECRET_ACCESS_KEY=(input your AWS secret access key here)
AWS_STORAGE_BUCKET_NAME=(input your AWS S3 Bucket name here)
AWS_S3_REGION_NAME=(input your AWS region name here)
AWS_S3_ENDPOINT_URL=(input your AWS S3 endpoint URL here)
AWS_S3_DOWNLOAD_URL=(input your AWS S3 download URL here)
SECRET_KEY=django-insecure-
CORS_ORIGIN_WHITELIST=http://127.0.0.1:5173,http://13.125.48.224:5173,http://frontend:5173,http://13.125.48.224,http://www.techeer-team-a.store,http://www.techeer-team-a.store:5173,http://localhost:5173
ALLOWED_HOSTS=backend,13.125.48.224,www.techeer-team-a.store,techeer-team-a.store,localhost,127.0.0.1
```
4. follow the shell command below
```shell
$ cd project
$ docker compose up -d --build
```
5. Check the Docker Containers running correctly at Docker Desktop.
6. Go to the backend container on Docker Desktop, then get your django secret key. ([How to get](https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/5c0e98cb-fad9-46c4-b0f3-95363cbb4dd6))
7. Add your django secret key to .env file
- /backend/config/.env
```
OPENAI_SECRET_KEY=(input your OpenAI secret key here)
DEBUG=True
DB_ENGINE=django.db.backends.postgresql
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=mypassword
DB_HOST=db
DB_PORT=5432
AWS_ACCESS_KEY_ID=(input your AWS access key id here)
AWS_SECRET_ACCESS_KEY=(input your AWS secret access key here)
AWS_STORAGE_BUCKET_NAME=(input your AWS S3 Bucket name here)
AWS_S3_REGION_NAME=(input your AWS region name here)
AWS_S3_ENDPOINT_URL=(input your AWS S3 endpoint URL here)
AWS_S3_DOWNLOAD_URL=(input your AWS S3 download URL here)
SECRET_KEY=django-insecure-(input your django secret key here)
CORS_ORIGIN_WHITELIST=http://127.0.0.1:5173,http://13.125.48.224:5173,http://frontend:5173,http://13.125.48.224,http://www.techeer-team-a.store,http://www.techeer-team-a.store:5173,http://localhost:5173
ALLOWED_HOSTS=backend,13.125.48.224,www.techeer-team-a.store,techeer-team-a.store,localhost,127.0.0.1
```
8. follow the shell command below
```shell
$ docker compose up -d --build
```
9. Check the Docker Containers running correctly at Docker Desktop once again.
10. Access to 'localhost:5173' on your web browser. then, enjoy!

- - - 

## :page_with_curl: Features

<details>
<summary><h3>Setting the background for the novel</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/7c44a770-09e2-4022-8d34-2cf782d75633"/>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/50590bbc-2bcc-4fb4-b3b9-3cd255810787"/>
<br />
<br />
It provides the ability to select the genre, spatial background, historical background, characters, and plot of the novel to be created as desired. In addition to the built-in options, users can freely add genres, spaces, and eras of they want.
</details>

<details>
<summary><h3>Interactive novel write</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/1428844a-7ba8-4960-9849-dd122d4482d1"/>
<br />
<br />
Create a novel with the story you want by repeating progression and selection. You can continue by choosing one of the options provided, or you can end the writing at any point and go to the results page.
</details>

<details>
<summary><h3>View completed novel</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/b3d3fb08-a301-43e8-b937-51b7c6201bb4"/>
<br />
<br />
The completed novel is expressed in a UI similar to reading a real book, providing the same experience as reading a novel you created as an e-book.
</details>

<details>
<summary><h3>List of my novels</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/635ee70b-b488-4a26-9b09-fe5fd7a65364"/>
<br />
<br />
The novel list written by each user is provided in a UI that can be checked in the form of a bookshelf. Clicking on the book shape will take you to a page confirming the completed content of that novel.
</details>

<details>
<summary><h3>List of all novels</h3></summary>
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/025bd505-3215-44d6-9e82-48c42a783eaf"/>
<br />
<br />
You can also check the entire list of novels written by all users, not just the user himself, through the bookshelf-style UI. You can browse page by page with pagination applied, and similarly, click the book shape to see the completed contents of the novel.
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
We used React framework to make page in SPA (Single Page Application) format. This improves loading speed on the page with only contents that is change which user can enojoy there experience without useless loading delays. And we used TypeScript. TypeScript is static type language that was developed to solve problems caused by JavaScript being a dynamic language. In TypeScript, all variables and functions must be defined with their specific types. This benefit developers with reducing time to search for errors and because it allows to catch error while compiling it reduces the whole process. also We used Vite, a frontend build tool that is similar to Web-pack. With enhancement of native ESBuild Module and using HMR (Hot Module Replacement) Vite can run server more faster than Web-pack by seperating source code and dependency so server can run without bundling whole thing.


## Tailwind CSS
With Tailwind CSS, you can apply pre-defined CSS styled by just set the class name on HTML. Therefore, we reduced the time for make naming rules, and documentation about structure. also we made some component without import external CSS file thanks to Tailwind CSS.

## Monitoring
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/fdfe912a-40a2-4e00-846a-5c4065333101"/><br/>
We can track error caused by frontend side with Sentry, the frontend error monitoring, and tracking tool. it provides the type of error and where the error occurred in the code. therefore we can reduce the time to find the location of wrong code. also we can check the error quickly by receiving an email notification as soon as an error occurs.
</details>  

<details> 
<summary><h3>Backend</h3></summary>

## API
## Swagger
<img src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/b65939a0-933b-488b-b16a-ad6de76d13d4"/>
<br />
We made the API specification with Swagger.
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

We gather the information about request, response from Django by Prometheus, then it can be visualized by Grafana. By linking Slack and Grafana, a warning notification is sent to Slack when the CPU usage exceeds the set range. also, CAdvisor let us monitor the usage of CPU, memory, and network for each of containers. and we use node exporter to monitor the CPU, Memory, network traffic usage of entire server. Nginx log, time-zone, response code by each site and their ratio can be monitored by ELK Stack.

## Github Actions
By building a CI/CD pipeline through Github Actions, code changes can be smoothly reflected on the server.
</details>

- - - 
## 👪 Members
| Name    | <center>Yeonjin Kim</center>|<center>Seokkyoo Kang</center> |<center>Haeun Kim</center> | 
| ------- | --------------------------------------------- | ------------------------------------ | --------------------------------------------- | 
| Profile | <center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/86517634?v=4" /></center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/8746067?v=4" /></center>|<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/e1998a20-40e0-4bc3-a242-14161ac453f3" /></center>|
| Role    | <center>Team Leader<br> Frontend, DevOps</center>   | <center>Frontend, <br> DevOps</center>    | <center>Frontend</center>  | 
GitHub | <center>[@homebdy](https://github.com/homebdy)</center> | <center>[@AlgeMoya](https://github.com/AlgeMoya) </center>| <center>[@HaeunKim01](https://github.com/HaeunKim01) </center>|

| Name    | <center>Seunguk Lee</center> | <center>Taek Lee</center> | <center>Hyeongchan Im</center> | <center>Youngjin Chae</center>
| ------- | --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| Profile |<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/b0476434-30fd-4222-b98d-21178e774189" /></center>|<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/2e55e092-5587-463d-8612-ab50e75c2761" /></center>|<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/731a3d49-c8f3-449d-9e30-970cbca92d23" /></center>|<center><img width="110px" height="110px" src="https://github.com/2023SVBootcamp-Team-A/project/assets/8746067/25d3181f-8992-4ae9-a8b7-d9a28e7271ba" /></center>|
| Role    | <center>Backend,<br> DevOps</center> | <center>Backend</center> | <center>Frontend</center> | <center>Backend</center> |
GitHub | <center>[@josephuk77](https://github.com/josephuk77)</center> | <center>[@LeeTaek2T](https://github.com/LeeTaek2T) </center>| <center>[@V2LLAIN](https://github.com/V2LLAIN) </center>| <center>[@youngjin516](https://github.com/youngjin516)</center>

