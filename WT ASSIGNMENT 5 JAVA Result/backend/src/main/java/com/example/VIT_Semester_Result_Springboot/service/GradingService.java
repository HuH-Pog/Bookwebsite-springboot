package com.example.VIT_Semester_Result_Springboot.service;

import org.springframework.stereotype.Service;

/**
 * Centralized grading logic for the college.
 *
 * Kept in its own service (separate from ResultService) so that the
 * weightage system (currently MSE 30% + ESE 70%) and the grading table
 * can be changed in one place without touching the rest of the
 * application, as required by the project brief.
 */
@Service
public class GradingService {

    /**
     * Final Marks = MSE Marks + ESE Marks
     * (MSE is out of 30, ESE is out of 70, so the sum is already out of 100.
     * If the weightage system ever changes, update this method only.)
     */
    public int calculateFinalMarks(int mseMarks, int eseMarks) {
        return mseMarks + eseMarks;
    }

    /**
     * Maps final marks (out of 100) to a letter grade.
     */
    public String calculateGrade(int finalMarks) {
        if (finalMarks >= 90) return "O";
        if (finalMarks >= 80) return "A+";
        if (finalMarks >= 70) return "A";
        if (finalMarks >= 60) return "B+";
        if (finalMarks >= 50) return "B";
        if (finalMarks >= 40) return "C";
        return "F";
    }

    /**
     * Maps final marks (out of 100) to a grade point (0-10).
     */
    public int calculateGradePoint(int finalMarks) {
        if (finalMarks >= 90) return 10;
        if (finalMarks >= 80) return 9;
        if (finalMarks >= 70) return 8;
        if (finalMarks >= 60) return 7;
        if (finalMarks >= 50) return 6;
        if (finalMarks >= 40) return 5;
        return 0;
    }

    public boolean isPassingGrade(String grade) {
        return !"F".equals(grade);
    }
}
