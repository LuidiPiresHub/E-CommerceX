# E-CommerceX 🛒

## Descrição:

**E-CommerceX** é uma loja virtual fictícia desenvolvida para demonstrar minhas habilidades como programador fullstack. Inspirado em grandes lojas como Mercado Livre e outras plataformas de tecnologia, este projeto combina estudos técnicos e experiência prática para criar um e-commerce funcional e moderno.

Criar uma loja virtual sempre foi um dos meus principais objetivos. Após concluir minha formação como programador fullstack, decidi transformar essa ideia em realidade com o E-CommerceX, dedicando um ano ao planejamento e desenvolvimento. Este foi o projeto em que mais me dediquei, utilizando 100% do meu conhecimento para construir uma aplicação robusta.

O E-CommerceX é um projeto fictício criado como um exercício de estudo e demonstração de habilidades. Embora seja um exemplo completo de e-commerce, ele não é uma loja real. Utilizei lojas renomadas como inspiração, mas desenvolvi tudo do zero, sem templates ou tutoriais prontos.

Este projeto representa uma importante experiência profissional e um grande desafio pessoal, abrangendo todas as etapas necessárias para construir um e-commerce completo e funcional.

### [Acesse a Demonstração  do E-CommerceX](https://luidi-pires-ecommerce.vercel.app)

<br>

<details>
  <summary>⚙️ Instalação</summary>
  
  ## 🚨 Requisitos:
  ### ⚠️ É necessário ter o [Node.js](https://nodejs.org/) versão 20 ou superior instalado em seu sistema. ⚠️

  ## 1. Clone o repositório:
  ```bash
    git clone git@github.com:LuidiPiresHub/E-CommerceX.git
    cd E-CommerceX
  ```

  ## 2. Instale as dependências:
  ```bash
    cd frontend && npm install && cd ../backend && npm install && cd ..
  ```

  ## Configuração do ambiente (.env):

  - Crie um arquivo **.env** nas pastas frontend e backend seguindo o padrão do arquivo **.env.example** disponível em cada uma das pastas.
  
<br>

</details>

<details>
  <summary>🛠️ Utilização</summary>
  
  ### ⚙️ Backend:
   - Abra um terminal e navegue para a pasta do backend:
     ```bash
     cd backend
     ```

   - Gere os artefatos do Prisma (necessário apenas se houver mudanças no schema ou na primeira vez que for rodar o projeto):
     ```bash
     npx prisma generate
     ```

   - Inicie o servidor backend:
     ```bash
     npm run dev
     ```

  ### 🖥️ Frontend:
   - Abra um **novo terminal** e navegue para a pasta do frontend:
     ```bash
     cd frontend
     ```

   - Inicie o servidor frontend:
     ```bash
     npm run dev
     ```

  ### Acesso:
  #### Abra o navegador e acesse o endereço `http://localhost:3000` para visualizar a aplicação localmente.

<br>

</details>

<details>
  <summary>🖥️ Tecnologias Utilizadas</summary>
  
  ### 🖥️ Frontend:
  - **Framework:** [React](https://reactjs.org/)
  - **Ferramentas e Bibliotecas:**
    - [Vite](https://vitejs.dev/) - Ferramenta de construção e desenvolvimento.
    - [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript que adiciona tipagem estática.
    - [Formik](https://formik.org/) - Biblioteca para gerenciamento de formulários.
    - [React Router DOM](https://reactrouter.com/) - Biblioteca para roteamento em aplicativos React.
    - [React Toastify](https://fkhadra.github.io/react-toastify/) - Biblioteca para exibir notificações toast.
    - [React Confetti](https://www.npmjs.com/package/react-confetti) - Biblioteca para animações de confetes.
    - [Axios](https://axios-http.com/) - Cliente HTTP para fazer requisições.
    - [Lodash](https://lodash.com/) - Biblioteca de utilitários JavaScript.
    - [Date-fns](https://date-fns.org/) - Biblioteca para manipulação de datas.
    - [SweetAlert2](https://sweetalert2.github.io/) - Biblioteca para criar alertas bonitos.
    - [React Loader Spinner](https://www.npmjs.com/package/react-loader-spinner) - Biblioteca para spinners de carregamento.
    - [React Paginate](https://www.npmjs.com/package/react-paginate) - Biblioteca para paginação de componentes React.
    - [React Icons](https://react-icons.github.io/react-icons/) - Biblioteca de ícones para React.
    - [React Input Mask](https://www.npmjs.com/package/react-input-mask) - Biblioteca para mascarar entradas.

  ### ⚙️ Backend:
  - **Framework e Ferramentas:**
    - [Express](https://expressjs.com/) - Framework de servidor web para Node.js.
    - [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript que adiciona tipagem estática.
    - [Prisma](https://www.prisma.io/) - ORM para Node.js e TypeScript.
    - [tsx](https://www.npmjs.com/package/tsx) - Ferramenta para executar código TypeScript diretamente.
  - **Bibliotecas e Utilitários:**
    - [bcrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca para hashing de senhas.
    - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Biblioteca para gerar e verificar JSON Web Tokens (JWT).
    - [dotenv](https://www.npmjs.com/package/dotenv) - Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.
    - [cloudinary](https://cloudinary.com/) - Plataforma para gerenciamento de imagens e vídeos.
    - [stripe](https://stripe.com/docs/api) - Biblioteca para integração com o Stripe para pagamentos.
    - [yup](https://github.com/jquense/yup) - Biblioteca para validação de esquemas.
    - [cors](https://www.npmjs.com/package/cors) - Middleware para habilitar CORS (Cross-Origin Resource Sharing).
    - [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Middleware para parsing de cookies.
    - [multer](https://www.npmjs.com/package/multer) - Middleware para gerenciamento de uploads de arquivos.
    - [express-async-errors](https://www.npmjs.com/package/express-async-errors) - Middleware para lidar com erros assíncronos no Express.

<br>

</details>

<details>
  <summary>✨ Funcionalidades</summary>
  <br>

  - **Página Inicial (`/`):**
    - Exibe uma lista de produtos disponíveis..
    - Pesquisa de produtos por nome e filtro por categorias.
    - Navegação para os detalhes do produto e acesso ao carrinho de compras.

  - **Detalhes do Produto (`/product/:id`):**
    - Exibição de informações detalhadas sobre um produto específico, incluindo imagem, descrição e preço.
    - Adição de produtos ao carrinho de compras.
    - Navegação para a tela de checkout.

  - **Carrinho de Compras (`/cart`):**
    - Visualização dos itens adicionados ao carrinho.
    - Edição da quantidade de produtos e remoção de itens.
    - Cálculo do total da compra.
    - Navegação para o checkout.

  - **Login (`/login`):**
    - Formulário de login para autenticação de usuários.
    - Validação das credenciais.
    - Redirecionamento para a página anterior ou para a página inicial após o login.

  - **Registro (`/register`):**
    - Formulário de registro para novos usuários.
    - Validação dos dados e criação de uma nova conta.
    - Redirecionamento para a página inicial após o registro.

  - **Favoritos (`/favorites`):**
    - Visualização de produtos adicionados aos favoritos pelo usuário.
    - Adição e remoção de produtos da lista de favoritos.

  - **Perfil (`/profile`):**
    - Exibição e edição das informações do perfil do usuário.
    - Upload de foto de perfil e atualização de dados pessoais.

  - **Histórico de Compras (`/purchases`):**
    - Visualização de compras anteriores do usuário.
    - Detalhes dos pedidos, incluindo a data da compra.
    - Redirecionamento para os detalhes do produto comprado, se necessário.

  - **Página Não Encontrada (`*`):**
    - Exibição de uma mensagem de erro para rotas não definidas.
    - Navegação para a página inicial.

</details>

<br>

**Nota:** Este projeto foi desenvolvido para fins de estudo, demonstração e como experiência profissional. Ele reflete a aplicação prática dos conhecimentos adquiridos e serve como exemplo do trabalho realizado, mas não deve ser considerado uma solução pronta para ambientes de produção. Para uso em produção, recomenda-se a implementação de práticas de segurança adicionais e validações mais robustas.

---

> Feito com 💙 por [Luídi Pires](https://github.com/LuidiPiresHub)