package com.sshmarket.trade.infra.database;

import com.sshmarket.trade.application.repository.TradeRepository;
import com.sshmarket.trade.domain.Status;
import com.sshmarket.trade.domain.Trade;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TradeRepositoryImpl implements TradeRepository {

    private final JpaTradeRepository jpaTradeRepository;

    @Override
    public Trade save(Trade trade) {
        return jpaTradeRepository.save(trade);
    }

    @Override
    public Trade findByArticleIdAndBuyerIdAndStatusNotIn(Long articleId, Long buyerId,
            List<Status> status) {
        return jpaTradeRepository.findByArticleIdAndBuyerIdAndStatusNotIn(articleId, buyerId,
                status);
    }

    @Override
    public Optional<Trade> findById(Long id) {
        return jpaTradeRepository.findById(id);
    }

    @Override
    public List<Trade> findByMemberIdAndStatus(Long memberId, Status status) {
        return jpaTradeRepository.findByMemberIdAndStatus(memberId, status.toString());
    }

    @Override
    public List<Trade> findByMemberId(Long memberId) {
        return jpaTradeRepository.findByMemberId(memberId);
    }
}

