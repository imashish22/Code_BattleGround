# Step 1: Use Node.js to build the frontend
FROM node:16 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the entire Vite project files into the container
COPY . .

# Step 6: Build the Vite project for production
RUN npm run build

# Step 7: Use Nginx to serve the built project
FROM nginx:alpine

# Step 8: Copy the build files from the build stage into Nginx’s default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 for the frontend
EXPOSE 80

# Step 10: Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
