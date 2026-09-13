package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getBooks(@RequestParam(required = false) String search,
                                @RequestParam(required = false) String genre) {
        if (search != null && !search.isBlank()) {
            return bookService.search(search);
        }
        if (genre != null && !genre.isBlank()) {
            return bookService.byGenre(genre);
        }
        return bookService.getAll();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getById(id);
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.create(book);
    }
}
