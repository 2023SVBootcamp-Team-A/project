# 베이스 이미지를 선택합니다. 이 예시에서는 공식 nginx 이미지를 사용합니다.
FROM nginx:latest

# 컨테이너 내부의 Nginx 구성 파일을 복사합니다.
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/nginx.conf

# 컨테이너가 외부에 노출할 포트를 지정합니다. 이 예시에서는 80번 포트를 사용합니다.
EXPOSE 80

# 컨테이너가 실행될 때 실행할 명령어를 지정합니다. Nginx 서버를 시작합니다.
CMD ["nginx", "-g", "daemon off;"]






