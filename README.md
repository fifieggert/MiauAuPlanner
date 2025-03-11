## MiauAuPlanner 🐾🐾

O **MiauAuPlanner** é uma aplicação web desenvolvida dentro da disciplina **Programação Web** na instituição **CATÓLICA DE SANTA CATARINA** para ajudar tutores a gerenciar os cuidados diários dos seus pets de forma prática e eficiente. 
Seja para cães, gatos ou outros pets, o MiauAuPlanner é o seu aliado para garantir que seu animal de estimação receba os melhores cuidados, sempre no momento certo. 🐶🐱

## Acadêmicos
- Graziela Torres
- Sophia Eggert Freire da Rocha

## Requisitos funcionais 

- RF01: O sistema deve ter um cadastro de usuários 
- RF02: O sistema deve permitir que cada usuário possa ter mais de um pet
- RF03: O sistema deve ter uma tabela de tipo de animais 
- RF04: O sistema deve ter um cadastro para pets
- RF05: O sistema deve ter um histórico de cuidados(banho, consulta, vacinas)
- RF06: O sistema deve permitir editar os cadastros
- RF07: O sistema deve criar lembretes com próximos eventos(banho, consulta, vacinas)
- RF08: O sistema deve manter um registro de vacinas

## Requisitos não funcionais 

- RNF01: O sistema deve rodar em linux
- RNF02: O sistema deve ser capaz de suportar 1.000 usuários simultâneos sem interferências 
- RNF03: O sistema deve ter um tempo de resposta de 0,5 segundos.

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
