package com.apps.library.manager.controller;

import com.apps.library.manager.dto.ResponseDTO;
import com.apps.library.manager.dto.UserDTO;
import com.apps.library.manager.model.app.Item;
import com.apps.library.manager.model.security.User;
import com.apps.library.manager.service.AuthService;
import com.apps.library.manager.service.ItemService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@CrossOrigin(origins={"http://localhost:4200", "http://localhost:5173"})
@RequestMapping("/api/v1")
public class AppController {
    private final AuthService authService;
    private final ItemService itemService;

    @Autowired
    public AppController(AuthService authService, ItemService itemService) {
        this.authService = authService;
        this.itemService = itemService;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/public/signup")
    public ResponseEntity<ResponseDTO> createUser(@RequestBody UserDTO userDTO){
        ResponseDTO responseDTO = new ResponseDTO();
        User user = authService.createUser(userDTO);
        responseDTO.setResponse(user);
        responseDTO.setStatus(200);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/public/login")
    public ResponseEntity<ResponseDTO> login(HttpServletRequest request){
        ResponseDTO responseDTO = new ResponseDTO();
        Authentication authentication = authService.authenticateUser(request);
        responseDTO.setStatus(authentication.isAuthenticated() ? 200 : 401);
        responseDTO.setResponse(authentication);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/user/home")
    public ResponseEntity<ResponseDTO> getUserProfile(@RequestBody Map<String, Integer> userDetails){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);

        responseDTO.setResponse(itemService.findByUserId(Long.valueOf(userDetails.get("userId"))));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/user/create-item")
    public ResponseEntity<ResponseDTO> createItem(@RequestBody Item item){

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);
        responseDTO.setResponse(itemService.createItem(item));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/user/get-details/{name}/{year}")
    public ResponseEntity<ResponseDTO> fetchItemDetailsFromOMDBApi(@PathVariable String name, @PathVariable String year){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);
        responseDTO.setResponse(itemService.fetchItemDetailsFromOMDB(name, year));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/public/get-menu")
    public ResponseEntity<ResponseDTO> getPublicMenu(){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);
        responseDTO.setResponse(authService.getMenu("public"));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/user/get-menu/{type}")
    public ResponseEntity<ResponseDTO> getPrivateMenu(@PathVariable("type") String type){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);
        responseDTO.setResponse(authService.getMenu(type));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/user/{userId}/item/{id}")
    public ResponseEntity<ResponseDTO> deleteItemById(@PathVariable("userId") int userId, @PathVariable("id") int id){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setResponse(itemService.deleteItemById((long) userId, (long) id));
        responseDTO.setStatus(200);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/user/item/{id}")
    public ResponseEntity<ResponseDTO> getItemById(@PathVariable("id") int id){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setResponse(itemService.findItemById((long) id));
        responseDTO.setStatus(200);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/user/{userId}/search/{name}")
    public ResponseEntity<ResponseDTO> searchItemByName(@PathVariable("userId") int userId, @PathVariable("name") String name){
        if(name.equalsIgnoreCase("nill")) {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setResponse(itemService.findByUserId((long) userId));
            responseDTO.setStatus(200);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setResponse(itemService.findByNameAndUserId(name, (long) userId));
            responseDTO.setStatus(200);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        }
    }

    @RequestMapping(method = RequestMethod.POST, path = "/user/item/watched")
    public ResponseEntity<ResponseDTO> setItemAsWatched(@RequestBody Map<String, String> request){
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatus(200);
        responseDTO.setResponse(itemService.setItemAsWatched(request));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/user/{userId}/filter/{fieldName}")
    public ResponseEntity<ResponseDTO> filterItemsBy(@PathVariable("userId") int userId, @PathVariable("fieldName") String fieldName){
        if(fieldName.equalsIgnoreCase("watched")) {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setResponse(itemService.findbyUserIdAndWatched((long) userId));
            responseDTO.setStatus(200);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else if(fieldName.equalsIgnoreCase("movies")) {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setResponse(itemService.findByUserIdAndType((long) userId, "movies"));
            responseDTO.setStatus(200);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else if(fieldName.equalsIgnoreCase("series")) {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setResponse(itemService.findByUserIdAndType((long) userId, "series"));
            responseDTO.setStatus(200);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }
}
