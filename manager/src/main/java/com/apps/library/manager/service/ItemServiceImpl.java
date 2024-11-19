package com.apps.library.manager.service;

import com.apps.library.manager.dao.ItemRepository;
import com.apps.library.manager.exceptions.ItemNotFoundException;
import com.apps.library.manager.model.app.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class ItemServiceImpl implements ItemService{

    @Value("${omdb.api.key}")
    private String omdbKey;

    private final ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item createItem(Item item) {
        if(itemRepository.findByName(item.getName()).isEmpty())
            return itemRepository.save(item);

        return null;
    }

    @Override
    public Item findItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Item " + id + " not found."));
    }

    @Override
    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public List<Item> deleteItemById(Long userId, Long id) {
        if(itemRepository.findById(id).isPresent()){
            itemRepository.deleteById(id);
        }

        return itemRepository.findByUserId(userId);
    }

    @Override
    public List<Item> findByUserId(Long id) {
        return itemRepository.findByUserId(id);
    }

    @Override
    public List<Item> findByNameAndUserId(String name, Long id) {
        return itemRepository.findByNameLikeAndUserId(name, id);
    }

    @Override
    public Item setItemAsWatched(Map<String, String> request) {
        Item item = itemRepository.findById(Long.valueOf(request.get("itemId")))
                .orElseThrow(() -> new ItemNotFoundException(""));
        item.setWatched(Boolean.parseBoolean(request.get("watched")));

        return itemRepository.save(item);
    }

    @Override
    public List<Item> findbyUserIdAndWatched(Long id) {
        return itemRepository.findByUserIdAndWatched(id);
    }

    @Override
    public List<Item> findByUserIdAndType(Long id, String val) {
        if(val.equalsIgnoreCase("movies")){
            return itemRepository.findByUserIdAndMovies(id);
        } else {
            return itemRepository.findByUserIdAndSeries(id);
        }
    }

    @Override
    public String fetchItemDetailsFromOMDB(String name, String year) {
        String uri = "https://www.omdbapi.com/?apikey=" + omdbKey +  "&t=" + name +
                (!year.equalsIgnoreCase("nill") ? "&y=" + year : "");

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate
                .getForObject(uri.replace(" ", "+"), String.class);
    }
}
