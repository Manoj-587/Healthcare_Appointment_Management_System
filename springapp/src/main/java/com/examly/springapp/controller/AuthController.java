package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.PatientLogin;
import com.examly.springapp.exception.PatientInvalidCredentialException;
import com.examly.springapp.exception.PatientNotFoundException;
import com.examly.springapp.model.Patient;
import com.examly.springapp.service.PatientService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8081")
public class AuthController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/register/patient")
    public Patient registerPatient(@RequestBody Patient patient) {
        return patientService.registerPatient(patient);
    }

    @PostMapping("/login/patient")
    public ResponseEntity<?> loginPatient(@RequestBody PatientLogin patientLogin) {
        try {
            Patient patient = patientService.loginPatient(patientLogin);
            return ResponseEntity.ok(patient);
        } catch (PatientNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch(PatientInvalidCredentialException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
