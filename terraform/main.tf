# terraform/main.tf
# 1. Crear la red Docker (equivalente a app-network en docker-compose)
resource "docker_network" "app_network" {
  name   = "app-network"
  driver = "bridge"
}

# 2. Construir la imagen del backend
resource "docker_image" "backend_image" {
  name = "backend-app"
  build {
    context = "../server"
    dockerfile = "Dockerfile"
  }
  
  # Fuerza la reconstrucción si cambian los archivos del backend
  triggers = {
    dir_sha1 = sha1(join("", [for f in fileset("../server", "**") : filesha1("../server/${f}")]))
  }
}

# 3. Construir la imagen del frontend
resource "docker_image" "frontend_image" {
  name = "frontend-app"
  build {
    context = "../fronted"  # Nota: ajusté el nombre según tu descripción inicial
    dockerfile = "Dockerfile"
  }
  
  triggers = {
    dir_sha1 = sha1(join("", [for f in fileset("../fronted", "**") : filesha1("../fronted/${f}")]))
  }
}

# 4. Crear el contenedor del backend
resource "docker_container" "backend" {
  name  = "backend-container"
  image = docker_image.backend_image.image_id
  
  ports {
    internal = 3000
    external = var.backend_port
  }
  
  env = [
    "NODE_ENV=${var.node_env}",
    "DB_URL=${var.db_url}",
    "URL_FRONT=${var.url_front}"
  ]
  
  networks_advanced {
    name = docker_network.app_network.name
  }
  
  # Esperar a que el backend esté listo antes de iniciar el frontend
  healthcheck {
    test     = ["CMD", "curl", "-f", "http://localhost:3000/health"]  # Ajusta según tu endpoint de health check
    interval = "10s"
    timeout  = "5s"
    retries  = 3
    start_period = "10s"
  }
}

# 5. Crear el contenedor del frontend
resource "docker_container" "frontend" {
  name  = "frontend-container"
  image = docker_image.frontend_image.image_id
  
  ports {
    internal = 4200
    external = var.frontend_port
  }
  
  env = ["NODE_ENV=production"]
  
  networks_advanced {
    name = docker_network.app_network.name
  }
  
  # Depende del backend y espera a que esté saludable
  depends_on = [
    docker_container.backend
  ]
}