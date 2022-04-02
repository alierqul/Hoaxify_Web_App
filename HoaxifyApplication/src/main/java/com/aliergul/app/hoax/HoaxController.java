package com.aliergul.app.hoax;

import com.aliergul.app.hoax.vm.HoaxVM;
import com.aliergul.app.shared.GenericResponse;
import com.aliergul.app.user.CurrentUser;
import com.aliergul.app.user.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    //{id:[0-9]+]} 0-9 arasında sayılar olmalı REGEX Kullanımı Örnek
    @GetMapping({"/hoaxes/{id:[0-9]+}","/users/{username}/hoaxes/{id:[0-9]+}"})
    ResponseEntity<?> getHoaxesRelative(@PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page
            ,@PathVariable("id") long id
            , @PathVariable(value = "username",required = false) String username
            , @RequestParam(value = "count",required = false,defaultValue = "false") boolean count
            , @RequestParam(value = "direction",required = false,defaultValue = "before") String direction
    ){
        if(count){
            long newHoaxCount =service.getNewHoaxesCount(id,username);
            Map<String,Long> response=new HashMap<>();
            response.put("count",newHoaxCount);
            return ResponseEntity.ok(response);
        }
        if(direction.equals("after")){
            List<Hoax> newHoaxes = service.getNewHoaxes(id,username,page.getSort());
            List<HoaxVM> newHoaxesVM=newHoaxes.stream().map(HoaxVM::new).collect(Collectors.toList());
            return  ResponseEntity.ok(newHoaxesVM);
        }
        return  ResponseEntity.ok(service.getOldHoaxes(id,username,page).map(HoaxVM::new));
    }



    @GetMapping("/users/{username}/hoaxes")
    Page<HoaxVM> getHoaxByUser(@PathVariable("username") String username,@PageableDefault( sort = "id",direction = Sort.Direction.DESC) Pageable page){
        return service.getHoaxesByUser(username,page).map(HoaxVM::new);
    }
}
