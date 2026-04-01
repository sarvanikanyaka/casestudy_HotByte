package com.hexaware.hotpot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.hotpot.entity.Menu;
import com.hexaware.hotpot.service.MenuService;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin
public class MenuController {

    @Autowired
    private MenuService menuService;

    @PostMapping
    public Menu addMenu(@RequestBody Menu menu) {
        System.out.println(menu);
        return menuService.addMenu(menu);
    }

    @PutMapping
    public Menu updateMenu(@RequestBody Menu menu) {
        return menuService.updateMenu(menu);
    }

    @DeleteMapping("/{id}")
    public String deleteMenu(@PathVariable Integer id) {
        menuService.deleteMenu(id);
        return "Menu deleted successfully";
    }

    @GetMapping("/{id}")
    public Menu getMenu(@PathVariable Integer id) {
        return menuService.getMenuById(id);
    }

    @GetMapping
    public List<Menu> getAllMenu() {
        return menuService.getAllMenu();
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<Menu> getMenuByRestaurant(@PathVariable Integer restaurantId) {
        return menuService.getMenuByRestaurant(restaurantId);
    }

}