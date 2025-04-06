package com.travello.util;

import java.util.Base64;

public class ImageUtil {
    public static String encodeImageToBase64(byte[] imageBytes){
        return Base64.getEncoder().encodeToString(imageBytes);
    }
    public static byte[] decodeImageToByte(String imageString){
        return Base64.getDecoder().decode(imageString);
    }
}
