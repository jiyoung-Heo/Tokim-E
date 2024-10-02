package com.ssafy.tokime.model;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
public class BaseEntity {
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

   @PrePersist
    protected  void onCreate(){
       LocalDateTime now = LocalDateTime.now();
       this.createdAt=now;
       this.updatedAt=now;
   }
   @PreUpdate
    protected void onUpdate(){
       this.updatedAt = LocalDateTime.now();
   }

}
