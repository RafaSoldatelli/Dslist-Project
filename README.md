# Ds List
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/devsuperior/sds1-wmazoni/blob/master/LICENSE) 

# Sobre o projeto

Ds List é uma aplicação Back-end construída durante uma edição da **Semana DevSuperior** (#sds1), evento organizado pela [DevSuperior](https://devsuperior.com "Site da DevSuperior").

A aplicação consiste em uma pesquisa de preferência de games, onde os dados são coletados no banco de dados, e depois são listados no app web.

## Modelo conceitual
![Modelo de domínio DSList](https://raw.githubusercontent.com/devsuperior/java-spring-dslist/main/resources/dslist-model.png)

# Tecnologias utilizadas
## Back end
- Java
- Spring Boot
- JPA / Hibernate
- Maven
## Front end
- HTML
- CSS
- JavaScript

# Como utilizar(local)
- baixar projeto
  - alterar o arquivo application.properties em resources
  - alterar spring.profiles.active=${APP_PROFILE:prod} para spring.profiles.active=${APP_PROFILE:test}
  - com a alteração será configurado o ambiente local para execução
  - buscar por http://localhost:8080/index.html

# Autor
Rafael Soldatelli da Rosa

https://www.linkedin.com/in/rafasoldatelli
