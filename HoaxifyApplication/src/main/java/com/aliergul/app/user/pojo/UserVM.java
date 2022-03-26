package com.aliergul.app.user.pojo;

import com.aliergul.app.user.UserEntity;
import lombok.Data;

@Data
public class UserVM {
  private String username;
  
  private String name;
  
  private String image;
  
  public UserVM(UserEntity user) {
      this.setUsername(user.getUsername());
      this.setName(user.getName());
      this.setImage(user.getImage());
  }
}
