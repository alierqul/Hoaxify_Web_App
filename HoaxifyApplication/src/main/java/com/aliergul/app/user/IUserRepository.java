package com.aliergul.app.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository  extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
    Page<UserEntity> findByUsernameNot(String username, Pageable page);
}
