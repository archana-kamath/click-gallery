package com.sjsu.cloud.click.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AmazonConfig {
	
    @Value("${aws.access_key_id}")
    private String accessKeyId;

    @Value("${aws.secret_access_key}")
    private String secretAccessKey;

    @Value("${aws.s3.region}")
    private String region;
	
	    @Bean
	    public AmazonS3 s3() {
	        AWSCredentials awsCredentials = new BasicAWSCredentials("AKIA6NNXJJSCUZF5AV6W", "mINhJBfAAxwMEbihNvCV9lPK52x1KlfI9Ir5H0ez");
	        return AmazonS3ClientBuilder
	                .standard()
	                .withRegion("us-west-2")
	                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
	                .build();

	    }
	    
		/*
		 * final BasicAWSCredentials basicAWSCredentials = new
		 * BasicAWSCredentials(accessKeyId, secretAccessKey); // Get AmazonS3 client and
		 * return the s3Client object. return AmazonS3ClientBuilder .standard()
		 * .withRegion(Regions.fromName(region)) .withCredentials(new
		 * AWSStaticCredentialsProvider(basicAWSCredentials)) .build();
		 */

}