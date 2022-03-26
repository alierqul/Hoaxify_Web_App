package com.aliergul.app.hoax;

import com.aliergul.app.user.UserEntity;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
public class Hoax {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Size(min=1,max=1000)
    @Column(length = 1000) // Normal String 255 Karakter alıyor. Length verdiğimizde Database TEXT formatında yazıyor
    private String content;
    @ManyToOne
    private UserEntity user;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date timeStamp;
}
