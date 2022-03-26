package com.aliergul.app.hoax;

import com.aliergul.app.user.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaxRepository extends JpaRepository<Hoax,Long> {

    Page<Hoax> findByUser(UserEntity user, Pageable page);
}
