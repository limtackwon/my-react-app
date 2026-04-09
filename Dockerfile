# ── Build stage ──────────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# 의존성 캐시 레이어 (pom.xml이 바뀌지 않으면 재사용)
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline -q

# 소스 복사 (frontend 포함 – node_modules는 .dockerignore로 제외)
COPY src src
COPY frontend frontend

# frontend-maven-plugin이 Node 다운로드 후 React 빌드 → src/main/resources/static
# 이후 Spring Boot JAR 패키징
RUN ./mvnw package -DskipTests -q

# ── Run stage ─────────────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
