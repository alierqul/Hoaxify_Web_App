package com.aliergul.app.hoax;

import com.aliergul.app.file.FileAttachment;
import com.aliergul.app.file.FileAttachmentRepository;
import com.aliergul.app.hoax.vm.HoaxSubmitVM;
import com.aliergul.app.user.UserEntity;
import com.aliergul.app.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaxService {
    final HoaxRepository hoaxRepository;
    final UserService userService;
    final FileAttachmentRepository fileAttachmentRepository;

    public HoaxService(HoaxRepository hoaxRepository, UserService userService, FileAttachmentRepository fileAttachmentRepository) {
        this.hoaxRepository = hoaxRepository;
        this.userService = userService;
        this.fileAttachmentRepository = fileAttachmentRepository;
    }


    public Hoax save(HoaxSubmitVM hoaxSubmitVM, UserEntity user) {
        Hoax hoax=new Hoax();
        hoax.setContent(hoaxSubmitVM.getContent());
        hoax.setUser(user);
        hoax=hoaxRepository.save(hoax);
        Optional<FileAttachment> optionalFileAttachment= fileAttachmentRepository.findById(hoaxSubmitVM.getAttachmentId());
        if(optionalFileAttachment.isPresent()){
            FileAttachment attachment= optionalFileAttachment.get();
            attachment.setHoax(hoax);
            fileAttachmentRepository.save(attachment);
        }
        return hoax;
    }

    public Page<Hoax> getAllHoax(Pageable page){
        return hoaxRepository.findAll(page);
    }

    public Page<Hoax> getHoaxesByUser(String username, Pageable page) {
        UserEntity inDB=userService.getByUsername(username);
        return hoaxRepository.findByUser(inDB,page);
    }

    public Page<Hoax> getOldHoaxes(long id, String username, Pageable page) {
        Specification<Hoax> specification=lessThanID(id);
        if(username!=null){
            UserEntity inDb=userService.getByUsername(username);
            specification=specification.and(equalUser(inDb));
        }
        return hoaxRepository.findAll(specification,page);
    }


    public long getNewHoaxesCount(long id, String username) {
        Specification<Hoax> specification=greaterThanID(id);
        if(username!=null){
            UserEntity inDb=userService.getByUsername(username);
            specification=specification.and(equalUser(inDb));
        }
        return hoaxRepository.count(specification);
    }


    public List<Hoax> getNewHoaxes(long id, String username, Sort sort) {
        Specification<Hoax> specification=greaterThanID(id);
        if(username!=null){
            UserEntity inDb=userService.getByUsername(username);
            specification=specification.and(equalUser(inDb));
        }
        return hoaxRepository.findAll(specification,sort);
    }

    private Specification<Hoax> lessThanID(long id){
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get("id"),id);
    }

    private Specification<Hoax> greaterThanID(long id){
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get("id"),id);
    }

    private Specification<Hoax> equalUser(UserEntity user){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user"),user);
    }

}
