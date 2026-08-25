cmake_minimum_required(VERSION 3.20)
project(map_cplusplus LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(ex01_source_to_stock src/Exercises/Restaurant/01-source-to-stock.cpp)
add_executable(ex02_stock_to_loss src/Exercises/Restaurant/02-stock-to-loss.cpp)
add_executable(ex03_product_availability src/Exercises/Restaurant/03-product-availability.cpp)
add_executable(ex04_product_calories src/Exercises/Restaurant/04-product-calories.cpp)
add_executable(ex05_build_restaurant_map src/Exercises/Restaurant/05-build-restaurant-map.cpp)

foreach(target
    ex01_source_to_stock
    ex02_stock_to_loss
    ex03_product_availability
    ex04_product_calories
    ex05_build_restaurant_map)
    target_include_directories(${target} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/src)
endforeach()
