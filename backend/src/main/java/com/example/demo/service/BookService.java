package com.example.demo.service;

import com.example.demo.exception.ApiException;
import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    public Book getById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ApiException("Book not found", HttpStatus.NOT_FOUND));
    }

    public List<Book> search(String query) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }

    public List<Book> byGenre(String genre) {
        return bookRepository.findByGenreIgnoreCase(genre);
    }

    public Book create(Book book) {
        return bookRepository.save(book);
    }
}
