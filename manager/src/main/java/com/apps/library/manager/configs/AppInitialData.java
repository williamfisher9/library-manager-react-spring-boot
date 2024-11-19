package com.apps.library.manager.configs;

import com.apps.library.manager.dao.MenuRepository;
import com.apps.library.manager.dao.RoleRepository;
import com.apps.library.manager.model.app.Menu;
import com.apps.library.manager.model.security.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppInitialData implements CommandLineRunner {
    private final Logger LOGGER = LoggerFactory.getLogger(AppInitialData.class);
    private final RoleRepository roleRepository;
    private final MenuRepository menuRepository;

    @Autowired
    public AppInitialData(RoleRepository roleRepository, MenuRepository menuRepository) {
        this.roleRepository = roleRepository;
        this.menuRepository = menuRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(roleRepository.findAll().isEmpty()){
            LOGGER.info("Creating required roles...");
            Role role1 = new Role("ROLE_ADMIN");
            Role role2 = new Role("ROLE_USER");
            LOGGER.info("ADMIN role saved successfully.");
            roleRepository.save(role1);
            LOGGER.info("USER role saved successfully.");
            roleRepository.save(role2);
        } else {
            LOGGER.info("Roles already exist.");
        }

        if(menuRepository.findAll().isEmpty()){
            Menu menu1 = new Menu("PUBLIC", "register", "fa-solid fa-user-plus fa-fw", 1, "/register", "");
            Menu menu2 = new Menu("PUBLIC", "login", "fa-solid fa-arrow-right-to-bracket fa-fw", 2, "/login", "");
            Menu menu4 = new Menu("home", "add", "fa-solid fa-plus fa-fw", 2, "", "addItem");
            Menu menu6 = new Menu("home", "logout", "fa-solid fa-right-from-bracket fa-fw", 4, "", "logUserOut");
            Menu menu8 = new Menu("details", "logout", "fa-solid fa-right-from-bracket fa-fw", 4, "", "logUserOut");
            menuRepository.save(menu1);
            menuRepository.save(menu2);
            menuRepository.save(menu4);
            menuRepository.save(menu6);
            menuRepository.save(menu8);
        } else {
            LOGGER.info("Menu already exist.");
        }

    }
}
