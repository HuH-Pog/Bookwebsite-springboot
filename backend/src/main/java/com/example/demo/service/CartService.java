package com.example.demo.service;

import com.example.demo.dto.CartItemRequest;
import com.example.demo.dto.CartItemResponse;
import com.example.demo.exception.ApiException;
import com.example.demo.model.Book;
import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository,
                       BookRepository bookRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<CartItemResponse> getItems(String email) {
        return getCart(email).getItems().stream().map(CartItemResponse::from).toList();
    }

    @Transactional
    public List<CartItemResponse> addItem(String email, CartItemRequest request) {
        Cart cart = getOrCreateCart(email);
        Book book = findBook(request.getBookId());
        CartItem item = cartItemRepository.findByCartIdAndBookId(cart.getId(), book.getId())
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setCart(cart);
                    newItem.setBook(book);
                    newItem.setQuantity(0);
                    cart.getItems().add(newItem);
                    return newItem;
                });
        setQuantity(item, item.getQuantity() + request.getQuantity(), book);
        cartItemRepository.save(item);
        return getItems(email);
    }

    @Transactional
    public List<CartItemResponse> updateItem(String email, Long bookId, CartItemRequest request) {
        Cart cart = getOrCreateCart(email);
        CartItem item = cartItemRepository.findByCartIdAndBookId(cart.getId(), bookId)
                .orElseThrow(() -> new ApiException("Book is not in your cart", HttpStatus.NOT_FOUND));
        setQuantity(item, request.getQuantity(), item.getBook());
        cartItemRepository.save(item);
        return getItems(email);
    }

    @Transactional
    public List<CartItemResponse> removeItem(String email, Long bookId) {
        Cart cart = getOrCreateCart(email);
        cartItemRepository.findByCartIdAndBookId(cart.getId(), bookId).ifPresent(item -> {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        });
        return getItems(email);
    }

    private void setQuantity(CartItem item, int quantity, Book book) {
        if (quantity > book.getStock()) {
            throw new ApiException("Only " + book.getStock() + " copies are available", HttpStatus.CONFLICT);
        }
        item.setQuantity(quantity);
    }

    private Cart getOrCreateCart(String email) {
        return cartRepository.findByUserId(findUser(email).getId()).orElseGet(() -> {
            Cart cart = new Cart();
            cart.setUser(findUser(email));
            return cartRepository.save(cart);
        });
    }

    private Cart getCart(String email) {
        return cartRepository.findByUserId(findUser(email).getId()).orElseGet(() -> getOrCreateCart(email));
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.UNAUTHORIZED));
    }

    private Book findBook(Long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new ApiException("Book not found", HttpStatus.NOT_FOUND));
    }
}
