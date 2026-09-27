package com.example.VIT_Semester_Result_Springboot.dto;

public class SubjectResultDTO {

    private String subjectCode;
    private String subjectName;
    private Integer credits;
    private Integer mseMarks;
    private Integer eseMarks;
    private Integer finalMarks;
    private String grade;
    private Integer gradePoint;

    public SubjectResultDTO() {
    }

    public SubjectResultDTO(String subjectCode, String subjectName, Integer credits,
                             Integer mseMarks, Integer eseMarks, Integer finalMarks,
                             String grade, Integer gradePoint) {
        this.subjectCode = subjectCode;
        this.subjectName = subjectName;
        this.credits = credits;
        this.mseMarks = mseMarks;
        this.eseMarks = eseMarks;
        this.finalMarks = finalMarks;
        this.grade = grade;
        this.gradePoint = gradePoint;
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
