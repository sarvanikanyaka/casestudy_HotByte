package com.hexaware.hotpot.service;

import java.util.List;
import com.hexaware.hotpot.entity.Menu;

public interface MenuService {

    Menu addMenu(Menu menu);

    Menu updateMenu(Menu menu);

    void deleteMenu(Integer menuId);

    Menu getMenuById(Integer menuId);

    List<Menu> getAllMenu();

    List<Menu> getMenuByRestaurant(Integer restaurantId);
}