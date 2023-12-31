package com.sshmarket.trade.exception;

import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {

    private int statusCode;

    public BusinessException(int statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }
}
