package com.bookstore.service;

import com.bookstore.dto.BookResponse;
import com.bookstore.entity.Book;
import com.bookstore.exception.ResourceNotFoundException;
import com.bookstore.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(BookResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public BookResponse getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        return BookResponse.fromEntity(book);
    }

    public List<BookResponse> getBooksByCategory(String category) {
        return bookRepository.findByCategoryIgnoreCase(category).stream()
                .map(BookResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
