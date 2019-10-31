docker stop blog
docker rm blog
docker run -d -p 80:80 --name blog --restart unless-stopped cloud.canister.io:5000/the1nk/blog
