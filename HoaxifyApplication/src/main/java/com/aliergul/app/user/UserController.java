package com.aliergul.app.user;



import com.aliergul.app.shared.GenericResponse;
import com.aliergul.app.user.pojo.UserVM;
import com.aliergul.app.user.pojo.UserUpdateVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
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

	// @CrossOrigin // 3000 portundan 7575 portuna json gönderdiğimiz için aldığımız
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
	public Page<UserVM> getUser(Pageable page, @CurrentUser UserEntity user ){
		 
		return userService.getUsers(page,user).map(UserVM::new);
	}
	
	@GetMapping("/users/{username}")
	public UserVM getSingleUser(@PathVariable String username) {
		UserEntity user=userService.getByUsername(username);
		return new UserVM(user);
	}
	/** ----------------------------------- UPDATE ------------------------------------- */
	//Çözüm II :
	@PutMapping("/users/{username}")
	@PreAuthorize("#username == principal.username")
	public UserVM updateUser(@Valid @RequestBody UserUpdateVM updateUser, @PathVariable String username, @CurrentUser UserEntity loggedInUser) {
		UserEntity user =userService.updateUser(username,updateUser);

		return new UserVM(user);


	}
	/*
	Çözüm I :
	@PutMapping("/users/{username}")
	public ResponseEntity<?> updateUser(@RequestBody UserUpdate updateUser, @PathVariable String username, @CurrentUser UserEntity loggedInUser) {
		//login olan kullanıcı ise güncelleme yapabilir.
		if(loggedInUser.getUsername().equals(username)){
			UserEntity user =userService.updateUser(username,updateUser);
			return ResponseEntity.ok(new UserPojo(user));
		}else{
			ApiError error=new ApiError(403,"Connot change another users data","/api/1.0/users"+username);
			return ResponseEntity.status(403).body(error);
		}


	}
*/
	/** ----------------------------------- // ------------------------------------- */
}
