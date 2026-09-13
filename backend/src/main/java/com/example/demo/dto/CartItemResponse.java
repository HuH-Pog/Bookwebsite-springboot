package com.example.demo.dto;

import com.example.demo.model.Book;

import java.math.BigDecimal;

public record CartItemResponse(
        Long id,
        Long bookId,
        String title,
        String author,
        String genre,
        BigDecimal price,
        Integer stock,
        String coverUrl,
        Integer quantity
) {
    public static CartItemResponse from(com.example.demo.model.CartItem item) {
        Book book = item.getBook();
        return new CartItemResponse(
                item.getId(), book.getId(), book.getTitle(), book.getAuthor(), book.getGenre(),
                book.getPrice(), book.getStock(), book.getCoverUrl(), item.getQuantity()
        );
    }
}
