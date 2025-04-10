package com.travello.model;

import lombok.Getter;

@Getter
public class HunterEmailVericifationResponse {
    private Data data;
    @Getter
    public static class Data {
        private String email;
        private String status;
        private String result;
    }
}
