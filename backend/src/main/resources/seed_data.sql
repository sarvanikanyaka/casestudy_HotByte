-- Disable foreign key checks to truncate tables safely
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart_items;
TRUNCATE TABLE cart;
TRUNCATE TABLE menu;
TRUNCATE TABLE categories;
TRUNCATE TABLE restaurants;

SET FOREIGN_KEY_CHECKS = 1;

-- Seed Restaurants
INSERT INTO restaurants (restaurant_id, name, location, contact_number, email, password, cuisine_type, image_url, rating, created_at) VALUES
(1, 'Pizza Hut', 'DownTown Square, Block A', '9876543210', 'pizzahut@example.com', 'pizza123', 'Italian, Pizza, Fast Food', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600', 4.4, NOW()),
(2, 'Burger King', 'Food Court Street, Mall 2', '9876543211', 'burgerking@example.com', 'burger123', 'Burgers, American, Fast Food', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600', 4.2, NOW()),
(3, 'Biryani House', 'Royal Residency Road', '9876543212', 'biryani@example.com', 'biryani123', 'North Indian, Biryani, Mughlai', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600', 4.6, NOW()),
(4, 'Sweet Dreams Desserts', 'Pastry Lane, Ground Floor', '9876543213', 'sweet@example.com', 'sweet123', 'Desserts, Bakery, Shakes', 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600', 4.5, NOW()),
(5, 'The Pasta Factory', 'Little Italy, Lane 4', '9876543214', 'pasta@example.com', 'pasta123', 'Italian, Pasta, Sides', 'https://images.unsplash.com/photo-1563379971899-660589a01cf3?q=80&w=600', 4.3, NOW()),
(6, 'Subway Delights', 'Gym Avenue, Health Park', '9876543215', 'subway@example.com', 'subway123', 'Healthy, Sandwiches, Salads', 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=600', 4.1, NOW()),
(7, 'Taco Bell', 'Mexicana Boulevard', '9876543216', 'tacobell@example.com', 'taco123', 'Mexican, Tacos, Fast Food', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600', 4.2, NOW()),
(8, 'Sushi Zen', 'Cherry Blossom Lane', '9876543217', 'sushizen@example.com', 'sushi123', 'Japanese, Sushi, Ramen', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600', 4.7, NOW()),
(9, 'KFC Chicken', 'Highway Junction', '9876543218', 'kfc@example.com', 'kfc123', 'Fried Chicken, Fast Food', 'https://images.unsplash.com/photo-1513639776629-7b61b0ac598e?q=80&w=600', 4.3, NOW()),
(10, 'The Waffle Co.', 'Dessert Heaven Mall', '9876543219', 'waffle@example.com', 'waffle123', 'Desserts, Waffles, Pancakes', 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600', 4.5, NOW()),
(11, 'Wok Hei', 'Chinatown Market', '9876543220', 'wokhei@example.com', 'wok123', 'Chinese, Noodles, Fried Rice', 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600', 4.2, NOW()),
(12, 'The Kebab Grill', 'Spice Bazaar Road', '9876543221', 'kebab@example.com', 'kebab123', 'Middle Eastern, Kebabs, Rolls', 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600', 4.6, NOW()),
(13, 'Cafe Coffee Day', 'University Plaza', '9876543222', 'ccd@example.com', 'cafe123', 'Beverages, Cafe, Snacks', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600', 4.0, NOW()),
(14, 'Green Salad Bar', 'Fitness Club Ground', '9876543223', 'salad@example.com', 'salad123', 'Healthy, Salads, Smoothies', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600', 4.4, NOW()),
(15, 'South Indian Swad', 'Temple Road Square', '9876543224', 'southindian@example.com', 'south123', 'South Indian, Dosas, Pure Veg', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600', 4.5, NOW());

-- Seed Categories
INSERT INTO categories (category_id, category_name) VALUES
(1, 'Pizza'),
(2, 'Burgers'),
(3, 'Biryani & Rice'),
(4, 'Desserts'),
(5, 'Appetizers'),
(6, 'Pasta'),
(7, 'Sandwiches'),
(8, 'Tacos'),
(9, 'Sushi & Japanese'),
(10, 'Fried Chicken'),
(11, 'Chinese'),
(12, 'Kebabs & Wraps'),
(13, 'Beverages & Cafe'),
(14, 'Healthy & Salads'),
(15, 'South Indian');

-- Seed Menus (10 items per restaurant, total 150 items)
INSERT INTO menu (menu_id, restaurant_id, category_id, item_name, description, price, discount_price, availability_time, is_veg, taste_info, calories, fats, proteins, carbohydrates, cooking_time, image_url, is_available) VALUES
-- Restaurant 1: Pizza Hut (10 items)
(1, 1, 1, 'Veggie Supreme Pizza', 'Topped with bell peppers, onions, mushrooms, sweet corn, olives, and mozzarella cheese.', 399.00, 349.00, 'ALL_DAY', 1, 'Cheesy & Savory', 450, 15.0, 12.0, 52.0, 20, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400', 1),
(2, 1, 1, 'Fiery Pepperoni Pizza', 'Classic sliced pork pepperoni with rich tomato sauce and extra mozzarella cheese.', 499.00, 449.00, 'ALL_DAY', 0, 'Spicy & Cheesy', 550, 22.0, 18.0, 48.0, 18, 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=400', 1),
(3, 1, 1, 'Margherita Cheese Pizza', 'Simple classic pizza loaded with double mozzarella cheese and herb tomato sauce.', 299.00, 249.00, 'ALL_DAY', 1, 'Mild & Cheesy', 380, 12.0, 10.0, 45.0, 15, 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400', 1),
(4, 1, 1, 'BBQ Chicken Pizza', 'Grilled chicken tossed in smoky BBQ sauce with red onion slices and fresh cilantro.', 459.00, 399.00, 'ALL_DAY', 0, 'Smoky & Sweet', 510, 18.0, 22.0, 50.0, 20, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400', 1),
(5, 1, 1, 'Tandoori Paneer Pizza', 'Indian cottage cheese marinated in tikka spices, onions, and spicy red pepper slices.', 429.00, 379.00, 'ALL_DAY', 1, 'Spicy & Tangy', 480, 16.0, 14.0, 54.0, 18, 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?q=80&w=400', 1),
(6, 1, 5, 'Cheesy Garlic Bread', 'Freshly baked bread toasted with herb garlic butter and topped with melted cheese.', 149.00, 129.00, 'ALL_DAY', 1, 'Garlic & Butter', 220, 8.5, 6.0, 28.0, 10, 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=400', 1),
(7, 1, 5, 'Stuffed Pizza Pocket', 'Deep-fried dough pockets filled with melting cheese, sweet corn, and pizza sauce.', 129.00, 109.00, 'ALL_DAY', 1, 'Crispy & Cheesy', 290, 11.0, 5.0, 36.0, 12, 'https://images.unsplash.com/photo-1628191139360-408a06492299?q=80&w=400', 1),
(8, 1, 5, 'Spicy Chicken Wings', 'Crispy oven-baked chicken wings coated in hot buffalo sauce.', 229.00, 199.00, 'ALL_DAY', 0, 'Hot & Spicy', 340, 15.0, 24.0, 8.0, 14, 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400', 1),
(9, 1, 1, 'Mushroom & Corn Delight', 'Earthy mushrooms paired with sweet golden corn and fresh green capsicum.', 349.00, 299.00, 'ALL_DAY', 1, 'Mild & Juicy', 410, 13.0, 11.0, 50.0, 17, 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=400', 1),
(10, 1, 4, 'Hot Choco Lava Cake', 'Gooey rich chocolate cake with a molten chocolate center.', 129.00, 119.00, 'ALL_DAY', 1, 'Sweet & Rich', 350, 12.0, 4.0, 42.0, 10, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400', 1),

-- Restaurant 2: Burger King (10 items)
(11, 2, 2, 'Classic Whopper', 'Flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayo, and pickles.', 199.00, 179.00, 'LUNCH_DINNER', 0, 'Savory & Smoky', 660, 35.0, 28.0, 49.0, 15, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400', 1),
(12, 2, 2, 'Crispy Veggie Burger', 'Deep fried golden mix-vegetable patty with creamy mayo and fresh lettuce.', 129.00, 109.00, 'ALL_DAY', 1, 'Crispy & Mild', 420, 14.0, 9.0, 48.0, 10, 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400', 1),
(13, 2, 2, 'Spicy Paneer King', 'Thick paneer patty with spicy schezwan sauce and fresh onion slices.', 179.00, 159.00, 'ALL_DAY', 1, 'Spicy & Hearty', 510, 19.0, 13.0, 52.0, 12, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=400', 1),
(14, 2, 2, 'Double Cheese Whopper', 'Two juicy beef patties loaded with double cheese and classic whopper toppings.', 299.00, 269.00, 'LUNCH_DINNER', 0, 'Extra Cheesy & Smoky', 890, 48.0, 42.0, 53.0, 18, 'https://images.unsplash.com/photo-1534790566985-aae57c6a90aa?q=80&w=400', 1),
(15, 2, 5, 'Crispy Onion Rings', 'Batter-fried golden crispy sweet onion rings served with hot dip.', 119.00, 99.00, 'ALL_DAY', 1, 'Crispy & Mild', 180, 5.0, 3.0, 24.0, 8, 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?q=80&w=400', 1),
(16, 2, 5, 'Salted Golden Fries', 'Freshly fried crispy potato sticks sprinkled with fine salt.', 99.00, 79.00, 'ALL_DAY', 1, 'Salty & Crispy', 230, 8.0, 4.0, 32.0, 8, 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=400', 1),
(17, 2, 2, 'Fiery Chicken Burger', 'Crispy chicken breast patty with hot jalapeño slices and red chili dressing.', 189.00, 169.00, 'ALL_DAY', 0, 'Hot & Spicy', 480, 16.0, 22.0, 45.0, 12, 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=400', 1),
(18, 2, 2, 'Fish Fillet Burger', 'Lightly breaded crispy fish fillet topped with tangy tartar sauce and cheese.', 209.00, 189.00, 'ALL_DAY', 0, 'Tangy & Savory', 410, 12.0, 18.0, 40.0, 10, 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=400', 1),
(19, 2, 5, 'Cheesy Fries Box', 'Salted french fries loaded with liquid cheese sauce and jalapeño bits.', 159.00, 139.00, 'ALL_DAY', 1, 'Cheesy & Creamy', 360, 18.0, 6.0, 38.0, 10, 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=400', 1),
(20, 2, 13, 'Creamy Chocolate Shake', 'Rich milk chocolate blended with ice cream and topped with syrup.', 139.00, 119.00, 'ALL_DAY', 1, 'Sweet & Creamy', 290, 8.0, 5.0, 35.0, 5, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400', 1),

-- Restaurant 3: Biryani House (10 items)
(21, 3, 3, 'Hyderabadi Chicken Biryani', 'Basmati rice layered with juicy chicken marinated in spices, slow-cooked in dum style.', 299.00, 269.00, 'LUNCH_DINNER', 0, 'Spicy & Aromatic', 750, 25.0, 35.0, 85.0, 30, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400', 1),
(22, 3, 3, 'Royal Mutton Biryani', 'Rich long-grain rice slow-cooked with tender baby goat meat and aromatic herbs.', 399.00, 359.00, 'LUNCH_DINNER', 0, 'Rich & Highly Spiced', 820, 32.0, 42.0, 80.0, 35, 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=400', 1),
(23, 3, 3, 'Tandoori Paneer Biryani', 'Basmati rice loaded with soft tandoori marinated paneer cubes and saffron infusion.', 269.00, 239.00, 'LUNCH_DINNER', 1, 'Aromatic & Medium Spicy', 630, 18.0, 16.0, 78.0, 25, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400', 1),
(24, 3, 3, 'Double Egg Dum Biryani', 'Saffron-colored rice with hard-boiled eggs sautéed in a rich spicy masala.', 229.00, 199.00, 'LUNCH_DINNER', 0, 'Spiced & Savory', 580, 14.0, 18.0, 75.0, 20, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=400', 1),
(25, 3, 5, 'Paneer Tikka Grill', 'Cottage cheese chunks skewered with onions and bell peppers, grilled in tandoor.', 219.00, 189.00, 'ALL_DAY', 1, 'Smoky & Spicy', 310, 12.0, 14.0, 10.0, 15, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400', 1),
(26, 3, 5, 'Chicken Tikka Kebab', 'Boneless chicken breast pieces marinated in yogurt and spices, char-grilled.', 249.00, 219.00, 'ALL_DAY', 0, 'Spicy & Charcoal Smoky', 350, 15.0, 28.0, 6.0, 15, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400', 1),
(27, 3, 3, 'Fragrant Jeera Rice', 'Aromatic basmati rice tempered with golden cumin seeds and pure ghee.', 149.00, 129.00, 'ALL_DAY', 1, 'Buttery & Aromatic', 290, 6.0, 5.0, 55.0, 12, 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=400', 1),
(28, 3, 3, 'Steamed Basmati Rice', 'Plain fluffy steamed long-grain basmati rice served steaming hot.', 119.00, 99.00, 'ALL_DAY', 1, 'Plain & Neutral', 210, 1.0, 4.0, 45.0, 10, 'https://images.unsplash.com/photo-1516685018646-549198525c1b?q=80&w=400', 1),
(29, 3, 5, 'Cool Onion Raita', 'Churned fresh yogurt mixed with chopped onions, cucumbers, and roasted cumin.', 69.00, 59.00, 'ALL_DAY', 1, 'Cool & Tangy', 90, 3.0, 3.0, 8.0, 5, 'placeholder', 1),
(30, 3, 4, 'Royal Gulab Jamun', 'Warm golden milk-solid dumplings dipped in cardamom sugar syrup.', 89.00, 79.00, 'ALL_DAY', 1, 'Extremely Sweet & Soft', 240, 6.0, 3.0, 45.0, 8, 'placeholder', 1),

-- Restaurant 4: Sweet Dreams Desserts (10 items)
(31, 4, 4, 'Chocolate Lava Cake', 'Delectable chocolate cake with a warm gooey molten chocolate core.', 129.00, 119.00, 'ALL_DAY', 1, 'Rich Chocolate', 380, 14.0, 4.5, 44.0, 12, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400', 1),
(32, 4, 4, 'Red Velvet Cupcake', 'Soft and moist red velvet sponge cake topped with vanilla cream cheese frosting.', 99.00, 89.00, 'ALL_DAY', 1, 'Creamy & Sweet', 310, 10.0, 3.5, 38.0, 10, 'https://images.unsplash.com/photo-1614707267537-b85acf00c4b8?q=80&w=400', 1),
(33, 4, 4, 'Strawberry Cheesecake', 'Smooth baked cream cheese cake layer set on biscuit base topped with fresh strawberries.', 179.00, 159.00, 'ALL_DAY', 1, 'Tangy & Sweet', 390, 18.0, 6.0, 45.0, 8, 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=400', 1),
(34, 4, 4, 'Belgian Waffle Box', 'Freshly baked grid waffle drizzled with melted dark chocolate and white chocolate.', 149.00, 129.00, 'ALL_DAY', 1, 'Rich Chocolate & Crispy', 420, 15.0, 5.0, 50.0, 12, 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=400', 1),
(35, 4, 4, 'Chocolate Fudge Brownie', 'Chewy dense dark chocolate brownie packed with real walnuts.', 119.00, 99.00, 'ALL_DAY', 1, 'Fudgy & Nutty', 340, 12.0, 4.0, 40.0, 5, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400', 1),
(36, 4, 4, 'Creamy Mango Mousse', 'Fluffy light cold mousse layered with real fresh Alphonso mango pulp.', 139.00, 119.00, 'ALL_DAY', 1, 'Fruity & Creamy', 210, 6.0, 3.0, 32.0, 8, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400', 1),
(37, 4, 4, 'Vanilla Caramel Pudding', 'Silky smooth custard pudding topped with a thin layer of liquid caramel syrup.', 109.00, 99.00, 'ALL_DAY', 1, 'Caramel & Custard', 190, 5.0, 4.0, 30.0, 6, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400', 1),
(38, 4, 4, 'Tiramisu Pastry Slice', 'Coffee-dipped ladyfingers sponge cake layered with whipped mascarpone cheese and cocoa.', 189.00, 169.00, 'ALL_DAY', 1, 'Coffee & Creamy', 410, 16.0, 5.5, 48.0, 10, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=400', 1),
(39, 4, 4, 'Blueberry Pancake Pack', 'Fluffy pancakes served in a stack of three, topped with sweet wild blueberry syrup.', 159.00, 139.00, 'ALL_DAY', 1, 'Fruity & Fluffy', 320, 7.0, 6.0, 58.0, 12, 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400', 1),
(40, 4, 13, 'Cold Coffee Frappe', 'Chilled brewed coffee blended with ice cream and topped with cocoa powder.', 129.00, 109.00, 'ALL_DAY', 1, 'Sweet Coffee', 240, 8.0, 4.0, 36.0, 5, 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=400', 1),

-- Restaurant 5: The Pasta Factory (10 items)
(41, 5, 6, 'Spaghetti Bolognese', 'Spaghetti tossed in rich minced vegetable tomato ragout, herbs, and parmesan.', 299.00, 259.00, 'LUNCH_DINNER', 1, 'Tangy Tomato', 410, 12.0, 10.0, 55.0, 15, 'https://images.unsplash.com/photo-1563379971899-660589a01cf3?q=80&w=400', 1),
(42, 5, 6, 'Fettuccine Alfredo', 'Rich creamy butter and Parmesan sauce tossed over flat egg-free fettuccine noodles.', 329.00, 289.00, 'LUNCH_DINNER', 1, 'Creamy & Garlic', 520, 22.0, 12.0, 50.0, 15, 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400', 1),
(43, 5, 6, 'Penne Arrabbiata', 'Penne pasta tossed in spicy hot garlic red tomato sauce with sliced olives.', 279.00, 239.00, 'LUNCH_DINNER', 1, 'Hot & Tangy', 360, 8.0, 9.0, 52.0, 12, 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400', 1),
(44, 5, 6, 'Creamy Pesto Pasta', 'Spaghetti pasta tossed in aromatic fresh basil pine-nut pesto sauce with cream.', 349.00, 309.00, 'LUNCH_DINNER', 1, 'Herby & Nutty', 490, 19.0, 8.0, 48.0, 15, 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=400', 1),
(45, 5, 6, 'Cheesy Lasagna Bake', 'Layers of pasta sheets baked with rich vegetables, marinara sauce, and mozzarella.', 379.00, 339.00, 'LUNCH_DINNER', 1, 'Extra Cheesy & Baked', 580, 24.0, 16.0, 46.0, 22, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=400', 1),
(46, 5, 5, 'Herbed Bruschetta', 'Toasted bread slices rubbed with garlic and topped with fresh tomato salsa.', 149.00, 129.00, 'ALL_DAY', 1, 'Garlic & Tomato', 160, 4.0, 3.5, 24.0, 10, 'https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=400', 1),
(47, 5, 5, 'Baked Stuffed Mushrooms', 'Button mushrooms filled with garlic spinach, cream cheese, and baked.', 199.00, 179.00, 'ALL_DAY', 1, 'Garlic & Cheesy', 220, 12.0, 6.0, 12.0, 14, 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=400', 1),
(48, 5, 6, 'Mac & Four Cheese', 'Elbow macaroni baked in rich cheddar, mozzarella, gouda, and blue cheese sauce.', 319.00, 279.00, 'ALL_DAY', 1, 'Ultra Rich & Cheesy', 610, 28.0, 14.0, 48.0, 15, 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?q=80&w=400', 1),
(49, 5, 5, 'Warm Minestrone Soup', 'Traditional Italian thick vegetable soup with beans and ditalini pasta.', 139.00, 119.00, 'ALL_DAY', 1, 'Herbed Tomato Broth', 120, 1.5, 4.0, 20.0, 12, 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?q=80&w=400', 1),
(50, 5, 4, 'Classic Panna Cotta', 'Chilled creamy vanilla pudding dessert topped with a wild berry glaze.', 149.00, 129.00, 'ALL_DAY', 1, 'Vanilla & Berry', 240, 10.0, 3.0, 28.0, 8, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400', 1),

-- Restaurant 6: Subway Delights (10 items)
(51, 6, 7, 'Veggie Delite Sub', 'Freshly baked wheat bread stuffed with lettuce, tomato, cucumber, bell pepper, and olives.', 149.00, 129.00, 'ALL_DAY', 1, 'Fresh & Crisp', 230, 2.5, 8.0, 40.0, 8, 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=400', 1),
(52, 6, 7, 'Turkey Breast Sub', 'Lean sliced turkey breast with fresh vegetables and mustard sauce on honey oat bread.', 219.00, 189.00, 'ALL_DAY', 0, 'Savory & Lean', 280, 3.5, 18.0, 42.0, 10, 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=400', 1),
(53, 6, 7, 'Chicken Teriyaki Sub', 'Tender chicken breast pieces glazed with sweet teriyaki sauce, toasted with cheese.', 249.00, 219.00, 'ALL_DAY', 0, 'Sweet & Savory', 340, 4.5, 22.0, 48.0, 12, 'https://images.unsplash.com/photo-1567256569061-6877a849723f?q=80&w=400', 1),
(54, 6, 7, 'Tuna Salad Sub', 'Flaked tuna fish mixed with mayonnaise, lettuce, and onions on white bread.', 239.00, 209.00, 'ALL_DAY', 0, 'Rich & Creamy Fish', 380, 14.0, 16.0, 40.0, 10, 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=400', 1),
(55, 6, 14, 'Greek Garden Salad', 'Crispy lettuce, cherry tomatoes, cucumbers, kalamata olives, and crumbled feta cheese.', 179.00, 159.00, 'ALL_DAY', 1, 'Vinegar Tangy', 150, 9.0, 4.0, 12.0, 8, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400', 1),
(56, 6, 14, 'Chicken Caesar Salad', 'Grilled chicken slices over romaine lettuce tossed with caesar dressing and croutons.', 229.00, 199.00, 'ALL_DAY', 0, 'Garlic Creamy', 290, 12.0, 24.0, 10.0, 10, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=400', 1),
(57, 6, 7, 'Spicy Italian Sub', 'Salami and pepperoni slices toasted with melted cheese, hot peppers, and oil vinegar.', 269.00, 239.00, 'ALL_DAY', 0, 'Spicy & Salty', 450, 20.0, 18.0, 42.0, 12, 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=400', 1),
(58, 6, 7, 'Paneer Tikka Sub', 'Marinated paneer chunks grilled and served with mint mayonnaise on bread.', 199.00, 179.00, 'ALL_DAY', 1, 'Spicy Minty', 360, 11.0, 12.0, 46.0, 12, 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=400', 1),
(59, 6, 13, 'Oatmeal Raisin Cookie', 'Freshly baked soft cookie made with rolled oats and sweet raisins.', 59.00, 49.00, 'ALL_DAY', 1, 'Sweet Cinnamon', 180, 6.0, 3.0, 26.0, 5, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400', 1),
(60, 6, 13, 'Fresh Orange Juice', '100% freshly squeezed orange juice, cold-pressed without added sugar.', 99.00, 89.00, 'ALL_DAY', 1, 'Citrus Sweet', 110, 0.2, 1.5, 24.0, 5, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=400', 1),

-- Restaurant 7: Taco Bell (10 items)
(61, 7, 8, 'Double Decker Taco', 'A warm soft tortilla lined with refried beans wrapped around a crunchy beef taco shell.', 149.00, 129.00, 'ALL_DAY', 0, 'Crunchy & Beefy', 320, 12.0, 14.0, 36.0, 10, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400', 1),
(62, 7, 8, 'Cheesy Quesadilla', 'Large folded flour tortilla loaded with melted three-cheese blend and creamy jalapeño sauce.', 169.00, 149.00, 'ALL_DAY', 1, 'Spicy Cheesy', 450, 20.0, 16.0, 38.0, 10, 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80&w=400', 1),
(63, 7, 8, '7-Layer Bean Burrito', 'Rice, beans, sour cream, guacamole, lettuce, cheese, and tomatoes in a flour tortilla.', 189.00, 169.00, 'ALL_DAY', 1, 'Rich Creamy Mexican', 480, 15.0, 12.0, 62.0, 12, 'https://images.unsplash.com/photo-1626379616459-b2ce1d9edd63?q=80&w=400', 1),
(64, 7, 5, 'Loaded Nachos Supreme', 'Crispy tortilla chips topped with cheese sauce, black beans, guacamole, and sour cream.', 199.00, 179.00, 'ALL_DAY', 1, 'Crunchy & Cheesy', 510, 22.0, 8.0, 58.0, 10, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=400', 1),
(65, 7, 8, 'Crispy Fish Taco', 'Batter-fried white fish wrapped in soft corn tortilla with shredded cabbage and tartar.', 159.00, 139.00, 'ALL_DAY', 0, 'Crispy & Tangy', 290, 9.0, 12.0, 30.0, 12, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400', 1),
(66, 7, 4, 'Cinnamon Churros Pack', 'Golden-fried dough pastry sticks dusted in cardamom cinnamon sugar with caramel sauce.', 119.00, 99.00, 'ALL_DAY', 1, 'Sweet Cinnamon', 280, 10.0, 3.0, 36.0, 8, 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?q=80&w=400', 1),
(67, 7, 8, 'Spicy Chicken Burrito', 'Spiced chicken breast chunks, mexi-rice, hot red sauce wrapped in flour tortilla.', 219.00, 189.00, 'ALL_DAY', 0, 'Hot & Spicy', 420, 14.0, 20.0, 48.0, 12, 'https://images.unsplash.com/photo-1626379616459-b2ce1d9edd63?q=80&w=400', 1),
(68, 7, 5, 'Spiced Potato Bites', 'Crispy cubed potato bites dusted in Mexican cajun seasoning, served with sour cream.', 109.00, 89.00, 'ALL_DAY', 1, 'Spicy & Crispy', 190, 6.0, 2.5, 24.0, 8, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400', 1),
(69, 7, 8, 'Soft Beef Taco', 'Warm flour tortilla stuffed with ground seasoned beef, fresh lettuce, and cheddar.', 139.00, 119.00, 'ALL_DAY', 0, 'Mild Beefy', 240, 9.0, 12.0, 22.0, 10, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400', 1),
(70, 7, 13, 'Tangy Lime Margarita', 'Mocktail version of classic margarita blended with fresh lime juice, salt rim.', 99.00, 89.00, 'ALL_DAY', 1, 'Sour Lime', 80, 0.0, 0.0, 18.0, 5, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400', 1),

-- Restaurant 8: Sushi Zen (10 items)
(71, 8, 9, 'Classic Salmon Roll', 'Fresh raw salmon and sticky vinegared rice wrapped in dried seaweed (Nori).', 349.00, 319.00, 'LUNCH_DINNER', 0, 'Clean Fish & Umami', 280, 4.0, 16.0, 38.0, 15, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 1),
(72, 8, 9, 'California Crab Roll', 'Crab stick, creamy avocado, and fresh cucumber rolled inside-out with sesame seeds.', 299.00, 269.00, 'LUNCH_DINNER', 0, 'Creamy Avocado', 310, 8.0, 10.0, 42.0, 15, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 1),
(73, 8, 9, 'Shrimp Tempura Roll', 'Fried crispy shrimp tempura rolled with rice, topped with sweet unagi eel sauce.', 379.00, 339.00, 'LUNCH_DINNER', 0, 'Crunchy & Sweet Glaze', 380, 12.0, 14.0, 48.0, 18, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 1),
(74, 8, 9, 'Shoyu Chicken Ramen', 'Rich soy-infused chicken broth served with wheat noodles, soft egg, and bamboo shoots.', 329.00, 299.00, 'LUNCH_DINNER', 0, 'Salty Soy Broth', 520, 14.0, 24.0, 62.0, 20, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=400', 1),
(75, 8, 5, 'Pork Gyoza Dumplings', 'Pan-fried Japanese dumplings stuffed with minced pork and chives, soy vinegar dip.', 219.00, 189.00, 'ALL_DAY', 0, 'Garlicky & Savory', 260, 10.0, 12.0, 22.0, 12, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400', 1),
(76, 8, 5, 'Steamed Edamame Pods', 'Boiled fresh green soybean pods sprinkled with coarse sea salt crystals.', 129.00, 109.00, 'ALL_DAY', 1, 'Salty & Earthy', 110, 2.0, 8.0, 12.0, 8, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400', 1),
(77, 8, 9, 'Vegetable Maki Roll', 'Roll filled with crisp carrot sticks, cucumber, and pickled daikon radish.', 249.00, 219.00, 'ALL_DAY', 1, 'Fresh & Crisp', 210, 1.5, 4.0, 36.0, 12, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 1),
(78, 8, 5, 'Traditional Miso Soup', 'Warm Japanese seaweed and soft tofu cube soup based on fermented soybean paste.', 109.00, 89.00, 'ALL_DAY', 1, 'Mild & Salty Fermented', 80, 1.5, 3.0, 6.0, 6, 'https://images.unsplash.com/photo-1607301413117-e097f5a07ee5?q=80&w=400', 1),
(79, 8, 9, 'Raw Tuna Nigiri', 'Sliced raw premium yellowfin tuna laid over hand-pressed vinegared rice.', 319.00, 289.00, 'LUNCH_DINNER', 0, 'Clean Melt-in-mouth', 220, 1.0, 14.0, 28.0, 12, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 1),
(80, 8, 4, 'Sweet Mango Mochi', 'Chilled sweet sticky rice cakes filled with premium mango ice cream.', 149.00, 129.00, 'ALL_DAY', 1, 'Sweet Mango Ice', 180, 4.0, 2.0, 30.0, 5, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400', 1),

-- Restaurant 9: KFC Chicken (10 items)
(81, 9, 10, 'Fried Chicken Drumstick', 'Fresh chicken drumstick coated in original recipe herbs and pressure fried.', 119.00, 99.00, 'ALL_DAY', 0, 'Crispy & Salty', 290, 18.0, 16.0, 12.0, 10, 'https://images.unsplash.com/photo-1513639776629-7b61b0ac598e?q=80&w=400', 1),
(82, 9, 10, 'Spicy Hot Wings Pack', 'Crispy batter-fried spicy hot chicken wings (Pack of 4).', 189.00, 169.00, 'ALL_DAY', 0, 'Hot & Extra Crispy', 380, 22.0, 20.0, 16.0, 10, 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400', 1),
(83, 9, 10, 'Crispy Chicken Popcorn', 'Bite-sized chicken breast nuggets breaded and fried to golden-brown crisp.', 159.00, 139.00, 'ALL_DAY', 0, 'Crispy Herb Salty', 310, 16.0, 15.0, 20.0, 8, 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=400', 1),
(84, 9, 2, 'Spicy Chicken Zinger', 'Crispy double-breaded chicken breast fillet topped with lettuce and spicy mayo.', 179.00, 159.00, 'ALL_DAY', 0, 'Crispy & Spicy', 490, 22.0, 24.0, 44.0, 12, 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=400', 1),
(85, 9, 5, 'Creamy Coleslaw Cup', 'Finely shredded cabbage and carrots mixed with sweet creamy mayonnaise dressing.', 69.00, 59.00, 'ALL_DAY', 1, 'Sweet & Cool Creamy', 140, 10.0, 1.5, 12.0, 5, 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400', 1),
(86, 9, 5, 'Mashed Potatoes & Gravy', 'Fluffy whipped hot potatoes served with hot chicken broth brown gravy.', 89.00, 79.00, 'ALL_DAY', 0, 'Buttery & Savory Gravy', 180, 8.0, 3.0, 22.0, 8, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400', 1),
(87, 9, 10, 'Golden Chicken Strips', 'Tender boneless chicken strips breaded in hot seasoning and fried.', 169.00, 149.00, 'ALL_DAY', 0, 'Crispy & Hot Spicy', 320, 14.0, 22.0, 18.0, 10, 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=400', 1),
(88, 9, 10, 'Crispy Chicken Nuggets', 'Minced chicken nuggets fried to golden-brown crisp, served with honey mustard.', 139.00, 119.00, 'ALL_DAY', 0, 'Herb Crispy', 270, 12.0, 14.0, 18.0, 8, 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=400', 1),
(89, 9, 5, 'Creamy Garlic Dip', 'Rich thick mayonnaise infused with strong roasted garlic powder.', 49.00, 39.00, 'ALL_DAY', 1, 'Strong Garlic Cream', 120, 11.0, 0.5, 4.0, 5, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 1),
(90, 9, 13, 'Chilled Coca Cola Can', 'Ice-cold carbonated sweet cola drink can (330ml).', 59.00, 49.00, 'ALL_DAY', 1, 'Sweet Fizzy', 140, 0.0, 0.0, 35.0, 2, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400', 1),

-- Restaurant 10: The Waffle Co. (10 items)
(91, 10, 4, 'Nutella Waffle', 'Hot grid waffle layered with rich hazelnut chocolate spread and fresh banana.', 149.00, 129.00, 'ALL_DAY', 1, 'Hazelnut Chocolate', 450, 18.0, 6.0, 55.0, 12, 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=400', 1),
(92, 10, 4, 'Blueberry Pancake Stack', 'Warm fluffy pancakes stacked with sweet blueberry compote and whipped butter.', 159.00, 139.00, 'ALL_DAY', 1, 'Berry Sweet & Fluffy', 330, 8.0, 5.0, 58.0, 12, 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400', 1),
(93, 10, 4, 'Classic Maple Waffle', 'Traditional baked waffle served with real maple syrup cup and butter.', 119.00, 99.00, 'ALL_DAY', 1, 'Butter & Maple Sweet', 310, 9.0, 4.5, 48.0, 10, 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=400', 1),
(94, 10, 5, 'Crispy Waffle Fries', 'Grid-cut potato fries tossed in mild salt and onion seasoning.', 129.00, 109.00, 'ALL_DAY', 1, 'Salty Onion Crispy', 220, 8.0, 3.5, 30.0, 10, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400', 1),
(95, 10, 13, 'Oreo Milkshake Jar', 'Thick vanilla milkshake blended with real Oreo cookies and chocolate drizzle.', 149.00, 129.00, 'ALL_DAY', 1, 'Choco Vanilla Cookie', 390, 14.0, 6.0, 52.0, 8, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400', 1),
(96, 10, 4, 'Fresh Strawberry Waffle', 'Waffle topped with sliced sweet strawberries, strawberry syrup, and whipped cream.', 169.00, 149.00, 'ALL_DAY', 1, 'Fruity & Creamy Sweet', 380, 12.0, 5.0, 52.0, 12, 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=400', 1),
(97, 10, 4, 'Maple Syrup Pancakes', 'Stack of three pancakes served with golden maple syrup and butter block.', 139.00, 119.00, 'ALL_DAY', 1, 'Butter Sweet', 290, 6.5, 4.0, 50.0, 10, 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=400', 1),
(98, 10, 4, 'Banana Split Sundae', 'Whole banana sliced lengthwise, topped with vanilla, chocolate scoops, nuts.', 189.00, 169.00, 'ALL_DAY', 1, 'Sweet Fruits & Ice', 420, 14.0, 5.0, 60.0, 10, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400', 1),
(99, 10, 13, 'Rich Hot Chocolate', 'Steamed whole milk blended with real Swiss dark chocolate and marshmallow.', 139.00, 119.00, 'ALL_DAY', 1, 'Rich Dark Cocoa', 270, 9.0, 6.0, 38.0, 8, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400', 1),
(100, 10, 4, 'Decadent Waffle Sundae', 'Quarter waffles served hot with vanilla ice cream, hot fudge, nuts.', 199.00, 179.00, 'ALL_DAY', 1, 'Hot Fudge & Cold Ice', 490, 20.0, 6.5, 65.0, 12, 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=400', 1),

-- Restaurant 11: Wok Hei (10 items)
(101, 11, 11, 'Veg Chow Mein', 'Stir-fried wheat noodles with sliced cabbage, carrots, spring onions, and dark soy.', 179.00, 159.00, 'LUNCH_DINNER', 1, 'Salty Soy Garlic', 380, 8.0, 7.0, 64.0, 15, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400', 1),
(102, 11, 11, 'Chicken Fried Rice', 'Long-grain rice stir-fried in a hot wok with egg, diced chicken, and soy sauce.', 219.00, 189.00, 'LUNCH_DINNER', 0, 'Garlic Soy Savory', 490, 12.0, 18.0, 70.0, 12, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=400', 1),
(103, 11, 5, 'Crispy Spring Rolls', 'Thin rolled pastry sheets filled with spiced vegetables, fried crisp (Pack of 3).', 129.00, 109.00, 'ALL_DAY', 1, 'Crispy Spicy Ginger', 210, 8.0, 4.0, 28.0, 10, 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400', 1),
(104, 11, 5, 'Steamed Veg Dumplings', 'Handmade wrapper dough stuffed with minced cabbage, soy paneer, steamed (Pack of 5).', 149.00, 129.00, 'ALL_DAY', 1, 'Garlic Soy Umami', 180, 2.0, 6.0, 32.0, 12, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400', 1),
(105, 11, 11, 'Kung Pao Chicken', 'Sautéed chicken cubes with roasted peanuts, bell peppers, dry red chilies, dark glaze.', 269.00, 239.00, 'LUNCH_DINNER', 0, 'Sweet, Spicy & Nutty', 440, 16.0, 28.0, 22.0, 15, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=400', 1),
(106, 11, 11, 'Sweet & Sour Pork', 'Batter-fried pork slices coated in bright red pineapple sweet vinegar sauce.', 289.00, 259.00, 'LUNCH_DINNER', 0, 'Tangy Sweet Fruity', 480, 20.0, 22.0, 38.0, 15, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=400', 1),
(107, 11, 5, 'Hot & Sour Soup', 'Traditional Chinese thick spicy soup loaded with bamboo shoots, tofu, and vinegar.', 129.00, 109.00, 'ALL_DAY', 1, 'Hot Spicy & Sour', 110, 1.5, 3.5, 18.0, 10, 'https://images.unsplash.com/photo-1547592165-e1d17fed6005?q=80&w=400', 1),
(108, 11, 11, 'Fiery Chili Chicken', 'Chicken cubes tossed with green chilies, onions, garlic, and dark soy chili paste.', 249.00, 219.00, 'ALL_DAY', 0, 'Hot & Garlicky Spicy', 390, 14.0, 26.0, 18.0, 14, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=400', 1),
(109, 11, 11, 'Veg Manchurian Gravy', 'Golden fried mix-veg balls simmered in coriander ginger garlic soya sauce.', 199.00, 179.00, 'LUNCH_DINNER', 1, 'Garlic Coriander Soy', 320, 10.0, 5.0, 48.0, 15, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=400', 1),
(110, 11, 4, 'Chilled Honey Noodles', 'Crispy fried flat noodles tossed in hot honey syrup, served with vanilla ice cream.', 129.00, 109.00, 'ALL_DAY', 1, 'Sweet Honey & Ice', 310, 10.0, 4.0, 45.0, 8, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400', 1),

-- Restaurant 12: The Kebab Grill (10 items)
(111, 12, 12, 'Chicken Shawarma Wrap', 'Shredded roasted chicken roll wrapped in pita bread with garlic sauce and pickles.', 179.00, 159.00, 'ALL_DAY', 0, 'Garlic Roast Chicken', 410, 16.0, 24.0, 32.0, 10, 'https://images.unsplash.com/photo-1626700051175-6518c4793fdf?q=80&w=400', 1),
(112, 12, 12, 'Minced Lamb Kebab', 'Ground baby lamb mixed with onions, cilantro, spices, skewered and grilled.', 299.00, 269.00, 'LUNCH_DINNER', 0, 'Spiced Lamb Minty', 360, 20.0, 28.0, 4.0, 15, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=400', 1),
(113, 12, 12, 'Skewered Seekh Kebab', 'Spiced chicken mince rolls grilled over hot charcoals in tandoor.', 249.00, 219.00, 'LUNCH_DINNER', 0, 'Smoky Spicy Cumin', 320, 15.0, 26.0, 6.0, 15, 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=400', 1),
(114, 12, 5, 'Hummus & Pita Bread', 'Pureed chickpeas tahini dip served with two warm fresh fluffy pita breads.', 159.00, 139.00, 'ALL_DAY', 1, 'Nutty & Garlic Olive oil', 280, 12.0, 8.0, 38.0, 8, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 1),
(115, 12, 12, 'Spiced Falafel Wrap', 'Deep-fried chickpea balls wrapped in pita with hummus, tahini, salad greens.', 149.00, 129.00, 'ALL_DAY', 1, 'Crunchy Herbed Hummus', 370, 11.0, 10.0, 45.0, 10, 'https://images.unsplash.com/photo-1626700051175-6518c4793fdf?q=80&w=400', 1),
(116, 12, 12, 'Grilled Charcoal Veggies', 'Paneer cubes, bell peppers, tomatoes, and mushrooms tossed in lemon butter spice.', 199.00, 179.00, 'ALL_DAY', 1, 'Lemon Butter Herb', 180, 8.0, 6.0, 14.0, 12, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400', 1),
(117, 12, 12, 'Full Tandoori Chicken', 'Whole chicken marinated in red yogurt tikka spices, slow-roasted in clay oven.', 459.00, 399.00, 'LUNCH_DINNER', 0, 'Hot Tandoori Tikka', 720, 28.0, 68.0, 12.0, 25, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400', 1),
(118, 12, 12, 'Tandoori Paneer Tikka', 'Spicy dry paneer cubes grilled on skewers with onions, capsicums.', 229.00, 199.00, 'ALL_DAY', 1, 'Spicy Tikka Minty', 290, 14.0, 15.0, 8.0, 15, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400', 1),
(119, 12, 5, 'Spicy Garlic Sauce', 'Toum-style fluffy garlic white dip made of fresh garlic, oil, lemon juice.', 49.00, 39.00, 'ALL_DAY', 1, 'Hot Garlic Citric', 180, 19.0, 0.2, 2.0, 5, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400', 1),
(120, 12, 4, 'Royal Honey Baklava', 'Layered golden puff pastry sheets filled with chopped walnuts, honey syrup (Pack of 2).', 149.00, 129.00, 'ALL_DAY', 1, 'Honey Nutty Flaky', 340, 16.0, 4.0, 40.0, 5, 'https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?q=80&w=400', 1),

-- Restaurant 13: Cafe Coffee Day (10 items)
(121, 13, 13, 'Espresso Coffee Shot', 'Single shot of bold, dark roasted coffee beans under high pressure.', 79.00, 69.00, 'ALL_DAY', 1, 'Strong Bitter', 5, 0.0, 0.2, 0.8, 3, 'https://images.unsplash.com/photo-1510972527470-416f39b57569?q=80&w=400', 1),
(122, 13, 13, 'Hot Cappuccino', 'Equal parts of hot espresso shot, steamed milk, and thick milk foam top.', 129.00, 109.00, 'ALL_DAY', 1, 'Creamy Coffee Milk', 120, 4.0, 5.0, 15.0, 4, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400', 1),
(123, 13, 13, 'Chilled Iced Latte', 'Cold milk poured over hot espresso shot with caramel syrup and ice cubes.', 149.00, 129.00, 'ALL_DAY', 1, 'Caramel Cold Milk', 210, 6.0, 4.0, 28.0, 4, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400', 1),
(124, 13, 13, 'Green Tea Cup', 'Hot brewed fresh green tea leaves infused with natural honey and lemon juice.', 99.00, 89.00, 'ALL_DAY', 1, 'Herbal Citrus Sweet', 30, 0.0, 0.1, 7.0, 3, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400', 1),
(125, 13, 13, 'Double Chocolate Cookie', 'Giant freshly baked chewy cookie loaded with milk and dark chocolate chips.', 89.00, 79.00, 'ALL_DAY', 1, 'Cocoa Butter Sweet', 260, 12.0, 3.5, 34.0, 5, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400', 1),
(126, 13, 13, 'Blueberry Muffin Cup', 'Soft and moist muffin cupcake packed with wild blueberry fruits.', 109.00, 99.00, 'ALL_DAY', 1, 'Fruity Cake Sweet', 280, 10.0, 4.0, 36.0, 5, 'https://images.unsplash.com/photo-1614707267537-b85acf00c4b8?q=80&w=400', 1),
(127, 13, 7, 'Ham & Cheese Croissant', 'Flaky, buttery baked croissant laminated and stuffed with cheese and chicken ham.', 169.00, 149.00, 'ALL_DAY', 0, 'Buttery Salty Flaky', 390, 18.0, 12.0, 38.0, 10, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400', 1),
(128, 13, 13, 'Spiced Cinnamon Roll', 'Fluffy yeast roll dough loaded with brown sugar cinnamon glaze and icing.', 129.00, 109.00, 'ALL_DAY', 1, 'Sweet Cinnamon Yeast', 310, 8.0, 4.0, 48.0, 8, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400', 1),
(129, 13, 13, 'Steamed Chocolate Cocoa', 'Hot whole milk blended with thick premium cocoa powder and vanilla extract.', 119.00, 99.00, 'ALL_DAY', 1, 'Rich Milky Chocolate', 230, 7.0, 6.0, 28.0, 6, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400', 1),
(130, 13, 13, 'Fresh Lemon Iced Tea', 'Brewed black tea chilled and mixed with lemon pulp, fresh mint leaves, honey.', 99.00, 89.00, 'ALL_DAY', 1, 'Cold Citrus Minty', 90, 0.0, 0.0, 22.0, 5, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400', 1),

-- Restaurant 14: Green Salad Bar (10 items)
(131, 14, 14, 'Classic Caesar Salad', 'Fresh crisp romaine lettuce tossed in creamy garlic parmesan caesar dressing with croutons.', 189.00, 169.00, 'ALL_DAY', 1, 'Creamy Garlic Cheese', 210, 14.0, 6.0, 15.0, 8, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=400', 1),
(132, 14, 14, 'Feta Cheese Greek Salad', 'Cucumbers, black olives, cherry tomatoes, sliced onions, tossed in olive oil vinaigrette.', 199.00, 179.00, 'ALL_DAY', 1, 'Olive Oil Vinegary', 180, 12.0, 5.0, 10.0, 8, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400', 1),
(133, 14, 14, 'Superfood Quinoa Bowl', 'Fluffy cooked quinoa mixed with steamed green beans, shredded carrots, seeds, and lemon.', 249.00, 219.00, 'ALL_DAY', 1, 'Clean Earthy Citric', 340, 6.0, 10.0, 58.0, 12, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400', 1),
(134, 14, 14, 'Avocado Spinach Salad', 'Fresh baby spinach leaves paired with sliced ripe avocado and light olive oil wash.', 269.00, 239.00, 'ALL_DAY', 1, 'Creamy Nutty Greens', 290, 22.0, 4.0, 12.0, 8, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400', 1),
(135, 14, 14, 'Summer Fresh Fruit Bowl', 'Mix of diced apple, banana, pomegranate seeds, orange segments in sweet honey glaze.', 149.00, 129.00, 'ALL_DAY', 1, 'Sweet Fruity Fresh', 160, 0.5, 2.0, 36.0, 8, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400', 1),
(136, 14, 13, 'Detox Green Smoothie', 'Blended baby spinach, green apple, cucumber juice, mint, and fresh lime juice.', 129.00, 109.00, 'ALL_DAY', 1, 'Fresh Green Alkaline', 110, 0.5, 2.0, 22.0, 6, 'https://images.unsplash.com/photo-1610970881699-44a5587caa90?q=80&w=400', 1),
(137, 14, 13, 'Banana Whey Protein Shake', 'Vanilla whey protein powder blended with whole milk and ripe sweet banana.', 179.00, 159.00, 'ALL_DAY', 1, 'Vanilla Sweet Milk', 320, 6.0, 26.0, 38.0, 5, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400', 1),
(138, 14, 14, 'Waldorf Nutty Salad', 'Fresh apple slices, grapes, celery stalk, toasted walnuts in sweet yogurt coating.', 189.00, 169.00, 'ALL_DAY', 1, 'Sweet Creamy Nutty', 240, 14.0, 3.5, 24.0, 10, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400', 1),
(139, 14, 14, 'Tomato Caprese Salad', 'Thick ripe tomato slices layered with fresh buffalo mozzarella cheese, basil leaves.', 219.00, 189.00, 'ALL_DAY', 1, 'Milky Cheese Basil', 220, 15.0, 9.0, 8.0, 10, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400', 1),
(140, 14, 13, 'Herbal Ginger Lemon Tea', 'Steamed green tea leaves infused with crushed raw ginger root and fresh lemon.', 99.00, 89.00, 'ALL_DAY', 1, 'Hot Spicy Ginger Tang', 20, 0.0, 0.1, 5.0, 5, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400', 1),

-- Restaurant 15: South Indian Swad (10 items)
(141, 15, 15, 'Royal Masala Dosa', 'Golden crispy fermented rice crepe folded over seasoned spiced potato mash.', 139.00, 119.00, 'ALL_DAY', 1, 'Spiced Potato Savory', 340, 8.0, 6.0, 58.0, 12, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400', 1),
(142, 15, 15, 'Steamed Idli Sambhar', 'Soft, fluffy steamed fermented rice-lentil cakes served with hot spicy lentil soup (2 Pcs).', 99.00, 79.00, 'ALL_DAY', 1, 'Sour Lentil Tangy', 190, 1.0, 6.0, 40.0, 10, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400', 1),
(143, 15, 15, 'Crispy Medu Vada', 'Deep fried savory doughnut shaped lentil fritters spiced with black peppercorns (2 Pcs).', 109.00, 89.00, 'ALL_DAY', 1, 'Pepper Crispy Lentil', 260, 12.0, 7.0, 32.0, 10, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400', 1),
(144, 15, 15, 'Double Onion Uttapam', 'Thick savory pancake topped with chopped red onions, green chilies, and cilantro.', 129.00, 109.00, 'ALL_DAY', 1, 'Onion Sweet Savory', 290, 6.0, 5.0, 50.0, 12, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400', 1),
(145, 15, 15, 'Crispy Rava Dosa', 'Lacy, extra crispy semolina crepe spiced with black pepper and green chilies.', 149.00, 129.00, 'ALL_DAY', 1, 'Cumin Pepper Crispy', 310, 8.0, 5.0, 52.0, 15, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400', 1),
(146, 15, 5, 'Fresh Coconut Chutney', 'Traditional dip made of freshly grated coconut, green chilies, mustard oil temper.', 49.00, 39.00, 'ALL_DAY', 1, 'Coconut Mustard Temper', 110, 9.0, 1.2, 5.0, 5, 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400', 1),
(147, 15, 13, 'Foamy Filter Coffee', 'Traditional South Indian chicory blend coffee poured dynamically with hot milk.', 79.00, 69.00, 'ALL_DAY', 1, 'Sweet Milky Coffee Froth', 130, 4.0, 4.0, 18.0, 5, 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400', 1),
(148, 15, 15, 'Tangy Lemon Rice', 'Steamed rice mixed with turmeric, fresh lemon juice, roasted peanuts, curry leaves.', 129.00, 109.00, 'ALL_DAY', 1, 'Lemon Citrus Nutty', 280, 5.0, 4.5, 54.0, 10, 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=400', 1),
(149, 15, 15, 'Savory Veg Upma', 'Roasted semolina cooked to a thick porridge with mix vegetables and mustard tempering.', 99.00, 79.00, 'ALL_DAY', 1, 'Mild Herb Mustard', 210, 4.5, 4.0, 38.0, 8, 'placeholder', 1),
(150, 15, 4, 'Sweet Kesari Bath', 'Rich dessert made of semolina roasted in ghee, saffron threads, and cashew nuts.', 109.00, 89.00, 'ALL_DAY', 1, 'Ghee Saffron Sweet', 320, 12.0, 3.0, 48.0, 8, 'placeholder', 1);
