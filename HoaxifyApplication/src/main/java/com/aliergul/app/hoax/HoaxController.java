package com.aliergul.app.hoax;

import com.aliergul.app.shared.GenericResponse;
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
    GenericResponse saveHoax(@RequestBody @Valid Hoax hoax){
        service.save(hoax);
        return new GenericResponse("Hoax is Saved.");
    }

    @GetMapping("/hoaxes")
    Page<Hoax> saveHoax(@PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page){
        return service.getAllHoax(page);
    }
}
