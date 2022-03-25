package com.aliergul.app.hoax;

import com.aliergul.app.shared.GenericResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
