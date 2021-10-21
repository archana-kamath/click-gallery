package com.sjsu.cloud.click.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.sjsu.cloud.click.entity.FileEntity;
import com.sjsu.cloud.click.model.User;
import com.sjsu.cloud.click.repository.FileJPARepository;
import com.sjsu.cloud.click.repository.FileRepository;

@Service
@Transactional
public class FileService{
	
	@Autowired
    private AmazonS3 amazonS3;
	
	@Autowired
	FileRepository fileRepository;
	
	@Autowired
	FileJPARepository fileJPARepository;
	
    @Value("${aws.s3.bucket}")
    private String bucketName;
    
    //, FileEntity fileEntity
    @Async
    public void uploadFile(final MultipartFile multipartFile) {
       
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            
            uploadFileToS3Bucket(bucketName, file);
            file.delete(); 
            
        } catch (final AmazonServiceException ex) {
        	System.out.println("Error= {} while uploading file."+ ex.getMessage());
        }
    }
    
    public void uploadFileDetails(FileEntity fileEntity) {
        
        try {
            
           fileRepository.save(fileEntity);
            
        } catch (final AmazonServiceException ex) {
        	System.out.println("Error= {} while uploading file."+ ex.getMessage());
        }
    }
 
    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        
    	final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
        	System.out.println("Error converting the multi-part file to file= "+ ex.getMessage());
        }
        return file;
    }
 
    private void uploadFileToS3Bucket(final String bucketName, final File file) {
       // final String uniqueFileName = LocalDateTime.now() + "_" + file.getName();
    	final String uniqueFileName = file.getName();
        final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFileName, file);
        amazonS3.putObject(putObjectRequest);
    }
    
    public void downloadImageFromS3(String imageName) throws IOException {
    	 S3Object fullObject = null;
	    try {
	    	
	    	 fullObject = amazonS3.getObject(new GetObjectRequest(bucketName, imageName));
	         System.out.println("Content-Type: " + fullObject.getObjectMetadata().getContentType());
	         
	         InputStream in = fullObject.getObjectContent();

	         BufferedImage imageFromAWS = ImageIO.read(in);
	         File outputfile = new File("C:\\AWSFile\\downloaded_"+imageName);
	         ImageIO.write(imageFromAWS, "JPG", outputfile );
	        
	      
	         
	    } catch (AmazonServiceException e) {
	      
	        e.printStackTrace();
	    } catch (SdkClientException e) {
	        e.printStackTrace();
	    } finally {
	        if (fullObject != null) {
	            fullObject.close();
	        }
	    }
    }
    
    public void deleteImage(String imageName) {
    	
    	System.out.println(bucketName +" "+imageName);
    	amazonS3.deleteObject(new DeleteObjectRequest(bucketName, imageName));
    	
    	fileRepository.deleteByFileName(imageName);
    }

	public List viewAllImages(User user) {
		
		List myImageList = new ArrayList<FileEntity>();		
		fileRepository.findAll().forEach(myImageList::add);
				
		return myImageList;
	}
	
	public List viewMyImages(User user) {
		List myFileList = new ArrayList<FileEntity>();
		
		fileRepository.findByUserEmail(user.getUserEmail()).forEach(myFileList::add);
		return myFileList;
	}

	public FileEntity getMyUserFiledetails(Long fileId) {
		
		FileEntity entity = new FileEntity();
		entity = fileRepository.findByFileId(fileId);
		return entity;
	}

	public void updateImageAbout(FileEntity fileEntity) {
		
		System.out.println(fileEntity.getFileId());
		fileJPARepository.updateImageAbout(fileEntity.getFileId(),fileEntity.getUpdateDate(),fileEntity.getFileDesc());
		
	}

	public void updateImageDetail(FileEntity fileEntity) {
	
		fileJPARepository.updateImageDetail(fileEntity.getFileId(),fileEntity.getUpdateDate());
	}

	public List<FileEntity> getAllFiles() {
		
		List myImageList = new ArrayList<FileEntity>();		
		fileRepository.findAll().forEach(myImageList::add);
		return myImageList;
				
	}

}
