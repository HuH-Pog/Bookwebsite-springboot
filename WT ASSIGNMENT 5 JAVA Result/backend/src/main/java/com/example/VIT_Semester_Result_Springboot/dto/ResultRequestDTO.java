package com.example.VIT_Semester_Result_Springboot.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public class ResultRequestDTO {

    @NotBlank(message = "Student name is required")
    private String studentName;

    @NotBlank(message = "PRN is required")
    private String prn;

    @NotBlank(message = "Branch is required")
    private String branch;

    @NotBlank(message = "Semester is required")
    private String semester;

    @NotBlank(message = "Academic year is required")
    private String academicYear;

    @NotEmpty(message = "Subjects are required")
    @Size(min = 4, max = 4, message = "Exactly 4 subjects are required")
    @Valid
    private List<SubjectRequestDTO> subjects;

    public ResultRequestDTO() {
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getPrn() {
        return prn;
    }

    public void setPrn(String prn) {
        this.prn = prn;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public List<SubjectRequestDTO> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectRequestDTO> subjects) {
        this.subjects = subjects;
    }
}
