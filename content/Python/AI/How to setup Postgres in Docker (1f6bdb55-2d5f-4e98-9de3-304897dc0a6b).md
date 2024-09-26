# Setting Up Docker with PostgreSQL #

This guide provides step-by-step instructions for setting up a PostgreSQL database using Docker.

## Prerequisites ##

- Docker installed on your system
- Basic knowledge of Docker and PostgreSQL

## Step 1: Pull the PostgreSQL Docker Image ##

Pull the official PostgreSQL image from Docker Hub:

```bash
docker pull postgres
```

## Step 2: Create a Docker Container ##

Run a PostgreSQL container with the following command:

```bash
docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

This command:

- Creates a container named `postgres-container`
- Sets the PostgreSQL password to `mysecretpassword`
- Runs the container in detached mode (`-d`)
- Maps port 5432 on the host to port 5432 in the container

## Step 3: Verify the Container is Running ##

Check if the container is running:

```bash
docker ps
```

You should see your `postgres-container` in the list.

## Step 4: Connect to the PostgreSQL Database ##

Connect to the database using `psql` within the container:

```bash
docker exec -it postgres-container psql -U postgres
```

This opens a PostgreSQL prompt where you can execute SQL commands.

## Step 5: Create a Database and Table (Optional) ##

Create a new database and table:

```sql
CREATE DATABASE mydb;
\c mydb
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100));
```

## Step 6: Stop and Start the Container ##

To stop the container:

```bash
docker stop postgres-container
```

To start it again:

```bash
docker start postgres-container
```

## Conclusion ##

You now have a PostgreSQL database running in a Docker container. This setup is ideal for development and testing environments.

## Security Considerations ##

1. Use a strong, unique password instead of 'mysecretpassword' in production environments.
2. Consider using Docker secrets or environment variables for sensitive information.
3. Limit network access to the PostgreSQL port (5432) in production setups.
4. Regularly update the PostgreSQL image to get the latest security patches.

## Troubleshooting ##

If you encounter issues:

1. Check Docker logs: `docker logs postgres-container`
2. Ensure the correct ports are exposed and not in use by other services.
3. Verify Docker is running and has sufficient resources allocated.

For more detailed information, refer to the official PostgreSQL Docker image documentation.
