docker stop blog
docker rm blog
docker run -d -p 8080:8080 -p 8081:8081 --name blog --restart unless-stopped cloud.canister.io:5000/the1nk/blog:9
