package com.example.VIT_Semester_Result_Springboot.dto;

import jakarta.validation.constraints.*;

public class SubjectRequestDTO {

    @NotBlank(message = "Subject code is required")
    private String subjectCode;

    @NotBlank(message = "Subject name is required")
    private String subjectName;

    @NotNull(message = "Credits are required")
    @Positive(message = "Credits must be a positive number")
    private Integer credits;

    @NotNull(message = "MSE marks are required")
    @Min(value = 0, message = "MSE marks cannot be less than 0")
    @Max(value = 30, message = "MSE marks cannot exceed 30")
    private Integer mse;

    @NotNull(message = "ESE marks are required")
    @Min(value = 0, message = "ESE marks cannot be less than 0")
    @Max(value = 70, message = "ESE marks cannot exceed 70")
    private Integer ese;

    public SubjectRequestDTO() {
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public Integer getMse() {
        return mse;
    }

    public void setMse(Integer mse) {
        this.mse = mse;
    }

    public Integer getEse() {
        return ese;
    }

    public void setEse(Integer ese) {
        this.ese = ese;
    }
}
