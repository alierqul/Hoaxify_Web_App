package com.aliergul.app.file;

import com.aliergul.app.configuration.AppConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@Slf4j
public class FileService {

    final AppConfiguration appConfiguration;
    final Tika tika;

    public FileService(AppConfiguration appConfiguration) {
        this.appConfiguration = appConfiguration;
        this.tika=new Tika();

    }

    public String writeBase64EncodedStringToFile(String image) throws IOException {
        String fileName=geretadeRandomName();

                    File target = new File(appConfiguration.getUploadPath()+"/"+fileName);
        OutputStream outputStream = new FileOutputStream(target);
        byte[] base64encoded = Base64.getDecoder().decode(image);
        outputStream.write(base64encoded);
        outputStream.close();

        return fileName;
    }


    public String geretadeRandomName(){
        return UUID.randomUUID().toString().replace("-","");
    }

    public void deleteFile(String oldImageName) {
        if(oldImageName==null) {
            return;
        }


        try {
            Files.deleteIfExists(Paths.get(appConfiguration.getUploadPath(),oldImageName));
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    public String detectType(String value) {

        byte[] base64encoded = Base64.getDecoder().decode(value);
        String fileType =tika.detect(base64encoded);
        return fileType;
    }
}
