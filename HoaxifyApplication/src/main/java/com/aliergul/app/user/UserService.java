package com.aliergul.app.user;


import com.aliergul.app.error.NotFoundException;
import com.aliergul.app.user.pojo.UserUpdate;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@Log4j2
public class UserService {

  private final IUserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }



  public void save(UserEntity user) {
	  log.info(user);
    user.setPassword(this.passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);
  }



public Page<UserEntity> getUsers( Pageable page, UserEntity user) {

	return user==null ?
			userRepository.findAll(page):
			userRepository.findByUsernameNot(user.getUsername(), page);
}




public UserEntity getByUsername(String username) {
	UserEntity inDB=userRepository.findByUsername(username);
	if(inDB==null) {
		throw new NotFoundException();
	}
	return inDB;
}



public UserEntity updateUser(String username, UserUpdate updateUser) {
	UserEntity inDB=getByUsername(username);
	inDB.setName(updateUser.getName());
	return userRepository.save(inDB);
}


}
