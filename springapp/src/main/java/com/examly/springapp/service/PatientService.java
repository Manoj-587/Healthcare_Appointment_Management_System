package com.examly.springapp.service;

import com.examly.springapp.model.Patient;
import com.examly.springapp.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient getPatientById(int id) {
        return patientRepository.findById(id).orElse(null);
    }
}
