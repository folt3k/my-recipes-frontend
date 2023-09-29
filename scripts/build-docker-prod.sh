docker compose -f ../docker-compose.prod.yaml up --build -d
docker cp MyRecipesFrontendApp:/home/app/build /var/www/my-recipes/frontend