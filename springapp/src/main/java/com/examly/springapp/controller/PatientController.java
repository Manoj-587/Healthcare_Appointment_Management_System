package com.examly.springapp.controller;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Patient;
import com.examly.springapp.service.PatientService;

import jakarta.validation.Valid;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:8081")
public class PatientController {

    @Autowired
    private PatientService patientService;

    //crud operations
    @PostMapping
    public Patient createPatient(@Valid @RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }
    @GetMapping
    public List<Patient> getPatients() {
        return patientService.getAllPatient();
    }
    @PutMapping("{id}")
    public Patient updatePatient(@PathVariable int id ,@Valid @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }
    @DeleteMapping("{id}")
    public String deletePatient(@PathVariable int id) {
        patientService.deletePatient(id);
        return "Patient with id " + id + " deleted successfully";
    }


    @GetMapping("{id}")
    public ResponseEntity<?> getPatientAppointments(@PathVariable int id) {
        List<Appointment> appointments = patientService.getAppointmentsByPatientId(id);
        return ResponseEntity.ok(appointments);
    }
}