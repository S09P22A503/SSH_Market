package com.sshmarket.article.infra.database;

import com.sshmarket.article.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface JpaArticleRepository extends JpaRepository<Article, Long> {

    Optional<Article> findById(Long id);

    @Query("select distinct a from Article a join fetch a.articleImages join fetch a.location where a.id = :id")
    Article findArticleDetailById(Long id);

}
