# Utiliza una imagen base de OpenJDK para Java 17
FROM openjdk:17.0.1-jdk-slim

# Establece un directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo JAR de tu aplicación Spring Boot al contenedor
COPY backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto en el que se ejecutará la aplicación Spring Boot
EXPOSE 8080

# Comando para ejecutar la aplicación Spring Boot
CMD ["java", "-jar", "app.jar"]
