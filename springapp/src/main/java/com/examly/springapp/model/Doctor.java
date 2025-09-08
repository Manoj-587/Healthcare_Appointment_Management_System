package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;
    @NotBlank(message = "Specialization is mandatory")
    @Size(min = 3, max = 100, message = "Specialization must be between 3 and 100 characters")
    private String specialization;
    @Email(message = "Email should be valid")
    private String email;
    @Pattern(regexp = "\\d{10}", message = "Phone number should be 10 digits")
    private String phoneNumber;
    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
    @NotBlank(message = "Availability is mandatory")
    private String availability; // e.g., "Mon-Fri 9am-5pm"
    @NotBlank(message = "Qualifications are mandatory")
    private String qualifications;

}
