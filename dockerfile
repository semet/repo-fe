# Use the official Node.js 20 image
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Install dotenv-cli globally
RUN npm install -g dotenv-cli

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of your application files
COPY . .

# Build the Remix app
RUN pnpm run build

# Use a smaller image for production
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally (again for the production environment)
RUN npm install -g pnpm

# Install dotenv-cli globally (again for production)
RUN npm install -g dotenv-cli

# Copy only the built app and necessary files from the build image
COPY --from=build /app /app

# Ensure the application files have the correct permissions
RUN chmod -R 755 /app

# Expose the port the app will run on
EXPOSE 3000

# Set the entry point to use the local pnpm to run remix-serve
ENTRYPOINT ["pnpm", "remix-serve", "./build/server/index.js", "."]
