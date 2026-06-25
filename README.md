# ORPHANAGE MANAGEMENT SYSTEM — JAVA Full Stack Web Application

## Project Structure

```text
QUICK-NOETHER/
├── frontend/          # React + Vite frontend
│   └── src/
│       ├── api/
│       ├── components/
│       └── pages/
│
└── backend/           # Spring Boot Java API backend
    └── src/
        └── main/
            ├── java/
            └── resources/
```

Built output:

```text
frontend/dist/
```

Generate production build:

```bash
npm run build
```

## FRONTEND SETUP

```bash
cd frontend
npm install
npm run dev
```

## JAVA BACKEND SETUP

```bash
cd backend
mvn spring-boot:run
```

Backend Details:

- Spring Boot
- Java 17
- Port: 8080

API Base URL:

<http://localhost:8080/api>

## MONGODB SETUP

Create a MongoDB database:

MongoDB Atlas

Get your connection string and add the MongoDB config to:

`backend/src/main/resources/application.properties`

Example:

```properties
spring.data.mongodb.uri=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/orphanage?retryWrites=true&w=majority
spring.mongodb.uri=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/orphanage?retryWrites=true&w=majority
```

## ENVIRONMENT VARIABLES

Location:

`backend/src/main/resources/application.properties`

```properties
server.port=8080
jwt.secret=YOUR_SECRET_KEY
jwt.expiration=36000000
# Reduce verbose MongoDB driver logging
logging.level.org.mongodb.driver=WARN
```

## TECH STACK

Frontend:

- React
- Vite
- Tailwind CSS
- Axios

Backend:

- Spring Boot
- Java 17
- MongoDB
- Spring Security (JWT)

## FEATURES

- Centralized Admin Dashboard
- Complete Orphan Management (Records & Details)
- Staff & Volunteer Management
- Donation Tracking & Financial Expenses
- Adoption Request Processing
- Role-Based Access (Admin/Donor)
- JWT Authentication
- Full Stack Architecture
