# Stage 1: Build Angular application
FROM node:20 as build
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install
RUN npm run build

# Stage 2: Serve compiled Angular application using Nginx
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/file-handle-frontend/browser /usr/share/nginx/html
EXPOSE 80

# Copy custom Nginx configuration
#COPY nginx.conf /etc/nginx/conf.d/default.conf
