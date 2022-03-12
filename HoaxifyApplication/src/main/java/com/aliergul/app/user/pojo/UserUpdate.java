package com.aliergul.app.user.pojo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.aliergul.app.shared.FileType;
import lombok.Data;

@Data
public class UserUpdate {

  @NotNull(message="{hoaxify.constraint.username.NotNull.message}")
  @Size(min = 4, max=255 )
  private String name;
  @FileType(types = {"jpeg", "png"})
  private String image;
  
 
}
