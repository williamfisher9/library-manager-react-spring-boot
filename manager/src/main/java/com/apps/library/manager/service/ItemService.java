package com.apps.library.manager.service;

import com.apps.library.manager.model.app.Item;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public interface ItemService {
    Item createItem(Item item);
    Item findItemById(Long id);
    List<Item> findAllItems();
    List<Item> deleteItemById(Long userId, Long id);
    List<Item> findByUserId(Long id);
    List<Item> findByNameAndUserId(String name, Long id);
    Item setItemAsWatched(Map<String, String> request);

    List<Item> findbyUserIdAndWatched(Long id);
    List<Item> findByUserIdAndType(Long id, String val);

    String fetchItemDetailsFromOMDB(String name, String year);
}
