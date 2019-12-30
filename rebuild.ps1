vuepress build site
docker build . -t cloud.canister.io:5000/the1nk/blog:34
docker push cloud.canister.io:5000/the1nk/blog:34