package com.bookstore.exception;

import java.time.LocalDateTime;
import java.util.List;

public class ApiError {
    private boolean success = false;
    private String message;
    private int status;
    private LocalDateTime timestamp = LocalDateTime.now();
    private List<String> details;

    public ApiError() {
    }

    public ApiError(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public ApiError(String message, int status, List<String> details) {
        this.message = message;
        this.status = status;
        this.details = details;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }
}
