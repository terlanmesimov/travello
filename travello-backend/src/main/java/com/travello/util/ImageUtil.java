package com.travello.util;

import java.util.Base64;

public class ImageUtil {

    public static byte[] decodeImageToBytes(String base64) {
        return Base64.getDecoder().decode(base64);
    }
    public static String encodeImageToBase64String(byte[] imageBytes) {
        return Base64.getEncoder().encodeToString(imageBytes);
    }

}
