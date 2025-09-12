-- Create admin user with password "password"
USE healthcare_management_system;

-- Insert admin user (password is "password" encoded with BCrypt)
INSERT INTO users (name, email, password, role) VALUES 
('System Admin', 'admin@healthcare.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN')
ON DUPLICATE KEY UPDATE 
password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

-- Get the user ID for the admin
SET @admin_user_id = (SELECT id FROM users WHERE email = 'admin@healthcare.com');

-- Insert admin record
INSERT INTO admins (user_id, department) VALUES 
(@admin_user_id, 'System Administration')
ON DUPLICATE KEY UPDATE 
department = 'System Administration';