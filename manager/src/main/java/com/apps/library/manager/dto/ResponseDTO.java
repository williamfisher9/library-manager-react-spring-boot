package com.apps.library.manager.dto;

public class ResponseDTO {
    private Object response;
    private int status;

    public void setResponse(Object response) {
        this.response = response;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Object getResponse() {
        return response;
    }

    public int getStatus() {
        return status;
    }
}
