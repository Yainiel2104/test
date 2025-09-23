# terraform/outputs.tf
output "frontend_url" {
  description = "URL del frontend"
  value       = "http://localhost:${var.frontend_port}"
}

output "backend_url" {
  description = "URL del backend"
  value       = "http://localhost:${var.backend_port}"
}

output "network_name" {
  description = "Nombre de la red Docker creada"
  value       = docker_network.app_network.name
}