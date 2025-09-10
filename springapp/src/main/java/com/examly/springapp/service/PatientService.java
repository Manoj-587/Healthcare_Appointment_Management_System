package com.examly.springapp.service;

import com.examly.springapp.dto.PatientLogin;
import com.examly.springapp.exception.PatientInvalidCredentialException;
import com.examly.springapp.exception.PatientNotFoundException;
import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Patient;
import com.examly.springapp.repository.AppointmentRepository;
import com.examly.springapp.repository.PatientRepository;
// import com.examly.springapp.config.AppConfig;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;
    // @Autowired
    // private PasswordEncoder passwordEncoder;
    
    public Patient createPatient(Patient patient) {
        // patient.setPassword(passwordEncoder.encode(patient.getPassword()));
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
        if(appointmentRepository.existsByPatientId(id)) {
            throw new RuntimeException("Cannot delete patient with id " + id + " as there are existing appointments associated.");
        }
        patientRepository.deleteById(id);
        return "Patient with id " + id + " deleted successfully";
    }
    
    //register patient
    public Patient registerPatient(Patient patient) {
        // patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        if(patientRepository.existsByEmail(patient.getEmail())) {
            throw new RuntimeException("Patient with email " + patient.getEmail() + " already exists");
        }
        if(patientRepository.existsByPhoneNumber(patient.getPhoneNumber())) {
            throw new RuntimeException("Patient with phone number " + patient.getPhoneNumber() + " already exists");
        }
        return patientRepository.save(patient);
    }
    
    //login patient
    public Patient loginPatient(PatientLogin patientLogin) throws PatientNotFoundException, PatientInvalidCredentialException {
        Patient patient;
        if(patientRepository.existsByEmail(patientLogin.getEmailOrPhone())) {
            patient = patientRepository.findByEmail(patientLogin.getEmailOrPhone());
        } else if(patientRepository.existsByPhoneNumber(patientLogin.getEmailOrPhone())) {
            patient = patientRepository.findByPhoneNumber(patientLogin.getEmailOrPhone());
        } else {
            throw new PatientNotFoundException("Patient with given email or phone number does not exist");
        }
        
        if(!patient.getPassword().equals(patientLogin.getPassword())) {
            throw new PatientInvalidCredentialException("Invalid password");
        }
        return patient;
    }
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    public List<Appointment> getAppointmentsByPatientId(int patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }
}
