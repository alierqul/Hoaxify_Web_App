package com.aliergul.app.user.pojo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdate {

  private String name;

  private String image;
  
 
}
