package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Doctor;
import com.examly.springapp.model.User;
import java.util.Optional;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findByUser(User user);
    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);
} 
