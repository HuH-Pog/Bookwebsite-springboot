package com.bookstore.dto;

import com.bookstore.entity.Book;
import java.math.BigDecimal;

public class BookResponse {

    private Long id;
    private String title;
    private String author;
    private String description;
    private BigDecimal price;
    private String category;
    private String imageUrl;
    private Double rating;
    private Integer stock;

    public BookResponse() {
    }

    public static BookResponse fromEntity(Book book) {
        BookResponse dto = new BookResponse();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setDescription(book.getDescription());
        dto.setPrice(book.getPrice());
        dto.setCategory(book.getCategory());
        dto.setImageUrl(book.getImageUrl());
        dto.setRating(book.getRating());
        dto.setStock(book.getStock());
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}
