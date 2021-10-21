package com.sjsu.cloud.click.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sjsu.cloud.click.entity.UserEntity;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, String>{
	
	UserEntity findByUserEmail(String userEmail);
	
}
