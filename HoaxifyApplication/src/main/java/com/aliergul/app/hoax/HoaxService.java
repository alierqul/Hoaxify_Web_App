package com.aliergul.app.hoax;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HoaxService {
    HoaxRepository hoaxRepository;

    public HoaxService(HoaxRepository hoaxRepository) {
        this.hoaxRepository = hoaxRepository;
    }

    public Hoax save(Hoax hoax) {
        return hoaxRepository.save(hoax);
    }

    public Page<Hoax> getAllHoax(Pageable page){
        return hoaxRepository.findAll(page);
    }
}
