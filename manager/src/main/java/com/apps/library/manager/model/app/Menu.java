package com.apps.library.manager.model.app;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "menu_items")
public class Menu implements Serializable {

    @Serial
    private static final long serialVersionUID = 37284L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String role;
    private String menuItem;
    private String menuItemIcon;
    private int menuItemOrder;
    private String routerLink;
    private String functionItem;

    public Menu() {
    }

    public Menu(String role, String menuItem, String menuItemIcon, int menuItemOrder, String routerLink, String functionItem) {
        this.role = role;
        this.menuItem = menuItem;
        this.menuItemIcon = menuItemIcon;
        this.menuItemOrder = menuItemOrder;
        this.routerLink = routerLink;
        this.functionItem = functionItem;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(String menuItem) {
        this.menuItem = menuItem;
    }

    public String getMenuItemIcon() {
        return menuItemIcon;
    }

    public void setMenuItemIcon(String menuItemIcon) {
        this.menuItemIcon = menuItemIcon;
    }

    public int getMenuItemOrder() {
        return menuItemOrder;
    }

    public void setMenuItemOrder(int menuItemOrder) {
        this.menuItemOrder = menuItemOrder;
    }

    public String getRouterLink() {
        return routerLink;
    }

    public void setRouterLink(String routerLink) {
        this.routerLink = routerLink;
    }

    public String getFunctionItem() {
        return functionItem;
    }

    public void setFunctionItem(String functionItem) {
        this.functionItem = functionItem;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Menu menu = (Menu) o;
        return menuItemOrder == menu.menuItemOrder && Objects.equals(id, menu.id) && Objects.equals(role, menu.role) && Objects.equals(menuItem, menu.menuItem) && Objects.equals(menuItemIcon, menu.menuItemIcon) && Objects.equals(routerLink, menu.routerLink) && Objects.equals(functionItem, menu.functionItem);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, role, menuItem, menuItemIcon, menuItemOrder, routerLink, functionItem);
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", role='" + role + '\'' +
                ", menuItem='" + menuItem + '\'' +
                ", menuItemIcon='" + menuItemIcon + '\'' +
                ", menuItemOrder=" + menuItemOrder +
                ", routerLink='" + routerLink + '\'' +
                ", functionItem='" + functionItem + '\'' +
                '}';
    }
}
