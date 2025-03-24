## MiauAuPlanner 🐾🐾

O **MiauAuPlanner** é uma aplicação web desenvolvida dentro da disciplina **Programação Web** na instituição **CATÓLICA DE SANTA CATARINA** para ajudar tutores a gerenciar os cuidados diários dos seus pets de forma prática e eficiente. 
Seja para cães, gatos ou outros pets, o MiauAuPlanner é o seu aliado para garantir que seu animal de estimação receba os melhores cuidados, sempre no momento certo. 🐶🐱

## Acadêmicos
- Graziela Torres
- Sophia Eggert Freire da Rocha

## Requisitos Funcionais

- **RF01: Cadastro e Autenticação de Usuários**  
  - Permitir o cadastro de usuários com informações básicas (nome, e-mail e senha).  
  - Incluir validação de e-mail e requisitos mínimos de segurança na senha.  
  - Disponibilizar login seguro e opção de recuperação de senha.

- **RF02: Gerenciamento de Pets**  
  - Cada usuário pode cadastrar múltiplos pets.  
  - Incluir cadastro dos pets com informações como nome, idade, espécie, raça (opcional) e características (peso, altura, observações).

- **RF03: Tabela/Lista de Tipos de Animais**  
  - Disponibilizar uma lista pré-definida de tipos de animais (ex.: cão, gato, pássaro) para facilitar a categorização.  
  - Permitir que essa lista seja gerenciada de forma estática ou via administração, conforme a necessidade.

- **RF04: Histórico de Cuidados dos Pets**  
  - Registrar o histórico de cuidados realizados, como banhos, consultas veterinárias e vacinas.  
  - Cada registro deve conter data, descrição do cuidado e observações, se necessário.

- **RF05: Edição e Exclusão de Cadastros**  
  - Permitir a edição e exclusão dos cadastros de usuários e pets, garantindo que as alterações sejam refletidas no histórico.

- **RF06: Criação de Lembretes**  
  - Permitir a criação de lembretes para eventos futuros (banhos, consultas e vacinas).  
  - Disponibilizar notificações via e-mail ou alertas internos, conforme configurado pelo usuário.

- **RF07: Registro Detalhado de Vacinas**  
  - Manter um registro detalhado das vacinas aplicadas, com data de aplicação, dose e data prevista para reforço (quando aplicável).

- **RF08: Dashboard e Visualização Resumida**  
  - Oferecer um dashboard onde o usuário possa visualizar um resumo das informações, como próximos lembretes, histórico recente e dados dos pets.

## Requisitos Não Funcionais

- **RNF01: Compatibilidade e Usabilidade**  
  - Ser compatível com os navegadores modernos (Chrome, Firefox, Edge e Safari).  
  - Ter uma interface responsiva para uso em dispositivos móveis e desktops.

- **RNF02: Performance e Escalabilidade**  
  - Suportar até 5 usuários simultâneos sem degradação de desempenho.  
  - As operações principais (login, cadastro, busca e atualização de dados) devem ter tempo de resposta inferior a 1 segundo em conexões padrão.

- **RNF03: Segurança e Privacidade**  
  - Armazenar os dados de forma segura, utilizando criptografia para senhas e conexões HTTPS para transmissão dos dados.  
  - Implementar medidas de segurança contra ataques comuns, como injeção de SQL e XSS.

- **RNF04: Manutenção e Atualizações**  
  - Utilizar ferramentas de versionamento e deploy automatizado.

## Arquitetura 

Clean Architecture + MVC + Arquitetura monolítica 
https://danvitoriano.medium.com/clean-architecture-a35688308e29

## Camadas principais:
 - Apresentação (Front-end - React.js): Lida com a UI/UX, consumindo a API via REST.
 - Aplicação (Back-end - Node.js + Express.js): Contém os casos de uso (regras de negócio) e manipulação de dados.
 - Domínio: Modelos de dados e entidades principais (Aluno, Aula, Professor).
 - Infraestrutura (MySQL, ORM - Prisma): Gestão do banco de dados e persistência.

## Tecnologias

## Back-end (Node.js)
 - Framework: Express.js
 - Banco de Dados: MySQL (ORM: Prisma)
 - Autenticação: JWT

## Front-end (React.js)
 - Biblioteca UI: https://ui.shadcn.com/
 - Gerenciamento de Estado: Context API
 - Comunicação com API: Axios
 - Autenticação: Context + JWT Storage (LocalStorage)


## Board de atividades
https://trello.com/invite/b/67bcf463ecf24beaec769b41/ATTI839176f597a349ef761a366be09729fe79957083/miauauplanner-desenvolviment



## Funcionalidades Principais

### 1. **Cadastro de Pets** 🐱
   - **Informações Básicas:** Nome, idade, raça, espécie (cachorro, gato, etc.), peso e foto.
   - **Detalhes Adicionais:** Opção para adicionar informações como alergias, condições médicas e preferências do pet.
   - **Multiplos Pets:** Cadastre vários pets em uma única conta.

### 2. **Agenda de Cuidados** 🐕
   - **Eventos Personalizados:** Cadastre eventos como vacinas, banhos, consultas veterinárias, aplicação de vermífugos, tosas, entre outros.
   - **Frequência de Eventos:** Defina eventos recorrentes (ex.: vacinas anuais ou banhos mensais).
   - **Calendário Integrado:** Visualize todos os cuidados agendados em um calendário intuitivo.

### 3. **Notificações e Alertas** 🐶📢
   - **Lembretes Automáticos:** Receba notificações no app ou por e-mail sobre eventos próximos (ex.: vacina da raiva em 3 dias).
   - **Personalização de Alertas:** Escolha o horário e a frequência dos lembretes.
   - **Notificações Urgentes:** Alertas para cuidados que não podem ser adiados (ex.: consulta marcada para amanhã).

### 4. **Histórico de Cuidados** 🐱🐶🐰💊💉
   - **Registro Completo:** Acompanhe todas as vacinas, consultas, banhos e outros cuidados já realizados.
   - **Visualização por Categoria:** Filtre o histórico por tipo de cuidado (ex.: apenas vacinas ou consultas).
   - **Exportação de Dados:** Opção para exportar o histórico em PDF ou CSV para compartilhar com veterinários.

### 5. **Anotações sobre Saúde do Pet**  🐱🐶🐰💊💉
   - **Diário de Saúde:** Adicione observações sobre o comportamento, alimentação ou mudanças na saúde do pet.
   - **Acompanhamento de Sintomas:** Registre sintomas ou condições para monitorar a evolução do pet.
   - **Anexos:** Adicione fotos, recibos de consultas ou exames veterinários.

## Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto em sua máquina:

1. **Clone o repositório**:
   git clone https://github.com/fifieggert/MiauAuPlanner.git
   cd MiauAuPlanner
