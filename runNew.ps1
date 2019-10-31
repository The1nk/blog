docker stop blog
docker rm blog
docker run -d -p 80:80 --name blog --restart unless-stopped the1nk/blog