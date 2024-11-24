# Stage 1: Build the application
FROM node:22-alpine AS builder
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Copy the .env file
COPY .env .env
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the build output to Nginx's html folder
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose the port on which Nginx will run
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# docker build -t temperatures-app .
# docker run --name temperatures-app -p 3000:80 temperatures-app