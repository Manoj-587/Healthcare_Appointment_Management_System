package com.examly.springapp.controller;

import com.examly.springapp.model.Patient;
import com.examly.springapp.service.PatientService;

import jakarta.validation.Valid;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
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

}