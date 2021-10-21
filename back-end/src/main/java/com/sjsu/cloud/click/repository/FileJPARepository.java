package com.sjsu.cloud.click.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sjsu.cloud.click.entity.FileEntity;

@Repository
public interface FileJPARepository extends JpaRepository<FileEntity, Long> {
	
	@Transactional
	@Modifying
	@Query("UPDATE FileEntity fe SET fe.fileDesc = :fileDesc, fe.updateDate = :updateDate WHERE fe.fileId = :fileId")
	void updateImageAbout(@Param(value = "fileId") Long fileId,
						  @Param(value = "updateDate") String updateDate,
						  @Param(value = "fileDesc") String fileDesc);

	@Transactional
	@Modifying
	@Query("UPDATE FileEntity fe SET  fe.updateDate = :updateDate WHERE fe.fileId = :fileId")
	void updateImageDetail(@Param(value = "fileId") Long fileId,
			  			@Param(value = "updateDate") String updateDate);


}
