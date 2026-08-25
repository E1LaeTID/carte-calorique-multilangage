#pragma once
#include "container_capacity.hpp"
#include "operation.hpp"

#include <algorithm>
#include <cstddef>
#include <functional>
#include <optional>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace mapcore {
template <typename T>
class Container {
private:
    std::vector<T> items_;
    std::string name_;
    ContainerCapacity capacity_;
    bool sealed_{false};

    void ensureWritable() const {
        if (sealed_) {
            throw std::runtime_error("Container \"" + name_ + "\" is sealed.");
        }
    }

public:
    Container(std::string name, std::vector<T> items, ContainerCapacity capacity)
        : items_(std::move(items)), name_(std::move(name)), capacity_(std::move(capacity)) {}

    [[nodiscard]] std::size_t length() const noexcept { return items_.size(); }
    [[nodiscard]] bool isSealed() const noexcept { return sealed_; }
    [[nodiscard]] const std::string& name() const noexcept { return name_; }
    [[nodiscard]] const ContainerCapacity& capacity() const noexcept { return capacity_; }
    [[nodiscard]] std::vector<T> toVector() const { return items_; }

    auto begin() noexcept { return items_.begin(); }
    auto end() noexcept { return items_.end(); }
    auto begin() const noexcept { return items_.begin(); }
    auto end() const noexcept { return items_.end(); }

    void load(const T& item) {
        ensureWritable();
        items_.push_back(item);
    }

    std::optional<T> unload(std::size_t index) {
        ensureWritable();
        if (index >= items_.size()) return std::nullopt;
        T removed = std::move(items_[index]);
        items_.erase(items_.begin() + static_cast<std::ptrdiff_t>(index));
        return removed;
    }

    void move(std::size_t from, std::size_t to) {
        ensureWritable();
        if (from >= items_.size() || to >= items_.size()) {
            throw std::out_of_range("Invalid move indexes.");
        }
        T item = std::move(items_[from]);
        items_.erase(items_.begin() + static_cast<std::ptrdiff_t>(from));
        items_.insert(items_.begin() + static_cast<std::ptrdiff_t>(to), std::move(item));
    }

    void seal() noexcept { sealed_ = true; }
    void release() noexcept { sealed_ = false; }

    template <typename U>
    Container<U> map(const std::function<U(const T&, std::size_t)>& mapper) const {
        std::vector<U> output;
        output.reserve(items_.size());
        for (std::size_t i = 0; i < items_.size(); ++i) {
            output.push_back(mapper(items_[i], i));
        }
        return Container<U>(name_, std::move(output), capacity_);
    }

    Container<T> filter(const std::function<bool(const T&, std::size_t)>& predicate) const {
        std::vector<T> output;
        for (std::size_t i = 0; i < items_.size(); ++i) {
            if (predicate(items_[i], i)) output.push_back(items_[i]);
        }
        return Container<T>(name_, std::move(output), capacity_);
    }

    template <typename U>
    U reduce(const std::function<U(U, const T&, std::size_t)>& reducer, U initialValue) const {
        U accumulator = std::move(initialValue);
        for (std::size_t i = 0; i < items_.size(); ++i) {
            accumulator = reducer(std::move(accumulator), items_[i], i);
        }
        return accumulator;
    }

    template <typename U>
    Container<U> flatMap(const std::function<std::vector<U>(const T&, std::size_t)>& mapper) const {
        std::vector<U> output;
        for (std::size_t i = 0; i < items_.size(); ++i) {
            auto local = mapper(items_[i], i);
            output.insert(output.end(), local.begin(), local.end());
        }
        return Container<U>(name_, std::move(output), capacity_);
    }

    template <typename U>
    Container<U> apply(const Operation<T, U>& operation) const {
        return map<U>([&operation](const T& item, std::size_t) {
            return operation.instruction(item);
        });
    }

    template <typename U>
    Container<U> expand(const ExpandOperation<T, U>& operation) const {
        return flatMap<U>([&operation](const T& item, std::size_t) {
            return operation.instruction(item);
        });
    }

    Container<T> merge(const Container<T>& other) const {
        auto output = items_;
        auto right = other.toVector();
        output.insert(output.end(), right.begin(), right.end());
        return Container<T>(name_ + "+" + other.name(), std::move(output), capacity_);
    }

    std::pair<Container<T>, Container<T>> split(const std::function<bool(const T&)>& predicate) const {
        std::vector<T> accepted;
        std::vector<T> rejected;
        for (const auto& item : items_) {
            (predicate(item) ? accepted : rejected).push_back(item);
        }
        return {
            Container<T>(name_ + ":accepted", std::move(accepted), capacity_),
            Container<T>(name_ + ":rejected", std::move(rejected), capacity_)
        };
    }

    template <typename U>
    Container<std::pair<T, U>> combine(const Container<U>& other) const {
        auto right = other.toVector();
        const std::size_t limit = std::min(items_.size(), right.size());
        std::vector<std::pair<T, U>> output;
        output.reserve(limit);
        for (std::size_t i = 0; i < limit; ++i) {
            output.emplace_back(items_[i], right[i]);
        }
        return Container<std::pair<T, U>>(name_ + "+" + other.name(), std::move(output), capacity_);
    }
};
}
