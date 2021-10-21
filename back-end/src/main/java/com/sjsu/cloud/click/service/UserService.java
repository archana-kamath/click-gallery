package com.sjsu.cloud.click.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cloud.click.entity.FileEntity;
import com.sjsu.cloud.click.entity.UserEntity;
import com.sjsu.cloud.click.model.User;
import com.sjsu.cloud.click.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
		
	public UserEntity authenticateUserLogin(User user){
	  
		
	  UserEntity userEntity =  userRepository.findByUserEmail(user.getUserEmail());

	  if(userEntity==null) {
		  System.out.println("Null userEntity");
	  }
	  
	 return userEntity;  
	}

	public List<UserEntity> getAllUsers() {
		
		List userList = new ArrayList<UserEntity>();		
		userRepository.findAll().forEach(userList::add);
		return userList;

	}

}
