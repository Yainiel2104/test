# terraform/variables.tf
variable "db_url" {
  description = "URL de la base de datos de Render"
  type        = string
  sensitive   = true  # Marca esta variable como sensible
}

variable "url_front" {
  description = "URL del frontend"
  type        = string
  default     = "http://localhost:4200"
}

variable "node_env" {
  description = "Entorno de Node.js"
  type        = string
  default     = "development"
}

# Variables para los puertos (personalizables)
variable "frontend_port" {
  description = "Puerto para el frontend"
  type        = number
  default     = 4200
}

variable "backend_port" {
  description = "Puerto para el backend"
  type        = number
  default     = 3000
}