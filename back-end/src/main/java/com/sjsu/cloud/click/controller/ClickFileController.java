package com.sjsu.cloud.click.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sjsu.cloud.click.entity.FileEntity;
import com.sjsu.cloud.click.model.Picture;
import com.sjsu.cloud.click.model.User;
import com.sjsu.cloud.click.repository.FileRepository;
import com.sjsu.cloud.click.service.FileService;

@RestController
@RequestMapping(value = "/click")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClickFileController {

	@Autowired
	private FileService fileService;

	@PostMapping(value= "/uploadImage")
    public ResponseEntity<String> uploadFile(
    		@RequestPart(value = "file") final MultipartFile multipartFile){

		System.out.println(multipartFile);
		fileService.uploadFile(multipartFile);
		
		final String response = "[" + multipartFile.getOriginalFilename() + "] uploaded successfully.";
        return new ResponseEntity<>(response, HttpStatus.OK);
       
    }
	
	@PostMapping(value= "/uploadImageDetails")
    public ResponseEntity<String> uploadFileDetails(@RequestBody FileEntity fileEntity) {

		System.out.println(fileEntity);
		fileService.uploadFileDetails(fileEntity);
		
        return new ResponseEntity<>("Successfully updated DB", HttpStatus.OK);
       
    }
	
	@RequestMapping(value="/download/{imageName}")
    public String downloadFile(@PathVariable("imageName") String imageName) throws IOException {
		
		fileService.downloadImageFromS3(imageName);
		return "Download successful !!";
    }
	
	@RequestMapping(value="/delete/{fileName}")
    public String deleteFile(@PathVariable("fileName") String fileName) throws IOException {
		
		fileService.deleteImage(fileName);
		return "Delete successful !!";
    }
	
	@RequestMapping(value="/view")
    public @ResponseBody List<FileEntity> viewFile(@RequestBody User user) throws IOException {
		
		
		return fileService.viewAllImages(user);
    }
	
	@RequestMapping(value="/userView")
    public @ResponseBody List<FileEntity> viewMyFile(@RequestBody User user) throws IOException {
		
		System.out.println("User email "+ user.getUserEmail());
		
		
		return fileService.viewMyImages(user);
    }
	
	@RequestMapping(value="/userFile/{fileId}")
    public @ResponseBody FileEntity getMyUserFile(@PathVariable("fileId") Long fileId) throws IOException {
		
		System.out.println(fileId);
		
		
		return fileService.getMyUserFiledetails(fileId);
		
    }

	@RequestMapping(value="/updateImageAbout")
    public @ResponseBody String updateImageAbout(@RequestBody FileEntity fileEntity) throws IOException {
		
		fileService.updateImageAbout(fileEntity);
		
		return "Updated successfully";
    }
	
	@RequestMapping(value="/updateImageDetail")
    public @ResponseBody String updateImageDetail(@RequestBody FileEntity fileEntity) throws IOException {
		
		fileService.updateImageDetail(fileEntity);
		
		return "Updated successfully";
    }
	
	@RequestMapping(value="/allImages")
    public List<FileEntity> getAllFiles() throws IOException {
		
		return fileService.getAllFiles();
    }
}
