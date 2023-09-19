package com.sshmarket.article.infra.database;

import com.sshmarket.article.application.repository.ArticleRepository;
import com.sshmarket.article.domain.Article;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepository{

    private final JpaArticleRepository jpaArticleRepository;

    public Article save(Article article){
        return jpaArticleRepository.save(article);
    }

}
