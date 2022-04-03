package com.aliergul.app.shared;

import com.aliergul.app.file.FileService;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.Base64;
import java.util.stream.Collectors;

public class FileTypeValidator implements ConstraintValidator<FileType,String> {
    @Autowired
    FileService fileService;

    String[] types;

    @Override
    public void initialize(FileType constraintAnnotation) {
        this.types=constraintAnnotation.types();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value==null || value.isEmpty()) return true;
        String fileType=fileService.detectType(Base64.getDecoder().decode(value));
        for(String type: this.types){
            if(fileType.equalsIgnoreCase("image/"+type)){
                return true;
            }
        }

        String supportedTypes = Arrays.stream(this.types).collect(Collectors.joining(", "));
        HibernateConstraintValidatorContext hibernateConstraintValidatorContext = context.unwrap(HibernateConstraintValidatorContext.class);
        hibernateConstraintValidatorContext.addMessageParameter("types",supportedTypes);
        hibernateConstraintValidatorContext.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate()).addConstraintViolation();
        return false;
    }
}
