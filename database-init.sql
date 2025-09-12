-- Healthcare Appointment Management System Database Initialization

-- Create database
CREATE DATABASE IF NOT EXISTS healthcare_management_system;
USE healthcare_management_system;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('PATIENT', 'DOCTOR', 'ADMIN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    phone_number VARCHAR(10),
    date_of_birth DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    qualifications VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10),
    clinic_name VARCHAR(100),
    contact_info TEXT,
    daily_availability JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason TEXT,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Insert default admin user
INSERT INTO users (name, email, password, role) VALUES 
('System Admin', 'admin@healthcare.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN');

INSERT INTO admins (user_id, department) VALUES 
(1, 'System Administration');

-- Insert sample doctors
INSERT INTO users (name, email, password, role) VALUES 
('Dr. John Smith', 'john.smith@healthcare.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'DOCTOR'),
('Dr. Sarah Johnson', 'sarah.johnson@healthcare.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'DOCTOR'),
('Dr. Michael Brown', 'michael.brown@healthcare.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'DOCTOR');

INSERT INTO doctors (user_id, specialization, qualifications, phone_number, clinic_name, contact_info, daily_availability) VALUES 
(2, 'Cardiology', 'MBBS, MD Cardiology', '9876543210', 'Heart Care Clinic', 'Specialist in heart diseases', '{"MONDAY":"09:00-12:00,14:00-17:00","TUESDAY":"09:00-12:00,14:00-17:00","WEDNESDAY":"09:00-12:00","THURSDAY":"09:00-12:00,14:00-17:00","FRIDAY":"09:00-12:00,14:00-17:00"}'),
(3, 'Dermatology', 'MBBS, MD Dermatology', '9876543211', 'Skin Care Center', 'Expert in skin conditions', '{"MONDAY":"10:00-13:00,15:00-18:00","TUESDAY":"10:00-13:00,15:00-18:00","WEDNESDAY":"10:00-13:00","THURSDAY":"10:00-13:00,15:00-18:00","FRIDAY":"10:00-13:00"}'),
(4, 'Orthopedics', 'MBBS, MS Orthopedics', '9876543212', 'Bone & Joint Clinic', 'Specialist in bone and joint problems', '{"MONDAY":"08:00-12:00,14:00-18:00","TUESDAY":"08:00-12:00,14:00-18:00","WEDNESDAY":"08:00-12:00","THURSDAY":"08:00-12:00,14:00-18:00","FRIDAY":"08:00-12:00,14:00-18:00","SATURDAY":"08:00-12:00"}');

-- Insert sample patient
INSERT INTO users (name, email, password, role) VALUES 
('John Doe', 'patient@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'PATIENT');

INSERT INTO patients (user_id, phone_number, date_of_birth, address) VALUES 
(5, '9876543213', '1990-01-15', '123 Main Street, City, State');

-- Create indexes for better performance
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);