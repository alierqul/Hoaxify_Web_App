package com.aliergul.app.user;

import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import org.springframework.security.core.annotation.AuthenticationPrincipal;


/**
 * public ResponseEntity<?> handleAuthentication(Authentication autoAuthentication) yerine parametre olarak direk user i vericez
 * @author alier
 *
 */
@Retention(RUNTIME)
@Target(PARAMETER)
@AuthenticationPrincipal
public @interface CurrentUser {

}
