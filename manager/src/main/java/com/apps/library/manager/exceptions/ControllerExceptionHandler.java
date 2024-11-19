package com.apps.library.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleRoleNotFoundException(RoleNotFoundException exc){
        Map<String, Object> errors = new HashMap<>();
        errors.put("error", exc.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleSQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException exc){
        Map<String, Object> errors = new HashMap<>();
        if(exc.getMessage().contains("Duplicate entry")){
            errors.put("error", "Email address already registered.");
        }

        return new ResponseEntity<>(errors, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(AuthorizationHeaderNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleAuthorizationHeaderNotFoundException(AuthorizationHeaderNotFoundException exc){
        Map<String, Object> errors = new HashMap<>();
        errors.put("error", exc.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
    }
}
