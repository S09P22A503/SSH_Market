package com.sshmarket.trade.controller;

import com.sshmarket.trade.application.AddTradeUseCase;
import com.sshmarket.trade.application.SendMessageUseCase;
import com.sshmarket.trade.domain.Trade;
import com.sshmarket.trade.dto.HttpResponse;
import com.sshmarket.trade.dto.MessageDto;
import com.sshmarket.trade.dto.TradeCreateRequestDto;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class TradeController {

    private final SendMessageUseCase sendMessageUseCase;
    private final AddTradeUseCase addTradeUseCase;

    @MessageMapping("/send")
    public void messageSend(MessageDto message) {
        log.info(message.getMessage());
        sendMessageUseCase.sendMessage(message);
    }

    @PostMapping("/trade")
    public ResponseEntity<?> tradeAdd(
            @RequestBody @Valid final TradeCreateRequestDto tradeCreateRequestDto) {
        Trade trade = addTradeUseCase.addTrade(tradeCreateRequestDto);
        return HttpResponse.okWithData(HttpStatus.OK, "채팅방 생성에 성공했습니다.", trade);
    }
}
