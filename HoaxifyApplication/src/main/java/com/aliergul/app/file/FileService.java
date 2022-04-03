package com.aliergul.app.file;

import com.aliergul.app.configuration.AppConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@EnableScheduling
public class FileService {

    final AppConfiguration appConfiguration;
    final Tika tika;
    final FileAttachmentRepository fileAttachmentRepository;
    public FileService(AppConfiguration appConfiguration, FileAttachmentRepository fileAttachmentRepository) {
        this.appConfiguration = appConfiguration;
        this.fileAttachmentRepository = fileAttachmentRepository;
        this.tika=new Tika();

    }

    public String writeBase64EncodedStringToFile(String image) throws IOException {
        String fileName=geretadeRandomName();
        File target = new File(appConfiguration.getProfileStoragePath()+"/"+fileName);
        OutputStream outputStream = new FileOutputStream(target);
        byte[] base64encoded = Base64.getDecoder().decode(image);
        outputStream.write(base64encoded);
        outputStream.close();

        return fileName;
    }


    public String geretadeRandomName(){
        return UUID.randomUUID().toString().replace("-","");
    }

    public void deleteProfileFile(String oldImageName) {
        if(oldImageName==null) {
            return;
        }
        deleteFile(Paths.get(appConfiguration.getProfileStoragePath(),oldImageName));
    }
    public void deleteAttachmentFile(String oldImageName) {
        if(oldImageName==null) {
            return;
        }
        deleteFile(Paths.get(appConfiguration.getAttachmentStoragePath(),oldImageName));
    }
    public void deleteFile(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



    public String detectType(byte[] arrBase64Byte) {

       return tika.detect(arrBase64Byte);
    }

    public FileAttachment saveHoaxAttachment(MultipartFile file) {
        String filename=geretadeRandomName();
        File target = new File(appConfiguration.getAttachmentStoragePath()+"/"+filename);
        FileAttachment attachment=new FileAttachment();
        try(OutputStream outputStream =new FileOutputStream(target)) {
            byte[] arr=file.getBytes();
            outputStream.write(arr);
            attachment.setFileType(detectType(file.getBytes()));
        }catch (IOException e){
            e.printStackTrace();
        }

        attachment.setName(filename);

        return fileAttachmentRepository.save(attachment);
    }

    //Bu Method 24 saat'de bir İlişkisiz image fillerini bulup temizlemeyi sağlıyor.
    // @Scheduled(fixedRate =24*60*60*1000 )
    @Scheduled(fixedRate =60*60*1000 )
    public void cleanUpStorage(){
        //Date twentyFourHoursAgo=new Date(System.currentTimeMillis()-(24*60*60*1000));
        Date twentyFourHoursAgo=new Date(System.currentTimeMillis()-(60*60*1000)); //bir saat
        List<FileAttachment> filesToBeDeleted= fileAttachmentRepository.findByDateBeforeAndHoaxIsNull(twentyFourHoursAgo);
        for (FileAttachment file: filesToBeDeleted){
            log.info(file.getName()+ " deleted. "+new Date());
            deleteAttachmentFile(file.getName());
            fileAttachmentRepository.deleteById(file.getId());
        }
    }
}
