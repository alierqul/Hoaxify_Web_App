package com.aliergul.app;

import com.aliergul.app.hoax.Hoax;
import com.aliergul.app.hoax.HoaxService;
import com.aliergul.app.hoax.vm.HoaxSubmitVM;
import com.aliergul.app.user.CurrentUser;
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
	@Autowired
	HoaxService hoaxService;



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
			int a= (int) (Math.random()*25);
			for(int J=1;J<=a;J++){
				HoaxSubmitVM hoax=new HoaxSubmitVM();
				hoax.setContent("Hoax: [ "+J+" ] from user [ "+i+" ]");
				hoaxService.save(hoax, user);
			}
		}

	}
}
