package com.example.VIT_Semester_Result_Springboot.service;

import com.example.VIT_Semester_Result_Springboot.dto.ResultRequestDTO;
import com.example.VIT_Semester_Result_Springboot.dto.ResultResponseDTO;
import com.example.VIT_Semester_Result_Springboot.dto.SubjectRequestDTO;
import com.example.VIT_Semester_Result_Springboot.dto.SubjectResultDTO;
import com.example.VIT_Semester_Result_Springboot.entity.Result;
import com.example.VIT_Semester_Result_Springboot.entity.Student;
import com.example.VIT_Semester_Result_Springboot.entity.SubjectResult;
import com.example.VIT_Semester_Result_Springboot.exception.ResourceNotFoundException;
import com.example.VIT_Semester_Result_Springboot.repository.ResultRepository;
import com.example.VIT_Semester_Result_Springboot.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

/**
 * All business logic for calculating and persisting a semester result
 * lives here, as required by the project brief - the Controller stays
 * thin and only receives/returns DTOs.
 */
@Service
public class ResultService {

    private final StudentRepository studentRepository;
    private final ResultRepository resultRepository;
    private final GradingService gradingService;

    public ResultService(StudentRepository studentRepository,
                          ResultRepository resultRepository,
                          GradingService gradingService) {
        this.studentRepository = studentRepository;
        this.resultRepository = resultRepository;
        this.gradingService = gradingService;
    }

    @Transactional
    public ResultResponseDTO createResult(ResultRequestDTO request) {

        // 1. Save student details
        Student student = new Student(
                request.getStudentName(),
                request.getPrn(),
                request.getBranch(),
                request.getSemester(),
                request.getAcademicYear()
        );
        studentRepository.save(student);

        // 2. Build the Result and each SubjectResult, calculating as we go
        Result result = new Result();
        result.setStudent(student);

        int totalCredits = 0;
        int totalMarks = 0;
        int weightedGradePointSum = 0; // sum(credit * gradePoint)
        boolean hasFailingSubject = false;

        for (SubjectRequestDTO subjectDto : request.getSubjects()) {
            int finalMarks = gradingService.calculateFinalMarks(subjectDto.getMse(), subjectDto.getEse());
            String grade = gradingService.calculateGrade(finalMarks);
            int gradePoint = gradingService.calculateGradePoint(finalMarks);

            if (!gradingService.isPassingGrade(grade)) {
                hasFailingSubject = true;
            }

            SubjectResult subjectResult = new SubjectResult();
            subjectResult.setSubjectCode(subjectDto.getSubjectCode());
            subjectResult.setSubjectName(subjectDto.getSubjectName());
            subjectResult.setCredits(subjectDto.getCredits());
            subjectResult.setMseMarks(subjectDto.getMse());
            subjectResult.setEseMarks(subjectDto.getEse());
            subjectResult.setFinalMarks(finalMarks);
            subjectResult.setGrade(grade);
            subjectResult.setGradePoint(gradePoint);

            result.addSubjectResult(subjectResult);

            totalCredits += subjectDto.getCredits();
            totalMarks += finalMarks;
            weightedGradePointSum += subjectDto.getCredits() * gradePoint;
        }

        // 3. Percentage = totalMarks / (numberOfSubjects * 100) * 100
        double percentage = round((totalMarks / (request.getSubjects().size() * 100.0)) * 100.0);

        // 4. CGPA = sum(credit * gradePoint) / sum(credits)
        double cgpa = totalCredits == 0 ? 0.0 : round(weightedGradePointSum / (double) totalCredits);

        String resultStatus = hasFailingSubject ? "FAIL" : "PASS";

        result.setTotalCredits(totalCredits);
        result.setTotalMarks(totalMarks);
        result.setPercentage(percentage);
        result.setCgpa(cgpa);
        result.setResultStatus(resultStatus);

        Result saved = resultRepository.save(result);

        return toResponseDto(saved);
    }

    @Transactional(readOnly = true)
    public ResultResponseDTO getResultById(Long id) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found with id: " + id));
        return toResponseDto(result);
    }

    @Transactional(readOnly = true)
    public List<ResultResponseDTO> getAllResults() {
        return resultRepository.findAll()
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    /** Rounds a value to 2 decimal places, as required for CGPA/percentage display. */
    private double round(double value) {
        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    private ResultResponseDTO toResponseDto(Result result) {
        ResultResponseDTO dto = new ResultResponseDTO();
        dto.setId(result.getId());
        dto.setStudentName(result.getStudent().getName());
        dto.setPrn(result.getStudent().getPrn());
        dto.setBranch(result.getStudent().getBranch());
        dto.setSemester(result.getStudent().getSemester());
        dto.setAcademicYear(result.getStudent().getAcademicYear());
        dto.setTotalCredits(result.getTotalCredits());
        dto.setTotalMarks(result.getTotalMarks());
        dto.setPercentage(result.getPercentage());
        dto.setCgpa(result.getCgpa());
        dto.setResultStatus(result.getResultStatus());
        dto.setCreatedAt(result.getCreatedAt());

        List<SubjectResultDTO> subjectDtos = result.getSubjectResults().stream()
                .map(sr -> new SubjectResultDTO(
                        sr.getSubjectCode(),
                        sr.getSubjectName(),
                        sr.getCredits(),
                        sr.getMseMarks(),
                        sr.getEseMarks(),
                        sr.getFinalMarks(),
                        sr.getGrade(),
                        sr.getGradePoint()
                ))
                .collect(Collectors.toList());
        dto.setSubjects(subjectDtos);

        return dto;
    }
}
