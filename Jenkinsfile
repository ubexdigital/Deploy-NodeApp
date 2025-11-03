pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "syedadeel"  // Replace with Docker Hub or private registry
        APP_NAME = "nodejs-app"
        SWARM_MANAGER = "192.168.1.11"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'c804b9d7-5c10-4739-a82b-1697ca196f06',
                    url: 'https://github.com/ubexdigital/Deploy-NodeApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_REGISTRY}/${APP_NAME}:latest ."
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
                    sh "docker push ${DOCKER_REGISTRY}/${APP_NAME}:latest"
                }
            }
        }

        stage('Deploy to Docker Swarm') {
            steps {
                script {
                    sh """
                    docker -H ${SWARM_MANAGER}:2375 stack deploy \
                    -c docker-compose.yml ${APP_NAME}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}
