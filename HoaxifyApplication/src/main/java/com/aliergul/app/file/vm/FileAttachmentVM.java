package com.aliergul.app.file.vm;

import com.aliergul.app.file.FileAttachment;
import lombok.Data;

@Data
public class FileAttachmentVM {
    private String name;
    private String fileType;
    public FileAttachmentVM(FileAttachment attachment) {

        this.name = attachment.getName();
        this.fileType=attachment.getFileType();
    }
}
