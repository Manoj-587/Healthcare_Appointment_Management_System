package com.examly.springapp.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Name is mandatory")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;
    @Email(message = "Email should be valid")
    private String email;
    @Pattern(regexp = "\\d{10}", message = "Phone number should be 10 digits")
    private String phoneNumber;  
    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password; 
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

}
