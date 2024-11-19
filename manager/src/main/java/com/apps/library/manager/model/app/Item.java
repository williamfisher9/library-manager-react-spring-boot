package com.apps.library.manager.model.app;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "items")
public class Item implements Serializable {
    @Serial
    private static final long serialVersionUID = 82938L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String year;
    private String rating;
    private String poster;
    private Long userId;
    private String type;
    private boolean watched;

    @Lob
    private String details;

    public Item() {
    }

    public Item(String name, String year, String rating, String poster, Long userId, String type, boolean watched, String details) {
        this.name = name;
        this.year = year;
        this.rating = rating;
        this.poster = poster;
        this.userId = userId;
        this.type = type;
        this.watched = watched;
        this.details = details;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return watched == item.watched && Objects.equals(id, item.id) && Objects.equals(name, item.name) && Objects.equals(year, item.year) && Objects.equals(rating, item.rating) && Objects.equals(poster, item.poster) && Objects.equals(userId, item.userId) && Objects.equals(type, item.type) && Objects.equals(details, item.details);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, year, rating, poster, userId, type, watched, details);
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", year='" + year + '\'' +
                ", rating='" + rating + '\'' +
                ", poster='" + poster + '\'' +
                ", userId=" + userId +
                ", type='" + type + '\'' +
                ", watched=" + watched +
                ", details='" + details + '\'' +
                '}';
    }

    public boolean isWatched() {
        return watched;
    }

    public void setWatched(boolean watched) {
        this.watched = watched;
    }
}
