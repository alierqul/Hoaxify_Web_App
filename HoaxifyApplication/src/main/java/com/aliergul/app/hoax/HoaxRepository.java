package com.aliergul.app.hoax;

import com.aliergul.app.user.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaxRepository extends JpaRepository<Hoax,Long>, JpaSpecificationExecutor<Hoax> {

    Page<Hoax> findByUser(UserEntity user, Pageable page);

/**
 * JpaSpecificationExecutor kullanarak yaptık.
 */
//    //LessThen Verilen id den öncekiler listelenir.
//    Page<Hoax> findByIdLessThan(long id, Pageable page);
//
//    Page<Hoax> findByIdLessThanAndUser( long id, UserEntity user, Pageable page);
//
//    long countByIdGreaterThan(long id);
//
//    long countByIdGreaterThanAndAndUser(long id,UserEntity username);
//    //Greater verilen id den sonra
//    List<Hoax> findByIdGreaterThan(long id, Sort sort);
//
//    List<Hoax> findByIdGreaterThanAndUser(long id,UserEntity user, Sort sort);

}
