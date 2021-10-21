package com.sjsu.cloud.click.model;

public class User {
	
	private String userEmail;
    private String userFirstName;
    private String userLastName;
    private String userPassword;
    
	public User() {
		super();
	}

	/**
	 * @param userEmail
	 * @param userFirstName
	 * @param userLastName
	 * @param password
	 */
	public User(String userEmail, String userFirstName, String userLastName, String password) {
		super();
		this.userEmail = userEmail;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userPassword = password;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserFirstName() {
		return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public String getPassword() {
		return userPassword;
	}

	public void setPassword(String password) {
		this.userPassword = password;
	}
    
}
