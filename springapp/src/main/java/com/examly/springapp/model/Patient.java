package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "patients")
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")   // maps to column "id"
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

   
    @Column(name = "email", nullable = false, unique = true)
    private String email;

   
    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

   
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

}
