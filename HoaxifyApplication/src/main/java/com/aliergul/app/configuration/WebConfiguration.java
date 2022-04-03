package com.aliergul.app.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Autowired
    AppConfiguration appConfiguration;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // http://localhost:8080/images/profile.png
        //adresine gelen istekleri yönlendirmek için
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./"+appConfiguration.getUploadPath()+"/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
        ;

    }

    /**
     *  "store-picture" diye bir klasör varmı yok mu kontrolü burda yapılıyor.
     *  Eğer yoksa klasörü oluştur.
     * @return
     */
    @Bean
    CommandLineRunner createStorageDirectories(){
        return (atgs)->{
            createMethod(appConfiguration.getUploadPath());
            createMethod(appConfiguration.getProfileStoragePath());
            createMethod(appConfiguration.getAttachmentStoragePath());
        };
    }

    private void createMethod(String path) {
        File folder=new File(path);
        boolean folderExist=folder.exists() && folder.isDirectory();
        if(!folderExist){
            folder.mkdir();
        }
    }
}
