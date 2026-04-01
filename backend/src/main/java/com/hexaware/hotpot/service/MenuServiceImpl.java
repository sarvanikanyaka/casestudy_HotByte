package com.hexaware.hotpot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.hotpot.entity.Menu;
import com.hexaware.hotpot.repository.MenuRepository;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Override
    public Menu addMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    @Override
    public Menu updateMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    @Override
    public void deleteMenu(Integer menuId) {
        menuRepository.deleteById(menuId);
    }

    @Override
    public Menu getMenuById(Integer menuId) {
        return menuRepository.findById(menuId).orElse(null);
    }

    @Override
    public List<Menu> getAllMenu() {
        return menuRepository.findAll();
    }

    @Override
    public List<Menu> getMenuByRestaurant(Integer restaurantId) {
        return menuRepository.findAll()
                .stream()
                .filter(m -> m.getRestaurant().getRestaurantId().equals(restaurantId))
                .toList();
    }
}