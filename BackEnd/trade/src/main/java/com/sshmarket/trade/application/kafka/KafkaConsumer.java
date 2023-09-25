package com.sshmarket.trade.application.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sshmarket.trade.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    private static final String TOPIC_NAME = "trade";
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = TOPIC_NAME)
    public void listenMessage(String jsonMessage) {
        try {
            MessageDto message = objectMapper.readValue(jsonMessage, MessageDto.class);
            log.info(">>>" + message.getMemberId() + "," + message.getMessage());
            simpMessageSendingOperations.convertAndSend("/sub/trade/" + message.getTradeId(), message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
