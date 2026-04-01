package com.hexaware.hotpot.dto;

public class OrderItemDTO {

    private Integer orderItemId;
    private Integer orderId;
    private Integer menuId;
    private Integer quantity;
    private double price;
    
    private String itemName; 

    public OrderItemDTO() {}

    public OrderItemDTO(Integer orderItemId, Integer orderId, Integer menuId, Integer quantity, double price, String itemName) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.menuId = menuId;
        this.quantity = quantity;
        this.price = price;
        this.itemName = itemName;
    }

   
    public Integer getOrderItemId() { return orderItemId; }
    public void setOrderItemId(Integer orderItemId) { this.orderItemId = orderItemId; }

    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }

    public Integer getMenuId() { return menuId; }
    public void setMenuId(Integer menuId) { this.menuId = menuId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
}