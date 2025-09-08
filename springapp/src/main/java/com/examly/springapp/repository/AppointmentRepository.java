package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    long countByDoctorId(int id);

    boolean existsByPatientId(int id);

    
} 
