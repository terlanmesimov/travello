package com.travello.util.email;

public class EmailUtil {
    public static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    public static boolean isValidEmailFormat (String email){
        return email.matches(EMAIL_REGEX);
    }
}
