package com.examly.springapp.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Doctor;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DoctorRepository;

@Service
public class DoctorService {
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private UserService userService;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Doctor> searchDoctors(String specialization, String name) {
        List<Doctor> doctors = doctorRepository.findAll();
        
        if (specialization != null && !specialization.trim().isEmpty()) {
            doctors = doctors.stream()
                .filter(d -> d.getSpecialization().toLowerCase().contains(specialization.toLowerCase()))
                .collect(Collectors.toList());
        }
        
        if (name != null && !name.trim().isEmpty()) {
            doctors = doctors.stream()
                .filter(d -> d.getUser().getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
        }
        
        return doctors;
    }

    public Doctor getDoctorByEmail(String email) {
        User user = userService.findByEmail(email);
        return doctorRepository.findByUser(user)
            .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
    }

    public Doctor updateDoctorProfile(String email, Doctor doctorUpdate) {
        Doctor doctor = getDoctorByEmail(email);
        
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
        
        return doctorRepository.save(doctor);
    }

    public Doctor updateAvailability(String email, Map<String, String> availability) {
        Doctor doctor = getDoctorByEmail(email);
        doctor.setDailyAvailability(availability);
        return doctorRepository.save(doctor);
    }
}