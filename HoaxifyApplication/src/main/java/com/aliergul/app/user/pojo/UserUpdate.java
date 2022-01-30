package com.aliergul.app.user.pojo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdate {
  @NotNull
  @Size(min = 4, max=255)
  private String name;
  
 
}
