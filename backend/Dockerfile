# ============================
# 1️⃣ Build Stage
# ============================
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy full project (pom + src)
COPY . .

# Build only — avoid "go-offline"
RUN mvn -q -e -DskipTests clean package

# ============================
# 2️⃣ Runtime Stage
# ============================
FROM eclipse-temurin:21-jre-alpine AS runtime

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
