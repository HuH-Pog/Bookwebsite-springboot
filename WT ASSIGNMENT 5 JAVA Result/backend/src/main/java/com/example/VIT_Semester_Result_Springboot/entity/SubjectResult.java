package com.example.VIT_Semester_Result_Springboot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subject_results")
public class SubjectResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id", nullable = false)
    private Result result;

    @Column(name = "subject_code", nullable = false)
    private String subjectCode;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(nullable = false)
    private Integer credits;

    @Column(name = "mse_marks", nullable = false)
    private Integer mseMarks;

    @Column(name = "ese_marks", nullable = false)
    private Integer eseMarks;

    @Column(name = "final_marks", nullable = false)
    private Integer finalMarks;

    @Column(nullable = false)
    private String grade;

    @Column(name = "grade_point", nullable = false)
    private Integer gradePoint;

    public SubjectResult() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
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

    public Integer getMseMarks() {
        return mseMarks;
    }

    public void setMseMarks(Integer mseMarks) {
        this.mseMarks = mseMarks;
    }

    public Integer getEseMarks() {
        return eseMarks;
    }

    public void setEseMarks(Integer eseMarks) {
        this.eseMarks = eseMarks;
    }

    public Integer getFinalMarks() {
        return finalMarks;
    }

    public void setFinalMarks(Integer finalMarks) {
        this.finalMarks = finalMarks;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Integer getGradePoint() {
        return gradePoint;
    }

    public void setGradePoint(Integer gradePoint) {
        this.gradePoint = gradePoint;
    }
}
