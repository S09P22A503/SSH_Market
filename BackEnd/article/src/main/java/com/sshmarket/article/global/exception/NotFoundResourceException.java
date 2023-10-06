package com.sshmarket.article.global.exception;

public class NotFoundResourceException extends BusinessException{

    public NotFoundResourceException(String message) {
        super(404, message);
    }
}
