package com.aliergul.app.file;

import com.aliergul.app.hoax.Hoax;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class FileAttachment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String fileType;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date date;

    @OneToOne
    private Hoax hoax;
}
