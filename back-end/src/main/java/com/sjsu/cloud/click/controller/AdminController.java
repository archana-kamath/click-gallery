package com.sjsu.cloud.click.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sjsu.cloud.click.entity.AdminEntity;
import com.sjsu.cloud.click.model.Admin;
import com.sjsu.cloud.click.repository.AdminRepository;
import com.sjsu.cloud.click.service.AdminService;

@Controller 
@RequestMapping(path="/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {
	
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping(path="/addNew")
	public @ResponseBody String addNewAdmin(@RequestBody AdminEntity myAdmin) {
	    
	    return adminService.saveNewAdmin(myAdmin);
	  }
	
	@PostMapping(path="/authenticate")
	public @ResponseBody Admin authenticateAdmin (@RequestBody Admin adminDto) {

	    AdminEntity myAdmin = adminService.authenticateAdminLogin(adminDto);

	    Admin admin = new Admin();
	    admin.setAdminEmail(myAdmin.getAdminEmail());
	    admin.setAdminFirstName(myAdmin.getAdminFirstName());
	    admin.setAdminLastName(myAdmin.getAdminLastName());
	    return admin;
	  }

}
