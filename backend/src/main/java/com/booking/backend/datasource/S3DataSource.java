package com.booking.backend.datasource;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.ObjectTagging;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.SetObjectTaggingRequest;
import com.amazonaws.services.s3.model.Tag;
import com.amazonaws.services.s3.model.TagSet;
import com.booking.backend.remote.S3Client;

import jakarta.activation.MimetypesFileTypeMap;
import software.amazon.awssdk.core.sync.RequestBody;

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

    public String uploadBase64Image(String base64Image, String fileName) {
        try {
            // Decodificar la imagen Base64 en bytes
            byte[] imageBytes = Base64.getDecoder().decode((base64Image.substring(base64Image.indexOf(",") + 1)));

            // Generar un nombre único para la imagen, o puedes usar el original si es
            // necesario
            // String fileName = "test.jpeg";

            // Create a temporary file from the image bytes
            // File imageFile = new File(fileName);
            // FileOutputStream fos = new FileOutputStream(imageFile);
            // fos.write(imageBytes);
            // fos.close();
            MimetypesFileTypeMap mimetypesFileTypeMap = new MimetypesFileTypeMap();
            String contentType = mimetypesFileTypeMap.getContentType(fileName);

            InputStream inputStream = new ByteArrayInputStream(imageBytes);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(imageBytes.length);
            metadata.setContentType(contentType);
            metadata.addUserMetadata("public", "true");

            List<Tag> tagSet = new ArrayList<>();
            tagSet.add(new Tag("public", "true"));
            // Upload the image to Amazon S3
            s3Client.getClientAWS(accessKeyId, accessSecKey).putObject(bucketName, fileName, inputStream, metadata);

            s3Client.getClientAWS(accessKeyId, accessSecKey).setObjectTagging(new SetObjectTaggingRequest(bucketName, fileName, new ObjectTagging(tagSet)));
            // Generar una URL prefirmada para acceder a la imagen
            // GeneratePresignedUrlRequest generatePresignedUrlRequest = new
            // GeneratePresignedUrlRequest(bucketName,
            // fileName);
            // generatePresignedUrlRequest.setExpiration(null);
            // String imageUrl = s3Client.getClientAWS(accessKeyId, accessSecKey)
            // .generatePresignedUrl(generatePresignedUrlRequest).toString();

            return getObjectUrl(fileName);
        } catch (Exception e) {
            // Manejar errores en la subida de la imagen
            e.printStackTrace();
            return null;
        }
    }

    public String getObjectUrl(String fileName) {
        return "https://" + bucketName + ".s3.sa-east-1.amazonaws.com/" + fileName;

    }

}
