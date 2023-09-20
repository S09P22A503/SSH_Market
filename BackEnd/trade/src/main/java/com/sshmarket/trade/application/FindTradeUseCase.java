package com.sshmarket.trade.application;

import com.sshmarket.trade.application.repository.TradeMessageRepository;
import com.sshmarket.trade.application.repository.TradeRepository;
import com.sshmarket.trade.domain.Status;
import com.sshmarket.trade.domain.Trade;
import com.sshmarket.trade.domain.TradeMessage;
import com.sshmarket.trade.dto.MemberResponseDto;
import com.sshmarket.trade.dto.TradesResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FindTradeUseCase {

    private final TradeRepository tradeRepository;
    private final TradeMessageRepository tradeMessageRepository;
    private final MemberClient memberClient;

    public List<TradesResponseDto> findTrades(Long memberId, Status status) {
        List<TradesResponseDto> tradesResponseList = new ArrayList<>();
        List<Trade> trades = tradeRepository.findByMemberIdAndStatus(memberId, status);
        for (Trade trade : trades) {
            //상대방 정보 조회
            Long traderId = trade.findTrader(memberId);
            MemberResponseDto memberResponseDto = (MemberResponseDto) memberClient.memberDetail(traderId).getBody();

            //마지막 메시지 조회
            TradeMessage tradeMessage = tradeMessageRepository.findTopByTradeIdOrderByCreatedAtDesc(trade.getId());

            tradesResponseList.add(TradesResponseDto.from(trade, tradeMessage, memberResponseDto));
        }

        return tradesResponseList;
    }
}
