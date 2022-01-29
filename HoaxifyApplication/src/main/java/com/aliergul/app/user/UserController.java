package com.aliergul.app.user;


import com.aliergul.app.dao.user.pojo.UserUpdate;
import com.aliergul.app.shared.GenericResponse;
import com.aliergul.app.user.pojo.UserPojo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/1.0")
public class UserController {


	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	// @CrossOrigin // 3000 portundan 8080 portuna json gönderdiğimiz için aldığımız
	// hatayı bu
	// Annotation ile düzeltiyoruz.
	// proxy ile url ayarllarını düzelttiğimizde gerek kalmadı.

	// @Valid ile Springden Rica ediyoruz. Hibernate e sor bakalım user tablo için
	// geçerli bir nesne
	// mi?
	
	// @ResponseStatus(HttpStatus.CREATED) // Default 200 Ok dir. Burda bir create
	// işlemi yaptığımız için
	// 201 Created dönüyoruz.

	@PostMapping("/users")
	public GenericResponse createUser(@Valid  @RequestBody UserEntity user) {
		userService.save(user);		
		
		return new GenericResponse("user Created");

	}
	
	@GetMapping("/users")
	public Page<UserPojo> getUser(Pageable page, @CurrentUser UserEntity user ){
		 
		return userService.getUsers(page,user).map(UserPojo::new);
	}
	
	@GetMapping("/users/{username}")
	public UserPojo getSingleUser(@PathVariable String username) {
		UserEntity user=userService.getByUsername(username);
		return new UserPojo(user);
	}
	
	@PutMapping("/users/{username}")
	public UserPojo updateUser(@RequestBody UserUpdate updateUser, @PathVariable String username) {
		UserEntity user =userService.updateUser(username,updateUser);
		return new UserPojo(user);
	}

}
