# Mi Proyecto Full-Stack

_Descripción del Projecto:_

El proyecto muestra un catálogo de productos puestos en venta donde incluye dos vistas; una en la que se muestra una card por producto con una descripción del producto y una imagen del mismo, en el header tiene un panel de opciones donde puede filtrar por busqueda específica según el término y ordenarlos por alguna propiedad del producto o limitar la cantidad de productos a mostrar. En la segunda vista sale información detallada de un producto en específico que le interese al cliente, en la cual se busca llamar aún más su atención.

_Tegnologías utilizadas:_

    -> Frontend:
        - Framework Angular en su versión 20
        - Biblioteca Sweetalert2 para sistema de alertas
        - Lenguage de programación TypeScript en su versión 5.9.2

    -> Backend:
        - Node.js versión 22.19.0
        - Express versión 5.1.0
        - sequelize versión 6.37.7
        - pg versión 8.16.3
        - pg-hstore versión 2.3.4
        - cors versión 2.8.5
        - dotenv versión 17.2.2

    -> Base de datos:
        - PostgreSQL en Render (remota)

_IMPORTANTE OJO_

    -Sé que el test exijía Mongo o MySQL pero debido al bajo rendimiento de la máquina en la que se desarrolló la aplicación la mejor solución para ahorro de recursos fue utilizar una base de datos externa, por lo cual, utilicé servidor de render que utilizo usualmente pero exclusivamente PostgreSQL.

_Instrucciones de Setup y ejecución_

    -> 🚀Ejecución Rápida con Docker Compose:

        *Prerrequisitos
            - Docker instalado. 
            - Docker Compose instalado.

        *Pasos para ejecutar
            1.Clonar el repositorio
                - git clone <url-del-repositorio> - cd mi-proyecto

            2.Ejecutar con Docker Compose
                - docker-compose up.

            3.Verificar que los servicios estén corriendo
                -Frontend: http://localhost:4200
                -Backend: http://localhost:3000

            4.Detener los servicios
                - docker-compose down

    -> 🚀Terraform:

        **Prerrequisitos
            - Terraform instalado
            - Docker instalado

        *Pasos para ejecutar:
            1.Clonar el repositorio
                - git clone <url-del-repositorio>
                - cd mi-proyecto

            2.Inicializar Terraform:
                - terraform init

            3.Verificar el plan de ejecución:
                - terraform plan

            4.Aplicar la configuración:
                - terraform apply

            5.Ver el estado actual:
                - terraform show

            6.Destruir los recursos (cuando termines):
                - terraform destroy

_Endpoints de la API:_

    -> http://localhost:3000/api/productos?sort=''&orden=''&limit=''
        - Este endpoint es para obtener todos los productos y se emplea de manera opcional los filtros solicitados en el test de cantidad de productos, orden ascendente o descendente y la propiedad del producto por la que quieres ordenar.

        - Ejemplo de respuesta:
            *Status 200:
            {
                "data": [
                    {
                        "id": "72344a3f-2f41-4d59-855d-ca72f9f9d84b",
                        "nombre": "Yamaha 2025",
                        "descripcion": "Ligera y ágil, con motor de alta cilindrada y chasis de competición. Tecnología avanzada en suspensión y aerodinámica para dominar las curvas. Pura esencia racing en cada acelerón.",
                        "precio": 25000,
                        "stock": 100,
                        "img": "http://localhost:3000/images/moto.jpg"
                    },
                ]
            }

            *Status 500:
            {
                "data": "Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte."
            }

    -> http://localhost:3000/api/productos/search?termino=''&value=''
        - En este endpoint se realiza una búsqueda de los productos que incluyen el value en el termino buscado. Ejemplo: termino='nombre' value='laptop' devuelve todos los productos que en la propiedad nombre contienen el valor laptop.

        - Ejemplo de respuesta:
            *Status 200:
                {
                    "data": [
                        {
                            "id": "72344a3f-2f41-4d59-855d-ca72f9f9d84b",
                            "nombre": "Yamaha 2025",
                            "descripcion": "Ligera y ágil, con motor de alta cilindrada y chasis de competición. Tecnología avanzada en suspensión y aerodinámica para dominar las curvas. Pura esencia racing en cada acelerón.",
                            "precio": 25000,
                            "stock": 100,
                            "img": "http://localhost:3000/images/moto.jpg"
                        },
                    ]
                }

            *Status 500:
                {
                    "data": "Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte."
                }

            *Status 404:
                {
                    "data": "No hay coincidencias, intente con otro término."
                }

    -> http://localhost:3000/api/productos/:id
        - En este endpoint que recibe por el id de un producto específico y lo retorna en caso de existir en la base de datos.

        - Ejemplo de respuesta:
            *Status 200:
                {
                    "data": [
                        {
                            "id": "72344a3f-2f41-4d59-855d-ca72f9f9d84b",
                            "nombre": "Yamaha 2025",
                            "descripcion": "Ligera y ágil, con motor de alta cilindrada y chasis de competición. Tecnología avanzada en suspensión y aerodinámica para dominar las curvas. Pura esencia racing en cada acelerón.",
                            "precio": 25000,
                            "stock": 100,
                            "img": "http://localhost:3000/images/moto.jpg"
                        },
                    ]
                }

            *Status 500:
                {
                    "data": "Error al obtener el producto,inténtelo nuevamente. Si persiste el problema contacte con soporte."
                }

            *Status 404:
                {
                    "data": ""No se encontró el producto.""
                }

            *Status 400:
                {
                    "data": "ID de producto inválido."
                }

_Desiciones de Diseño_

    -> Angular: 
        - Se seleccionó Angular específicamente para cumplir con los requisitos técnicos del test, que explicitaban el uso de Angular Router y HttpClient. Aunque mi stack principal es React+Vite, prioricé la adherencia a los requerimientos sobre la familiaridad tecnológica, demostrando adaptabilidad. Angular ofrece una solución integrada y cohesiva para routing y HTTP client, reduciendo la dependencia de librerías externas y garantizando compatibilidad total.

        - Se implementó una estructura modular basada en Componentes, Pages y Services, adecuada para la escala del proyecto. Dado que la aplicación es estática y no contempla crecimiento futuro, se evitó una arquitectura más compleja (como domain-driven design o feature-based structure) para optimizar la simplicidad y tiempo de desarrollo. El layout unificado se gestiona desde el componente raíz, eliminando la necesidad de una carpeta de Layouts dedicada.

        - Se integró Sweetalert2 como solución de UI/UX para notificaciones, priorizando time-to-market y experiencia de usuario. La biblioteca ofrece componentes preconstruidos, responsividad y manejo nativo de promesas, simplificando la gestión de estados de error y confirmaciones.

    -> Node.js:
        - Se adoptó una variación del patrón MVC con separación clara de responsabilidades (Controllers, Database, Models, Routes). Dada la simplicidad del dominio (única entidad Producto), esta estructura lineal resulta suficiente y mantenible. Cada capa contiene un único archivo, reflejando la escala microscópica del proyecto sin introducir complejidad prematura.

    -> Express:
        - Express fue seleccionado por su minimalismo y enfoque pragmático. Se aprovecharon características clave como:
            *express.json() para parsing automático de payloads JSON
            *Servir archivos estáticos (express.static) para la carpeta de imágenes
            *Ecosistema de middleware para extensibilidad futura.
            *La decisión balancea productividad inmediata con capacidad de crecimiento controlado.

    -> Sequelize:
        - Se optó por Sequelize basado en su madurez, estabilidad y experiencia previa. Como ORM consolidado, ofrece ventajas como:
            *Migraciones y seeders integrados.
            *Validaciones a nivel de modelo.
            *Soporte para transacciones.
            *Compatibilidad con múltiples dialectos SQL.
            *Esto garantiza robustez en la capa de datos despite la simplicidad del proyecto.
    

_IMPORTANTE OJO_

    La computadora en la que se realizó este test no cumple con los requisitos mínimos para utilizar Docker por lo que el código generado para el despliegue no ha sido testeado ni probado. Espero su comprensión y muchas gracias por darme la oportunidad de formar parte del equipo.