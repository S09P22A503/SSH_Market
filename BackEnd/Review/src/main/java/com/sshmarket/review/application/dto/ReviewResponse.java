package com.sshmarket.review.application.dto;

import com.sshmarket.review.domain.Review;
import com.sshmarket.review.domain.ReviewImage;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {

    private Long id;

    private Member member;

    private Article article;

    private Long buyHistoryId;

    private String message;

    private int starRating;

    private String createdAt;

    private List<ReviewImage> images;

    public static ReviewResponse from(Review review, Article article, Member member) {
        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy.MM.dd");
        return ReviewResponse.builder()
                             .id(review.getId())
                             .article(article)
                             .member(member)
                             .message(review.getMessage())
                             .starRating(review.getStarRating())
                             .createdAt(dateFormatter.format(review.getCreatedAt()))
                             .buyHistoryId(review.getBuyHistoryId())
                             .images(review.getReviewImages())
                             .build();
    }
}
