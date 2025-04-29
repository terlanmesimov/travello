package com.travello.util;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ImageUtil {

    public static Map<String, String> convertMultipartDataFileToBase64(MultipartFile imageFile) throws IOException {
        Map<String, String> data = new HashMap<>();
        byte[] fileBytes = imageFile.getBytes();
        String base64String = encodeImageToBase64String(fileBytes);
        String mimeType = imageFile.getContentType();
        data.put("mimiType", mimeType);
        data.put("base64String", base64String);
        return data;
    }

    public static String joinBase64(String mimiType, String base64Data) {
        return "data:" + mimiType + ";base64," + base64Data;
    }

    public static byte[] decodeImageToBytes(String base64) {
        return Base64.getDecoder().decode(base64);
    }

    public static String encodeImageToBase64String(byte[] imageBytes) {
        return Base64.getEncoder().encodeToString(imageBytes);
    }
}
