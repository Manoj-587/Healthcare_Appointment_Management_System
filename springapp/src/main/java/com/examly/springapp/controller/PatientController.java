package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Patient;
import com.examly.springapp.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/profile")
    public ResponseEntity<Patient> getPatientProfile(Authentication authentication) {
        try {
            String patientEmail = authentication.getName();
            Patient patient = patientService.getPatientByEmail(patientEmail);
            return ResponseEntity.ok(patient);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<Patient> updatePatientProfile(@Valid @RequestBody Patient patientUpdate, 
            Authentication authentication) {
        try {
            String patientEmail = authentication.getName();
            Patient patient = patientService.updatePatientProfile(patientEmail, patientUpdate);
            return ResponseEntity.ok(patient);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}