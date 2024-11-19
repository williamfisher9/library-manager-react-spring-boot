package com.apps.library.manager.dao;

import com.apps.library.manager.model.app.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByUserId(Long userId);

    @Query(nativeQuery = true, value = "select * from items a where a.name like %:name% and a.user_id=:userId")
    List<Item> findByNameLikeAndUserId(String name, Long userId);

    List<Item> findByName(String name);

    @Query(nativeQuery = true, value = "select * from items a where a.watched = true and a.user_id=:userId")
    List<Item> findByUserIdAndWatched(Long userId);

    @Query(nativeQuery = true, value = "select * from items a where a.type = 'movie' and a.user_id=:userId")
    List<Item> findByUserIdAndMovies(Long userId);

    @Query(nativeQuery = true, value = "select * from items a where a.type = 'series' and a.user_id=:userId")
    List<Item> findByUserIdAndSeries(Long userId);
}
