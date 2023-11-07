package com.booking.backend.remote;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

public class S3Client {
    public AmazonS3 getClientAWS(String accessKeyId, String accessSecKey) {

        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, accessSecKey);

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(Regions.SA_EAST_1)
                .build();

    }
}
