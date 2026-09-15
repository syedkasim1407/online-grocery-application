package com.onlinegrocery.backend.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


import org.springframework.stereotype.Service;

import com.onlinegrocery.backend.dto.OrderItemResponseDTO;
import com.onlinegrocery.backend.dto.OrderRequestDTO;
import com.onlinegrocery.backend.dto.OrderResponseDTO;
import com.onlinegrocery.backend.enums.Status;
import com.onlinegrocery.backend.model.Cart;
import com.onlinegrocery.backend.model.CartItem;
import com.onlinegrocery.backend.model.Order;
import com.onlinegrocery.backend.model.OrderItem;
import com.onlinegrocery.backend.model.User;
import com.onlinegrocery.backend.repository.CartItemRepository;
import com.onlinegrocery.backend.repository.CartRepository;
import com.onlinegrocery.backend.repository.OrderItemRepository;
import com.onlinegrocery.backend.repository.OrderRepository;
import com.onlinegrocery.backend.repository.UserRepository;
import com.onlinegrocery.backend.security.SecurityUtil;


@Service
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderServiceImpl(OrderRepository orderRepository, UserRepository userRepository,
        CartRepository cartRepository,CartItemRepository cartItemRepository,
            OrderItemRepository orderItemRepository) {

        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderResponseDTO placeOrder(OrderRequestDTO request,Long userId) {

        // Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + userId));

        // Find cart
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found for user id: " + userId));

        // Check cart
        if (cart.getCartItems().isEmpty()) {
            
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getCartItems()) {
            totalAmount = totalAmount.add(cartItem.getPrice());
        }

        // Create Order
        Order order = Order.builder()
                .deliveryAddress(request.getDeliveryAddress())
                .paymentMethod(request.getPaymentMethod())
                .user(user)
                .status(Status.PENDING)
                .totalAmount(totalAmount)
                .build();

        // Convert CartItems -> OrderItems
        for (CartItem cartItem : cart.getCartItems()) {

            OrderItem orderItem = OrderItem.builder()
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getPrice())
                    .order(order)
                    .build();

            // Maintain both sides of relationship
            order.getOrderItems().add(orderItem);
        }

        // Save Order
        // CascadeType.ALL automatically saves OrderItems
        Order savedOrder = orderRepository.save(order);

        // Build OrderItem response DTOs
        List<OrderItemResponseDTO> itemResponses = new ArrayList<>();

        for (OrderItem orderItem : savedOrder.getOrderItems()) {

            OrderItemResponseDTO itemResponse =
                    OrderItemResponseDTO.builder()
                            .quantity(orderItem.getQuantity())
                            .price(orderItem.getPrice())
                            .productName(orderItem.getProduct().getName())
                            .productImageUrl(orderItem.getProduct().getImageUrl())
                            .unit(orderItem.getProduct().getUnit())
                            .brand(orderItem.getProduct().getBrand())
                            .build();

            itemResponses.add(itemResponse);
        }

        // Clear Cart
        cart.getCartItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);

        cartRepository.save(cart);

        // Return OrderResponseDTO
        return OrderResponseDTO.builder()
                .orderDate(savedOrder.getOrderDate())
                .totalAmount(savedOrder.getTotalAmount())
                .deliveryAddress(savedOrder.getDeliveryAddress())
                .status(savedOrder.getStatus().name())
                .paymentMethod(savedOrder.getPaymentMethod().name())
                .orderItems(itemResponses)
                .build();
    }
    
    @Override
    public List<OrderResponseDTO> getOrdersByUser(Long userId) 
    {
        List<Order> orders=orderRepository.findByUserId(userId);
        List<OrderResponseDTO> response=new ArrayList<>();

        for(Order eachOrder:orders)
        {
            List<OrderItemResponseDTO> itemResponses = new ArrayList<>();
            for (OrderItem orderItem : eachOrder.getOrderItems()) {
                OrderItemResponseDTO itemResponse =
                        OrderItemResponseDTO.builder()
                                .quantity(orderItem.getQuantity())
                                .price(orderItem.getPrice())
                                .productName(orderItem.getProduct().getName())
                                .productImageUrl(orderItem.getProduct().getImageUrl())
                                .unit(orderItem.getProduct().getUnit())
                                .brand(orderItem.getProduct().getBrand())
                                .build();

                itemResponses.add(itemResponse);
            }

            // Build Order Response DTO
            OrderResponseDTO orderResponse= OrderResponseDTO.builder()
                    .orderDate(eachOrder.getOrderDate())
                    .totalAmount(eachOrder.getTotalAmount())
                    .deliveryAddress(eachOrder.getDeliveryAddress())
                    .status(eachOrder.getStatus().name())
                    .paymentMethod(eachOrder.getPaymentMethod().name())
                    .orderItems(itemResponses)
                    .build();

            response.add(orderResponse);
            
        }
        return response;

    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        List<Order> orders=orderRepository.findAll();
        if(orders.isEmpty())
        {
            throw new RuntimeException("No order placed till now");
        }
        List<OrderResponseDTO> response=new ArrayList<>();

        for(Order eachOrder:orders)
        {
            List<OrderItemResponseDTO> itemResponses = new ArrayList<>();
            for (OrderItem orderItem : eachOrder.getOrderItems()) {
                OrderItemResponseDTO itemResponse =
                        OrderItemResponseDTO.builder()
                                .quantity(orderItem.getQuantity())
                                .price(orderItem.getPrice())
                                .productName(orderItem.getProduct().getName())
                                .productImageUrl(orderItem.getProduct().getImageUrl())
                                .unit(orderItem.getProduct().getUnit())
                                .brand(orderItem.getProduct().getBrand())
                                .build();

                itemResponses.add(itemResponse);
            }

            // Build Order Response DTO
            OrderResponseDTO orderResponse= OrderResponseDTO.builder()
                    .orderDate(eachOrder.getOrderDate())
                    .totalAmount(eachOrder.getTotalAmount())
                    .deliveryAddress(eachOrder.getDeliveryAddress())
                    .status(eachOrder.getStatus().name())
                    .paymentMethod(eachOrder.getPaymentMethod().name())
                    .orderItems(itemResponses)
                    .build();

            response.add(orderResponse);
            
        }
        return response;


    }

    @Override
    public OrderResponseDTO updateOrderStatus(Long orderId, String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(Status.valueOf(status.toUpperCase()));

        Order savedOrder=orderRepository.save(order);
        List<OrderItemResponseDTO> itemResponses = new ArrayList<>();

        for (OrderItem orderItem : savedOrder.getOrderItems()) {

            OrderItemResponseDTO itemResponse =
                    OrderItemResponseDTO.builder()
                            .quantity(orderItem.getQuantity())
                            .price(orderItem.getPrice())
                            .productName(orderItem.getProduct().getName())
                            .productImageUrl(orderItem.getProduct().getImageUrl())
                            .unit(orderItem.getProduct().getUnit())
                            .brand(orderItem.getProduct().getBrand())
                            .build();

            itemResponses.add(itemResponse);
        }

        // Build OrderResponseDTO
        OrderResponseDTO orderResponse =
                OrderResponseDTO.builder()
                        .orderDate(savedOrder.getOrderDate())
                        .totalAmount(savedOrder.getTotalAmount())
                        .deliveryAddress(savedOrder.getDeliveryAddress())
                        .status(savedOrder.getStatus().name())
                        .paymentMethod(savedOrder.getPaymentMethod().name())
                        .orderItems(itemResponses)
                        .build();

        return orderResponse;

    }
    
}
