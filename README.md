# API Design Study Repository 🚀

Welcome to the **API Design Study Repository**! This project is a hands-on exploration of API design patterns, covering **REST API**, **GraphQL**, and **gRPC** implementations across four popular frameworks: **Node.js**, **Golang**, **Symfony**, and **Spring Boot**. 

---

## 📂 Project Structure

```
api-design-study/
├── README.md
├── rest-api/
│   ├── nodejs/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── app.js
│   ├── golang/
│   │   ├── go.mod
│   │   ├── main.go
│   │   ├── handlers/
│   │   └── routes/
│   ├── symfony/
│   │   ├── composer.json
│   │   └── src/
│   │       ├── Controller/
│   │       ├── Entity/
│   │       └── config/
│   └── spring-boot/
│       ├── pom.xml
│       └── src/
│           ├── main/
│           │   ├── java/# API Design Study Repository

This repository is dedicated to studying and implementing different types of API design patterns: REST API, GraphQL, and gRPC. It includes implementations across four frameworks: **Node.js**, **Golang**, **Symfony**, and **Spring Boot**.

## Project Structure

```
api-design-study/
├── README.md
├── rest-api/
│   ├── nodejs/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── app.js
│   ├── golang/
│   │   ├── go.mod
│   │   ├── main.go
│   │   ├── handlers/
│   │   └── routes/
│   ├── symfony/
│   │   ├── composer.json
│   │   └── src/
│   │       ├── Controller/
│   │       ├── Entity/
│   │       └── config/
│   └── spring-boot/
│       ├── pom.xml
│       └── src/
│           ├── main/
│           │   ├── java/
│           │   │   ├── controllers/
│           │   │   ├── services/
│           │   │   └── Application.java
├── graphql/
│   ├── nodejs/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── resolvers/
│   │   │   └── schema/
│   │   └── app.js
│   ├── golang/
│   │   ├── go.mod
│   │   ├── main.go
│   │   ├── resolvers/
│   │   └── schema/
│   ├── symfony/
│   │   ├── composer.json
│   │   └── src/
│   │       ├── GraphQL/
│   │       ├── Entity/
│   │       └── config/
│   └── spring-boot/
│       ├── pom.xml
│       └── src/
│           ├── main/
│           │   ├── java/
│           │   │   ├── resolvers/
│           │   │   └── schema/
├── grpc/
│   ├── nodejs/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── proto/
│   │   │   ├── server.js
│   │   │   └── client.js
│   ├── golang/
│   │   ├── go.mod
│   │   ├── proto/
│   │   ├── server/
│   │   └── client/
│   ├── symfony/
│   │   ├── composer.json
│   │   └── src/
│   │       ├── GRPC/
│   │       ├── Entity/
│   │       └── config/
│   └── spring-boot/
│       ├── pom.xml
│       └── src/
│           ├── main/
│           │   ├── java/
│           │   │   ├── grpc/
│           │   │   ├── server/
│           │   │   └── client/
└── docs/
    ├── REST-API.md
    ├── GraphQL.md
    ├── gRPC.md
    └── framework-comparisons.md
```

## Features
- **REST API**: Study and implement REST API endpoints using HTTP methods, request/response handling, and best practices.
- **GraphQL**: Implement GraphQL schemas, resolvers, and queries for efficient data retrieval.
- **gRPC**: Explore protocol buffers (Protobuf) and gRPC server-client architecture.

## Frameworks Covered
- **Node.js**: JavaScript runtime for server-side applications.
- **Golang**: Fast and efficient programming language for APIs.
- **Symfony**: PHP framework with structured and reusable components.
- **Spring Boot**: Java-based framework for microservices and APIs.

## Getting Started

### Prerequisites
Ensure you have the following tools installed:
- Node.js
- Go
- PHP
- Java (with Maven)
- Docker (for containerized services, optional)

### Setup
Clone the repository:
```bash
git clone https://github.com/JawherKl/api-design-study.git
```

Navigate to a specific API type and framework to start working:
```bash
cd api-design-study/rest-api/nodejs
```

Install dependencies and start the server:
```bash
npm install
npm start
```

## Documentation
- [REST API Design](docs/REST-API.md)
- [GraphQL API Design](docs/GraphQL.md)
- [gRPC API Design](docs/gRPC.md)
- [Framework Comparisons](docs/framework-comparisons.md)

## Contribution
Feel free to fork this repository, raise issues, or submit pull requests to enhance the repository.

│           │   │   ├── controllers/
│           │   │   ├── services/
│           │   │   └── Application.java
├── graphql/
│   ├── nodejs/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── resolvers/
│   │   │   └── schema/
│   │   └── app.js
│   ├── golang/
│   │   ├── go.mod
│   │   ├── main.go
│   │   ├── resolvers/
│   │   └── schema/
│   ├── symfony/
│   │   ├── composer.json
│   │   └── src/
│   │       ├── GraphQL/
│   │       ├── Entity/
│   │       └── config/
│   └── spring-boot/
│       ├── pom.xml
│       └── src/
│           ├── main/
│           │   ├── java/
│           │   │   ├── resolvers/
│           │   │   └── schema/
├── grpc/
│   ├── nodejs/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── proto/
│   │   │   ├── server.js
│   │   │   └── client.js
│   ├── golang/
│   │   ├── go.mod
│   │   ├── proto/
│   │   ├── server/
│   │   └── client/
│   ├── symfony/
│   │   ├── composer.json
│   │   └── src/
│   │       ├── GRPC/
│   │       ├── Entity/
│   │       └── config/
│   └── spring-boot/
│       ├── pom.xml
│       └── src/
│           ├── main/
│           │   ├── java/
│           │   │   ├── grpc/
│           │   │   ├── server/
│           │   │   └── client/
└── docs/
    ├── REST-API.md
    ├── GraphQL.md
    ├── gRPC.md
    └── framework-comparisons.md
```

---

## ✨ Features

- **REST API**: Comprehensive study of HTTP methods, request/response handling, and best practices.
- **GraphQL**: Efficient data retrieval with GraphQL schemas, resolvers, and queries.
- **gRPC**: Implementation of Protobuf-based gRPC server-client communication.

---

## 🌐 Frameworks Covered

- **Node.js**: JavaScript runtime for building scalable APIs.
- **Golang**: Lightweight and fast language for robust API services.
- **Symfony**: PHP framework with structured components and rich tools.
- **Spring Boot**: Java-based framework tailored for microservices and enterprise APIs.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**
- **Go**
- **PHP**
- **Java** (with Maven)
- **Docker** (for optional containerized services)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JawherKl/api-design-study.git
   ```

2. Navigate to a specific API type and framework:
   ```bash
   cd api-design-study/rest-api/nodejs
   ```

3. Install dependencies and start the server:
   ```bash
   npm install
   npm start
   ```

---

## 📚 Documentation

- [REST API Design](docs/REST-API.md)
- [GraphQL API Design](docs/GraphQL.md)
- [gRPC API Design](docs/gRPC.md)
- [Framework Comparisons](docs/framework-comparisons.md)

---

## 🤝 Contribution

We welcome contributions! Feel free to:
- Fork this repository
- Raise issues
- Submit pull requests to enhance the repository

---

### 🌟 Happy Learning and Building! 🌟
