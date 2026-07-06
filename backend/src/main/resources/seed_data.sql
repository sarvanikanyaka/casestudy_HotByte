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
(1, 'Pizza Hut', 'DownTown Square, Block A', '9876543210', 'pizzahut@example.com', 'pizza123', 'Italian, Pizza, Fast Food', 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=600', 4.4, NOW()),
(2, 'Burger King', 'Food Court Street, Mall 2', '9876543211', 'burgerking@example.com', 'burger123', 'Burgers, American, Fast Food', 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600', 4.2, NOW()),
(3, 'Biryani House', 'Royal Residency Road', '9876543212', 'biryani@example.com', 'biryani123', 'North Indian, Biryani, Mughlai', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600', 4.6, NOW()),
(4, 'Sweet Dreams Desserts', 'Pastry Lane, Ground Floor', '9876543213', 'sweet@example.com', 'sweet123', 'Desserts, Bakery, Shakes', 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600', 4.5, NOW());

-- Seed Categories
INSERT INTO categories (category_id, category_name) VALUES
(1, 'Pizza'),
(2, 'Burgers'),
(3, 'Biryani & Rice'),
(4, 'Desserts'),
(5, 'Appetizers');

-- Seed Menus
INSERT INTO menu (menu_id, restaurant_id, category_id, item_name, description, price, discount_price, availability_time, is_veg, taste_info, calories, fats, proteins, carbohydrates, cooking_time, image_url, is_available) VALUES
-- Pizza Hut (Restaurant 1)
(1, 1, 1, 'Veggie Supreme Pizza', 'Topped with bell peppers, onions, mushrooms, sweet corn, olives, and mozzarella cheese.', 399.00, 349.00, 'ALL_DAY', 1, 'Cheesy & Savory', 450, 15.00, 12.00, 52.00, 20, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400', 1),
(2, 1, 1, 'Fiery Pepperoni Pizza', 'Classic sliced pork pepperoni with rich tomato sauce and extra mozzarella cheese.', 499.00, 449.00, 'ALL_DAY', 0, 'Spicy & Cheesy', 550, 22.00, 18.00, 48.00, 18, 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=400', 1),
(3, 1, 5, 'Cheesy Garlic Bread', 'Freshly baked bread toasted with herb garlic butter and topped with melted cheese.', 149.00, 129.00, 'ALL_DAY', 1, 'Garlic & Butter', 220, 8.50, 6.00, 28.00, 10, 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=400', 1),

-- Burger King (Restaurant 2)
(4, 2, 2, 'Classic Whopper', 'Flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayo, and pickles.', 199.00, 179.00, 'LUNCH_DINNER', 0, 'Savory & Smoky', 660, 35.00, 28.00, 49.00, 15, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400', 1),
(5, 2, 2, 'Paneer King Burger', 'Crispy fried paneer patty with rich tikka sauce, shredded lettuce, and onion rings.', 179.00, 159.00, 'LUNCH_DINNER', 1, 'Spicy & Creamy', 520, 20.00, 14.00, 55.00, 12, 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400', 1),
(6, 2, 5, 'Golden Onion Rings', 'Thick-cut, batter-fried onion rings cooked to a perfect crispy golden-brown.', 119.00, 99.00, 'ALL_DAY', 1, 'Crispy & Mildly Sweet', 180, 5.00, 3.00, 24.00, 8, 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?q=80&w=400', 1),

-- Biryani House (Restaurant 3)
(7, 3, 3, 'Hyderabadi Chicken Biryani', 'Fragrant basmati rice layered with juicy chicken marinated in spices, slow-cooked in dum style.', 299.00, 269.00, 'LUNCH_DINNER', 0, 'Highly Spiced & Aromatic', 750, 25.00, 35.00, 85.00, 30, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400', 1),
(8, 3, 3, 'Special Paneer Biryani', 'Spiced basmati rice layered with soft cottage cheese cubes and fresh garden herbs.', 259.00, 229.00, 'LUNCH_DINNER', 1, 'Aromatic & Medium Spicy', 620, 18.00, 16.00, 78.00, 25, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400', 1),

-- Sweet Dreams Desserts (Restaurant 4)
(9, 4, 4, 'Choco Lava Cake', 'Delectable chocolate cake with a warm, gooey, molten chocolate center.', 129.00, 119.00, 'ALL_DAY', 1, 'Extremely Sweet & Rich', 380, 14.00, 4.50, 44.00, 12, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400', 1),
(10, 4, 4, 'Red Velvet Muffin', 'Fluffy red velvet muffin topped with cream cheese icing and vanilla crumbs.', 99.00, 89.00, 'ALL_DAY', 1, 'Creamy & Sweet', 310, 10.00, 3.50, 38.00, 10, 'https://images.unsplash.com/photo-1614707267537-b85acf00c4b8?q=80&w=400', 1);
