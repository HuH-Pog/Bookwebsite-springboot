package com.example.VIT_Semester_Result_Springboot.controller;

import com.example.VIT_Semester_Result_Springboot.dto.ResultRequestDTO;
import com.example.VIT_Semester_Result_Springboot.dto.ResultResponseDTO;
import com.example.VIT_Semester_Result_Springboot.service.ResultService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    // POST /api/results  -> calculates and saves a new semester result
    @PostMapping
    public ResponseEntity<ResultResponseDTO> createResult(@Valid @RequestBody ResultRequestDTO request) {
        ResultResponseDTO response = resultService.createResult(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET /api/results/{id} -> fetch a single saved result
    @GetMapping("/{id}")
    public ResponseEntity<ResultResponseDTO> getResult(@PathVariable Long id) {
        return ResponseEntity.ok(resultService.getResultById(id));
    }

    // GET /api/results -> fetch all saved results
    @GetMapping
    public ResponseEntity<List<ResultResponseDTO>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }
}
