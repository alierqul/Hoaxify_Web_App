package com.aliergul.app.hoax;

import com.aliergul.app.user.UserEntity;
import com.aliergul.app.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HoaxService {
    HoaxRepository hoaxRepository;
    UserService userService;
    public HoaxService(HoaxRepository hoaxRepository, UserService userService) {
        this.hoaxRepository = hoaxRepository;
        this.userService = userService;
    }


    public Hoax save(Hoax hoax, UserEntity user) {
        hoax.setUser(user);
        return hoaxRepository.save(hoax);
    }

    public Page<Hoax> getAllHoax(Pageable page){
        return hoaxRepository.findAll(page);
    }

    public Page<Hoax> getHoaxesByUser(String username, Pageable page) {
        UserEntity inDB=userService.getByUsername(username);
        return hoaxRepository.findByUser(inDB,page);
    }
}
