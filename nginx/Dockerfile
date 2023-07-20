# 베이스 이미지를 선택합니다. 이 예시에서는 공식 nginx 이미지를 사용합니다.
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]