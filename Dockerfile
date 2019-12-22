FROM nginx
COPY site/.vuepress/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d