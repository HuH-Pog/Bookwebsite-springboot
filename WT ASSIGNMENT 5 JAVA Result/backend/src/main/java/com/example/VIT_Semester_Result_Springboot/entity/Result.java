package com.example.VIT_Semester_Result_Springboot.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "total_credits", nullable = false)
    private Integer totalCredits;

    @Column(name = "total_marks", nullable = false)
    private Integer totalMarks;

    @Column(nullable = false)
    private Double percentage;

    @Column(nullable = false)
    private Double cgpa;

    @Column(name = "result_status", nullable = false)
    private String resultStatus;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<SubjectResult> subjectResults = new ArrayList<>();

    public Result() {
        this.createdAt = LocalDateTime.now();
    }

    public void addSubjectResult(SubjectResult subjectResult) {
        subjectResult.setResult(this);
        this.subjectResults.add(subjectResult);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Integer getTotalCredits() {
        return totalCredits;
    }

    public void setTotalCredits(Integer totalCredits) {
        this.totalCredits = totalCredits;
    }

    public Integer getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(Integer totalMarks) {
        this.totalMarks = totalMarks;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public String getResultStatus() {
        return resultStatus;
    }

    public void setResultStatus(String resultStatus) {
        this.resultStatus = resultStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<SubjectResult> getSubjectResults() {
        return subjectResults;
    }

    public void setSubjectResults(List<SubjectResult> subjectResults) {
        this.subjectResults = subjectResults;
    }
}
