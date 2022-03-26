package com.aliergul.app.hoax;

import com.aliergul.app.hoax.vm.HoaxVM;
import com.aliergul.app.shared.GenericResponse;
import com.aliergul.app.user.CurrentUser;
import com.aliergul.app.user.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {
    HoaxService service;

    public HoaxController(HoaxService service) {
        this.service = service;
    }

    @PostMapping("/hoaxes")
    GenericResponse saveHoax(@RequestBody @Valid Hoax hoax , @CurrentUser UserEntity user){
        service.save(hoax,user);
        return new GenericResponse("Hoax is Saved.");
    }

    @GetMapping("/hoaxes")
    Page<HoaxVM> getHoaxes(@PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page){
        return service.getAllHoax(page).map(HoaxVM::new);
    }
    @GetMapping("/users/{username}/hoaxes")
    Page<HoaxVM> getHoaxByUser(@PathVariable("username") String username,@PageableDefault( sort = "id",direction = Sort.Direction.DESC) Pageable page){
        return service.getHoaxesByUser(username,page).map(HoaxVM::new);
    }
}
