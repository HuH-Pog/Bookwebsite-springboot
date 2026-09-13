package com.example.demo.controller;

import com.example.demo.dto.CartItemRequest;
import com.example.demo.dto.CartItemResponse;
import com.example.demo.service.CartService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItemResponse> getCart(Authentication authentication) {
        return cartService.getItems(authentication.getName());
    }

    @PostMapping("/items")
    public List<CartItemResponse> addItem(Authentication authentication,
                                          @Valid @RequestBody CartItemRequest request) {
        return cartService.addItem(authentication.getName(), request);
    }

    @PatchMapping("/items/{bookId}")
    public List<CartItemResponse> updateItem(Authentication authentication,
                                             @PathVariable Long bookId,
                                             @Valid @RequestBody CartItemRequest request) {
        return cartService.updateItem(authentication.getName(), bookId, request);
    }

    @DeleteMapping("/items/{bookId}")
    public List<CartItemResponse> removeItem(Authentication authentication, @PathVariable Long bookId) {
        return cartService.removeItem(authentication.getName(), bookId);
    }
}
