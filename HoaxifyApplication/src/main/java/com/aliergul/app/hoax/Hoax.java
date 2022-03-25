package com.aliergul.app.hoax;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
public class Hoax {
    @Id
    @GeneratedValue
    private long id;
    @Size(min=1,max=1000)
    @Column(length = 1000) // Normal String 255 Karakter alıyor. Length verdiğimizde Database TEXT formatında yazıyor
    private String content;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date timeStamp;
}
