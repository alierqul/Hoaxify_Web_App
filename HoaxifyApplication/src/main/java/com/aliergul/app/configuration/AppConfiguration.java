package com.aliergul.app.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "hoaxify")
public class AppConfiguration {
    private String uploadPath;

    private String profileStorage="profile";
    private String attachmentStorage="attachment";

    public String getProfileStoragePath() {
        return this.uploadPath+"/"+profileStorage;
    }

    public String getAttachmentStoragePath() {
        return this.uploadPath+"/"+attachmentStorage;
    }
}
