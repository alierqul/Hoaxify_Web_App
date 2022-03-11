package com.aliergul.app;

import com.aliergul.app.user.UserEntity;
import com.aliergul.app.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HoaxifyApplication implements CommandLineRunner {
	@Autowired
	UserService service;

	public static void main(String[] args) {
		SpringApplication.run(HoaxifyApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		for(int i = 1; i<=25;i++) {
			UserEntity user = new UserEntity();
			user.setUsername("user"+i);
			user.setName("display"+i);
			user.setPassword("P4ssword");
			service.save(user);

		}
	}
}
