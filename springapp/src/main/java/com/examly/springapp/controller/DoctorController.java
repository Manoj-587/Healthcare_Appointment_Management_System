package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Doctor;
import com.examly.springapp.service.DoctorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public Doctor createDoctor(@Valid @RequestBody Doctor doctor) {
        return doctorService.createDoctor(doctor);
    }
    
    @GetMapping
    public List<Doctor> getDoctors() {
        return doctorService.getAllDoctors();
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable int id, @Valid @RequestBody Doctor doctor) {
        return doctorService.updateDoctorById(id, doctor);
    }

    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable int id) {
        doctorService.deleteDoctorById(id);
        return "Doctor with id " + id + " deleted successfully";
    }
}
