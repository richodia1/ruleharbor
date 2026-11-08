package io.ruleharbor.shared;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiErrors {
    @ExceptionHandler(ObjectOptimisticLockingFailureException.class)
    ProblemDetail stale() {
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "This record changed. Refresh it before saving again.");
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    ProblemDetail duplicate() {
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "This request conflicts with an existing record. Retry with the original request key.");
    }
}
