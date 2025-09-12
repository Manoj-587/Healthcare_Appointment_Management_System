package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Patient;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private UserService userService;

    public Patient getPatientByEmail(String email) {
        User user = userService.findByEmail(email);
        return patientRepository.findByUser(user)
            .orElseThrow(() -> new RuntimeException("Patient profile not found"));
    }

    public Patient updatePatientProfile(String email, Patient patientUpdate) {
        Patient patient = getPatientByEmail(email);
        
        if (patientUpdate.getPhoneNumber() != null) {
            patient.setPhoneNumber(patientUpdate.getPhoneNumber());
        }
        if (patientUpdate.getDateOfBirth() != null) {
            patient.setDateOfBirth(patientUpdate.getDateOfBirth());
        }
        if (patientUpdate.getAddress() != null) {
            patient.setAddress(patientUpdate.getAddress());
        }
        
        return patientRepository.save(patient);
    }
}