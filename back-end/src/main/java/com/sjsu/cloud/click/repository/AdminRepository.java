package com.sjsu.cloud.click.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sjsu.cloud.click.entity.AdminEntity;

@Repository
public interface AdminRepository extends CrudRepository<AdminEntity, String>{
	
	AdminEntity findByAdminEmail(String adminEmail);

}
