# Deploying a Next.js Project on Google Kubernetes Engine (GKE) #

This guide provides a comprehensive walkthrough on deploying a Next.js application on Google Kubernetes Engine (GKE). The process includes creating a containerized application using Docker,
uploading it to Google Container Registry (GCR), and deploying it to a Kubernetes cluster in GKE.

## Prerequisites ##

Before you begin, ensure that you have the following setup:

- A Google Cloud account.
- Google Cloud SDK installed and authenticated.
- Docker installed on your local machine.
- Basic knowledge of Kubernetes and Docker.

## Steps to Deploy ##

### 1. Create a Next.js Application ###

First, create a new Next.js application if you haven't already:

```bash
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
```

### 2. Dockerize the Application ###

Create a `Dockerfile` in the root directory of your Next.js project:

```dockerfile
# Use Node.js 14 LTS as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package definitions
COPY package*.json ./

# Install required dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the application for production
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### 3. Build the Docker Image ###

Build the Docker image with the following command:

```bash
docker build -t my-nextjs-app .
```

### 4. Push the Image to Google Container Registry (GCR) ###

First, tag the Docker image for Google's Container Registry:

```bash
docker tag my-nextjs-app gcr.io/[YOUR_PROJECT_ID]/my-nextjs-app
```

Then, push the tagged image to GCR:

```bash
docker push gcr.io/[YOUR_PROJECT_ID]/my-nextjs-app
```

### 5. Set up Google Kubernetes Engine (GKE) ###

Create a Kubernetes cluster through GKE:

```bash
gcloud container clusters create my-gke-cluster --num-nodes=3
```

Configure the `kubectl` command-line access to the cluster:

```bash
gcloud container clusters get-credentials my-gke-cluster
```

### 6. Deploy the Next.js Application on GKE ###

Create a Kubernetes deployment configuration file named `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nextjs-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-nextjs-app
  template:
    metadata:
      labels:
        app: my-nextjs-app
    spec:
      containers:
      - name: my-nextjs-app
        image: gcr.io/[YOUR_PROJECT_ID]/my-nextjs-app
        ports:
        - containerPort: 3000
```

Deploy it with the command:

```bash
kubectl apply -f deployment.yaml
```

### 7. Expose the Application with a LoadBalancer ###

Create a `service.yaml` to define a LoadBalancer service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nextjs-service
spec:
  type: LoadBalancer
  selector:
    app: my-nextjs-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
```

Apply the service file:

```bash
kubectl apply -f service.yaml
```

### 8. Access Your Application ###

Retrieve the external IP address of the service to access your application:

```bash
kubectl get svc my-nextjs-service
```

Once the external IP is assigned, open your web browser and go to `http://<EXTERNAL_IP>`.

## Conclusion ##

Congratulations! You have successfully deployed a Next.js application on Google Kubernetes Engine. This guide has covered the essentials for containerizing your application, deploying it on GKE,
and making it accessible online. For a production-ready deployment, consider advanced configurations such as auto-scaling, SSL/TLS for security, and continuous integration/continuous deployment
(CI/CD) setups.
