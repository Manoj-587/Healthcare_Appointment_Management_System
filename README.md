# Healthcare Appointment Management System

A comprehensive web application for managing healthcare appointments with role-based access control for Patients, Doctors, and Administrators.

## Features

### User Authentication & Role Management (FR1)
- Secure JWT-based authentication
- Role-based access control (PATIENT, DOCTOR, ADMIN)
- Secure login and registration
- Session management with automatic logout

### Patient Features (FR3, FR5, FR7, FR8)
- Patient registration with email validation
- Personal dashboard with appointment history
- Doctor search and filtering by specialization
- Appointment booking with date/time selection
- Appointment status tracking (PENDING, APPROVED, REJECTED, etc.)
- Appointment cancellation

### Doctor Features (FR2, FR6, FR9)
- Doctor profile management
- Appointment request management (approve/reject)
- Schedule and availability management
- View upcoming appointments
- Patient appointment history

### Admin Features (FR2, FR10)
- Comprehensive admin dashboard
- Doctor profile creation and management
- System statistics and reporting
- Appointment overview and management
- User management

### Additional Features (FR11, FR12)
- Responsive design for all devices
- Real-time appointment status updates
- Profile management for all user types
- Comprehensive error handling

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.4.0
- **Security**: Spring Security with JWT
- **Database**: MySQL 8.0
- **ORM**: JPA/Hibernate
- **Validation**: Bean Validation
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS3 with responsive design

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Installation & Setup

### 1. Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE healthcare_management_system;
```

2. Run the database initialization script:
```bash
mysql -u root -p healthcare_management_system < database-init.sql
```

### 2. Backend Setup

1. Navigate to the Spring Boot application directory:
```bash
cd springapp
```

2. Update database configuration in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/healthcare_management_system
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the React application directory:
```bash
cd reactapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Default Login Credentials

### Admin
- **Email**: admin@healthcare.com
- **Password**: password

### Doctor (Sample)
- **Email**: john.smith@healthcare.com
- **Password**: password

### Patient (Sample)
- **Email**: patient@example.com
- **Password**: password

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Patient registration

### Patient Endpoints
- `GET /api/patient/profile` - Get patient profile
- `PUT /api/patient/profile` - Update patient profile
- `POST /api/appointments/patient/book` - Book appointment
- `GET /api/appointments/patient/my-appointments` - Get patient appointments

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/search` - Search doctors
- `GET /api/doctors/profile` - Get doctor profile
- `PUT /api/doctors/profile` - Update doctor profile
- `PUT /api/doctors/availability` - Update availability
- `GET /api/appointments/doctor/my-appointments` - Get doctor appointments
- `PUT /api/appointments/doctor/{id}/approve` - Approve appointment
- `PUT /api/appointments/doctor/{id}/reject` - Reject appointment

### Admin Endpoints
- `POST /api/admin/doctors` - Create doctor
- `GET /api/admin/doctors` - Get all doctors
- `PUT /api/admin/doctors/{id}` - Update doctor
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/appointments` - Get all appointments

## Project Structure

```
HealthcareAppointmentManagementSystem/
├── springapp/                          # Spring Boot Backend
│   ├── src/main/java/com/examly/springapp/
│   │   ├── config/                     # Security & App Configuration
│   │   ├── controller/                 # REST Controllers
│   │   ├── dto/                        # Data Transfer Objects
│   │   ├── model/                      # JPA Entities
│   │   ├── repository/                 # JPA Repositories
│   │   ├── security/                   # JWT Security Components
│   │   └── service/                    # Business Logic Services
│   └── src/main/resources/
│       └── application.properties      # App Configuration
├── reactapp/                           # React Frontend
│   ├── src/
│   │   ├── components/                 # React Components
│   │   ├── contexts/                   # React Contexts
│   │   └── utils/                      # Utility Functions
│   └── public/                         # Static Assets
├── database-init.sql                   # Database Schema & Sample Data
└── README.md                          # Project Documentation
```

## Security Features

- JWT token-based authentication
- Password encryption using BCrypt
- Role-based access control
- CORS configuration for cross-origin requests
- Input validation and sanitization
- SQL injection prevention through JPA

## Testing

### Backend Testing
```bash
cd springapp
mvn test
```

### Frontend Testing
```bash
cd reactapp
npm test
```

## Production Deployment

### Backend
1. Build the JAR file:
```bash
mvn clean package
```

2. Run the JAR file:
```bash
java -jar target/springapp-0.0.1-SNAPSHOT.jar
```

### Frontend
1. Build the production bundle:
```bash
npm run build
```

2. Serve the build folder using a web server like Nginx or Apache.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.