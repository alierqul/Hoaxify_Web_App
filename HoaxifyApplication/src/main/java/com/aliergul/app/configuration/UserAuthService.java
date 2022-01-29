package com.aliergul.app.configuration;

import com.aliergul.app.user.IUserRepository;
import com.aliergul.app.user.UserEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class UserAuthService implements UserDetailsService {
  
  final
  IUserRepository userRepository;

private static final Logger log = LoggerFactory.getLogger(UserAuthService.class);

  public UserAuthService(IUserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserEntity inDB= userRepository.findByUsername(username);
    if(inDB==null) {
      log.warn("Username Not Found");
      throw new UsernameNotFoundException("Username not found");
    }
    return inDB;
  }

 
}
