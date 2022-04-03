package com.aliergul.app.user;


import com.aliergul.app.error.NotFoundException;
import com.aliergul.app.file.FileService;
import com.aliergul.app.user.pojo.UserUpdateVM;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@Log4j2
@RequiredArgsConstructor
public class UserService {

  private final IUserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final FileService fileService;





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



public UserEntity updateUser(String username, UserUpdateVM updateUser) {
	UserEntity inDB=getByUsername(username);
	inDB.setName(updateUser.getName());

	if(updateUser.getImage()!=null){
		String oldImageName= inDB.getImage();
		try {
			String storedFileName = fileService.writeBase64EncodedStringToFile(updateUser.getImage());
			inDB.setImage(storedFileName);
		} catch (IOException e) {
			e.printStackTrace();
		}
		fileService.deleteProfileFile(oldImageName);
	}
	return userRepository.save(inDB);
}




}
