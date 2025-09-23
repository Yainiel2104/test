# Meu Projeto Full-Stack

_Descrição do Projeto:_

O projeto mostra um catálogo de produtos colocados à venda que inclui duas visualizações; uma na qual se mostra um card por produto com uma descrição do produto e uma imagem do mesmo, no header há um painel de opções onde pode filtrar por busca específica segundo o termo e ordená-los por alguma propriedade do produto ou limitar a quantidade de produtos a mostrar. Na segunda visualização aparece informação detalhada de um produto em específico que interesse ao cliente, na qual se busca chamar ainda mais a sua atenção.

_Tecnologias utilizadas:_

    -> Frontend:
        - Framework Angular na sua versão 20
        - Biblioteca Sweetalert2 para sistema de alertas
        - Linguagem de programação TypeScript na sua versão 5.9.2

    -> Backend:
        - Node.js versão 22.19.0
        - Express versão 5.1.0
        - sequelize versão 6.37.7
        - pg versão 8.16.3
        - pg-hstore versão 2.3.4
        - cors versão 2.8.5
        - dotenv versão 17.2.2

    -> Base de dados:
        - PostgreSQL no Render (remota)

_IMPORTANTE OJO_

    -Sei que o teste pedia Mongo ou MySQL mas devido ao baixo rendimento da máquina na qual a aplicação foi desenvolvida a melhor solução para economia de recursos foi utilizar uma base de dados externa, por isso, utilizei servidor do Render que uso usualmente mas exclusivamente PostgreSQL.

_Instruções de Setup e execução_

    -> 🚀Execução Rápida com Docker Compose:

        *Pré-requisitos
            - Docker instalado. 
            - Docker Compose instalado.

        *Passos para executar
            1.Clonar o repositório
                - git clone <url-do-repositorio> - cd mi-proyecto

            2.Executar com Docker Compose
                - docker-compose up.

            3.Verificar que os serviços estejam rodando
                -Frontend: http://localhost:4200
                -Backend: http://localhost:3000

            4.Parar os serviços
                - docker-compose down

    -> 🚀Terraform:

        **Pré-requisitos
            - Terraform instalado
            - Docker instalado

        *Passos para executar:
            1.Clonar o repositório
                - git clone <url-do-repositorio>
                - cd mi-proyecto

            2.Inicializar o Terraform:
                - terraform init

            3.Verificar o plano de execução:
                - terraform plan

            4.Aplicar a configuração:
                - terraform apply

            5.Ver o estado atual:
                - terraform show

            6.Destruir os recursos (quando terminar):
                - terraform destroy

_Endpoints da API:_

    -> http://localhost:3000/api/productos?sort=''&orden=''&limit=''
        - Este endpoint é para obter todos os produtos e emprega de maneira opcional os filtros solicitados no teste de quantidade de produtos, ordem ascendente ou descendente e a propriedade do produto pela qual quer ordenar.

        - Exemplo de resposta:
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
        - Neste endpoint realiza-se uma busca dos produtos que incluem o value no termo buscado. Exemplo: termino='nombre' value='laptop' devolve todos os produtos que na propriedade nome contêm o valor laptop.

        - Exemplo de resposta:
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
        - Este endpoint recebe o id de um produto específico e retorna-o caso exista na base de dados.

        - Exemplo de resposta:
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

_Decisões de Design_

    -> Angular: 
        - Selecionou-se Angular especificamente para cumprir com os requisitos técnicos do teste, que explicitavam o uso de Angular Router e HttpClient. Ainda que meu stack principal é React+Vite, priorizei a aderência aos requerimentos sobre a familiaridade tecnológica, demonstrando adaptabilidade. Angular oferece uma solução integrada e coesa para routing e HTTP client, reduzindo a dependência de librerías externas e garantindo compatibilidade total.

        - Implementou-se uma estrutura modular baseada em Componentes, Pages e Services, adequada para a escala do projeto. Dado que a aplicação é estática e não contempla crescimento futuro, evitou-se uma arquitetura mais complexa (como domain-driven design ou feature-based structure) para otimizar a simplicidade e tempo de desenvolvimento. O layout unificado é gerido a partir do componente raiz, eliminando a necessidade de uma pasta de Layouts dedicada.

        - Integrou-se Sweetalert2 como solução de UI/UX para notificações, priorizando time-to-market e experiência do usuário. A biblioteca oferece componentes pré-construídos, responsividade e manejo nativo de promessas, simplificando a gestão de estados de erro e confirmações.

    -> Node.js:
        - Adotou-se uma variação do padrão MVC com separação clara de responsabilidades (Controllers, Database, Models, Routes). Dada a simplicidade do domínio (única entidade Producto), esta estrutura linear é suficiente e mantível. Cada camada contém um único arquivo, refletindo a escala microscópica do projeto sem introduzir complexidade prematura.

    -> Express:
        - Express foi selecionado pelo seu minimalismo e enfoque pragmático. Aproveitaram-se características chave como:
            *express.json() para parsing automático de payloads JSON
            *Servir archivos estáticos (express.static) para a pasta de imagens
            *Ecossistema de middleware para extensibilidade futura.
            *A decisão balanceia produtividade imediata com capacidade de crescimento controlado.

    -> Sequelize:
        - Optou-se por Sequelize baseado na sua maturidade, estabilidade e experiência prévia. Como ORM consolidado, oferece vantagens como:
            *Migrações e seeders integrados.
            *Validações a nível de modelo.
            *Suporte para transações.
            *Compatibilidade com múltiplos dialetos SQL.
            *Isto garante robustez na camada de dados apesar da simplicidade do projeto.
    

_IMPORTANTE OJO_

    O computador no qual se realizou este teste não cumpre com os requisitos mínimos para utilizar Docker por isso o código gerado para o despliegue não foi testado nem provado. Espero a sua compreensão e muito obrigado por me dar a oportunidade de fazer parte da equipa.