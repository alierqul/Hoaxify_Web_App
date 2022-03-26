package com.aliergul.app.auth;

import com.aliergul.app.user.CurrentUser;
import com.aliergul.app.user.UserEntity;
import com.aliergul.app.user.pojo.UserVM;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class AuthController {

	// required = false parametrenin verilmesinin zorlunlu olduğunu ifade eder
	// değişken
	@PostMapping("/api/1.0/auth")
	public UserVM handleAuthentication(@CurrentUser UserEntity user) {

		return new UserVM(user);
	}

}
