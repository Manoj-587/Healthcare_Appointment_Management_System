package com.examly.springapp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.RegisterRequest;
import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Doctor;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.AppointmentRepository;
import com.examly.springapp.repository.DoctorRepository;
import com.examly.springapp.repository.PatientRepository;
import com.examly.springapp.repository.UserRepository;

@Service
public class AdminService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Doctor createDoctor(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.DOCTOR);
        user = userRepository.save(user);
        
        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setSpecialization("General Medicine"); // Default specialization
        doctor.setQualifications("MBBS"); // Default qualification
        
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor updateDoctor(Integer doctorId, Doctor doctorUpdate) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
        
        if (doctorUpdate.getSpecialization() != null) {
            doctor.setSpecialization(doctorUpdate.getSpecialization());
        }
        if (doctorUpdate.getQualifications() != null) {
            doctor.setQualifications(doctorUpdate.getQualifications());
        }
        if (doctorUpdate.getPhoneNumber() != null) {
            doctor.setPhoneNumber(doctorUpdate.getPhoneNumber());
        }
        if (doctorUpdate.getClinicName() != null) {
            doctor.setClinicName(doctorUpdate.getClinicName());
        }
        if (doctorUpdate.getContactInfo() != null) {
            doctor.setContactInfo(doctorUpdate.getContactInfo());
        }
        if (doctorUpdate.getDailyAvailability() != null) {
            doctor.setDailyAvailability(doctorUpdate.getDailyAvailability());
        }
        
        return doctorRepository.save(doctor);
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalDoctors = doctorRepository.count();
        long totalPatients = patientRepository.count();
        long totalAppointments = appointmentRepository.count();
        
        long pendingAppointments = appointmentRepository.countByStatus(Appointment.Status.PENDING);
        long approvedAppointments = appointmentRepository.countByStatus(Appointment.Status.APPROVED);
        long rejectedAppointments = appointmentRepository.countByStatus(Appointment.Status.REJECTED);
        long completedAppointments = appointmentRepository.countByStatus(Appointment.Status.COMPLETED);
        long cancelledAppointments = appointmentRepository.countByStatus(Appointment.Status.CANCELLED);
        
        stats.put("totalDoctors", totalDoctors);
        stats.put("totalPatients", totalPatients);
        stats.put("totalAppointments", totalAppointments);
        stats.put("pendingAppointments", pendingAppointments);
        stats.put("approvedAppointments", approvedAppointments);
        stats.put("rejectedAppointments", rejectedAppointments);
        stats.put("completedAppointments", completedAppointments);
        stats.put("cancelledAppointments", cancelledAppointments);
        
        return stats;
    }
}