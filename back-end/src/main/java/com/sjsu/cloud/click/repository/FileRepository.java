package com.sjsu.cloud.click.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sjsu.cloud.click.entity.FileEntity;

@Repository
public interface FileRepository extends CrudRepository<FileEntity, String>{
	
		void deleteByFileName(String fileName);
		
		List findByUserEmail(String userEmail);
		
		FileEntity findByFileId(Long fileId);
}
