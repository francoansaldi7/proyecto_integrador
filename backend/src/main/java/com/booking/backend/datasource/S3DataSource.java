package com.booking.backend.datasource;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.booking.backend.remote.S3Client;

@Configuration
@EnableConfigurationProperties
public class S3DataSource {
  

    @Value("${bucket.name}")
    private String bucketName;

    @Value("${bucket.accessKeyId}")
    private String accessKeyId;

    @Value("${bucket.accessSecKey}")
    private String accessSecKey;
    S3Client s3Client;

    public S3DataSource() {
        this.s3Client = new S3Client();
    }

    public String uploadFile(MultipartFile multipartFile) throws IOException {

        String fileName = multipartFile.getOriginalFilename();
        s3Client.getClientAWS(accessKeyId,accessSecKey).putObject(
                bucketName,
                fileName,
                convertMultipartFileToFile(multipartFile));
        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucketName, fileName);
        String url = s3Client.getClientAWS(accessKeyId,accessSecKey).generatePresignedUrl(generatePresignedUrlRequest).toString();

        return url;
 }

    private static File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream outputStream = new FileOutputStream(file);
        outputStream.write(multipartFile.getBytes());
        outputStream.close();
        return file;
    }
}
