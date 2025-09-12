package com.examly.springapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Doctor;
import com.examly.springapp.service.DoctorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> searchDoctors(
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String name) {
        List<Doctor> doctors = doctorService.searchDoctors(specialization, name);
        return ResponseEntity.ok(doctors);
    }
    
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/profile")
    public ResponseEntity<Doctor> getDoctorProfile(Authentication authentication) {
        try {
            String doctorEmail = authentication.getName();
            Doctor doctor = doctorService.getDoctorByEmail(doctorEmail);
            return ResponseEntity.ok(doctor);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<Doctor> updateDoctorProfile(@Valid @RequestBody Doctor doctorUpdate, 
            Authentication authentication) {
        try {
            String doctorEmail = authentication.getName();
            Doctor doctor = doctorService.updateDoctorProfile(doctorEmail, doctorUpdate);
            return ResponseEntity.ok(doctor);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/availability")
    public ResponseEntity<Doctor> updateAvailability(@RequestBody Map<String, String> availability, 
            Authentication authentication) {
        try {
            String doctorEmail = authentication.getName();
            Doctor doctor = doctorService.updateAvailability(doctorEmail, availability);
            return ResponseEntity.ok(doctor);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}