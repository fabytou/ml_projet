pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // 🔑 Crédential Jenkins pour DockerHub
        DOCKERHUB_USERNAME = "${DOCKERHUB_CREDENTIALS_USR}"
        DOCKERHUB_PASSWORD = "${DOCKERHUB_CREDENTIALS_PSW}"
        REGISTRY = "docker.io"
        DOCKER_REPO = "fabytou" // ⚠️ Remplace par ton username DockerHub
        IMAGE_BACKEND = "ml-backend"
        IMAGE_FRONTEND = "ml-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Clonage du dépôt Git...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Construction des images backend et frontend...'
                sh """
                docker build -t $REGISTRY/$DOCKER_REPO/$IMAGE_BACKEND:latest ./backend
                docker build -t $REGISTRY/$DOCKER_REPO/$IMAGE_FRONTEND:latest ./frontend
                """
            }
        }

        stage('Push Docker Images') {
            steps {
                echo '📤 Envoi des images sur DockerHub...'
                sh """
                echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                docker push $REGISTRY/$DOCKER_REPO/$IMAGE_BACKEND:latest
                docker push $REGISTRY/$DOCKER_REPO/$IMAGE_FRONTEND:latest
                docker logout
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '🚀 Déploiement sur le cluster Kubernetes...'
                sh """
                kubectl apply -f manifests/mysql/
                kubectl apply -f manifests/backend/
                kubectl apply -f manifests/frontend/
                """
            }
        }
    }

    post {
        success {
            echo '✅ Déploiement terminé avec succès !'
        }
        failure {
            echo '❌ Échec du pipeline, vérifiez les logs.'
        }
    }
}

