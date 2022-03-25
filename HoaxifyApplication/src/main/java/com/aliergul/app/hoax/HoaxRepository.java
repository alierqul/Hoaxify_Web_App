package com.aliergul.app.hoax;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaxRepository extends JpaRepository<Hoax,Long> {
}
