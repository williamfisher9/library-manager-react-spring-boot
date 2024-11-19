package com.apps.library.manager.exceptions;

public class AuthorizationHeaderNotFoundException extends RuntimeException{
    public AuthorizationHeaderNotFoundException(String message){
        super(message);
    }
}
