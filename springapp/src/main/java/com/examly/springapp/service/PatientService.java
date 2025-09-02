package com.examly.springapp.service;

import com.examly.springapp.model.Patient;
import com.examly.springapp.repository.PatientRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatient() {
        return patientRepository.findAll();
    }

    public Patient updatePatient(int id, Patient patient) {
        if(!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient with id " + id + " not found");
        }
        Patient existingPatient = patientRepository.findById(id).get();
        existingPatient.setName(patient.getName());
        existingPatient.setEmail(patient.getEmail());
        existingPatient.setDateOfBirth(patient.getDateOfBirth());
        existingPatient.setPhoneNumber(patient.getPhoneNumber());
        return patientRepository.save(existingPatient);
    }

    public String deletePatient(int id) {
        if(!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient with id " + id + " not found");
        }
        patientRepository.deleteById(id);
        return "Patient with id " + id + " deleted successfully";
    }
}
