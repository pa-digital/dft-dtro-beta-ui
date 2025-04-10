# Choose NGINX as our base Docker image
FROM nginx:latest
# Copy static assets and nginx configuration into docker image
COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/error_pages /usr/share/nginx/html

# Define environment variables for Cloud Run
EXPOSE 8080
CMD [ "nginx", "-g", "daemon off;"]
