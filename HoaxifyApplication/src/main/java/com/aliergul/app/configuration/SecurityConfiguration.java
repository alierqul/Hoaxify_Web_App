package com.aliergul.app.configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true )
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  
  @Autowired
  private UserAuthService userAuthService;
  
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.httpBasic();
    http.csrf().disable();// Browserdan üretilen bir token beklemediğini ifade eder
    //BasicAuthenticationEntryPoint.class;
    //Browser da herhangi bir pop-up login inin gelmesini engelleyen method.
    http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());

    //H2 console login olarak giriş yapabilmemizi sağlayan ayar
    http.headers().frameOptions().disable();

    http
    .authorizeHttpRequests()
            .antMatchers(HttpMethod.POST, "/api/1.0/auth").authenticated()
            .antMatchers(HttpMethod.PUT, "/api/1.0/users/{username}").authenticated()
            .antMatchers(HttpMethod.POST, "/api/1.0/hoaxes").authenticated()
            .antMatchers(HttpMethod.POST, "/api/1.0/hoax-attachments").authenticated()
    .and()
    .authorizeHttpRequests().anyRequest().permitAll();
    
    http
    .sessionManagement()
    .sessionCreationPolicy(SessionCreationPolicy.STATELESS); 
        
  }
  
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
  
  auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder());
  }
  
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
