package com.cookmyfood.app.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Menu.
 */
@Entity
@Table(name = "menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "foodname")
    private String foodname;

    @Column(name = "cost")
    private Long cost;

    @OneToMany(mappedBy = "menu")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Order> orders = new HashSet<>();

    @OneToMany(mappedBy = "menu")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Vendor> vendors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoodname() {
        return foodname;
    }

    public Menu foodname(String foodname) {
        this.foodname = foodname;
        return this;
    }

    public void setFoodname(String foodname) {
        this.foodname = foodname;
    }

    public Long getCost() {
        return cost;
    }

    public Menu cost(Long cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public Menu orders(Set<Order> orders) {
        this.orders = orders;
        return this;
    }

    public Menu addOrder(Order order) {
        this.orders.add(order);
        order.setMenu(this);
        return this;
    }

    public Menu removeOrder(Order order) {
        this.orders.remove(order);
        order.setMenu(null);
        return this;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public Set<Vendor> getVendors() {
        return vendors;
    }

    public Menu vendors(Set<Vendor> vendors) {
        this.vendors = vendors;
        return this;
    }

    public Menu addVendor(Vendor vendor) {
        this.vendors.add(vendor);
        vendor.setMenu(this);
        return this;
    }

    public Menu removeVendor(Vendor vendor) {
        this.vendors.remove(vendor);
        vendor.setMenu(null);
        return this;
    }

    public void setVendors(Set<Vendor> vendors) {
        this.vendors = vendors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Menu)) {
            return false;
        }
        return id != null && id.equals(((Menu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Menu{" +
            "id=" + getId() +
            ", foodname='" + getFoodname() + "'" +
            ", cost=" + getCost() +
            "}";
    }
}
