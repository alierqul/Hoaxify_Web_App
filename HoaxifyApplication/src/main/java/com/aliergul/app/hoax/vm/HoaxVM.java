package com.aliergul.app.hoax.vm;

import com.aliergul.app.file.vm.FileAttachmentVM;
import com.aliergul.app.hoax.Hoax;
import com.aliergul.app.user.pojo.UserVM;
import lombok.Data;

@Data
public class HoaxVM {
    private long id;
    private String content;
    private long timestamp;
    private UserVM user;
    private FileAttachmentVM attachment;

    public HoaxVM(Hoax hoax) {
        this.id = hoax.getId();
        this.content = hoax.getContent();
        this.timestamp = hoax.getTimeStamp().getTime();
        this.user = new UserVM(hoax.getUser());
        if(hoax.getAttachment()!=null){
            this.attachment=new FileAttachmentVM(hoax.getAttachment());
        }

    }
}
