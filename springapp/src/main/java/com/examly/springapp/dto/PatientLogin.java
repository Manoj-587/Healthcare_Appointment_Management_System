package com.examly.springapp.dto;

import lombok.Data;

@Data
public class PatientLogin {
    private String emailOrPhone;
    private String password;
}
