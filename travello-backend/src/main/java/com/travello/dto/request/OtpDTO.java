package com.travello.dto.request;

import lombok.Data;

@Data
public class OtpDTO {
    private String email;
    private String inputOtp;
    private String newPassword;
}
