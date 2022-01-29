package com.aliergul.app.error;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.error.ErrorAttributeOptions.Include;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
public class ErrorHandler implements ErrorController {
  
  @Autowired
  private ErrorAttributes errorAttributes;
  
  private static final Logger log = LoggerFactory.getLogger(ErrorHandler.class);

  
  @RequestMapping("/error")  
  public ApiError handleError(WebRequest webRequest) {
    
    Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest
        ,ErrorAttributeOptions.of(Include.MESSAGE,Include.BINDING_ERRORS));
    String message =(String) attributes.get("message");
    String path =(String) attributes.get("path");
    int status =(int) attributes.get("status");
    ApiError err=new ApiError(status, message, path);
    
    Map<String,String> validationErrors=new HashMap<String, String>();
    
    if(attributes.get("errors")!=null) {
      @SuppressWarnings("unchecked")
      List<FieldError> errors=(List<FieldError>) attributes.get("errors");

      for(FieldError fieldError : errors) {
        validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
      }
      err.setValidationErrors(validationErrors);
    }
    log.warn(err.toString());
    return err;
    
  }
  
}
