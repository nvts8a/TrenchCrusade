package io.trenchcrusade.api.rule.troop_type;

import jakarta.persistence.*;

@Entity
public class TroopTypeUpgrade {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    // ASSOCIATIONS
    @ManyToOne(optional = false)
    @JoinColumn(name = "troop_type_id")
    private TroopType troopType;

    @Column(nullable = false)
    private Integer cost;
    public Integer getCost() {
        return cost;
    }
    @Column(nullable = false)
    private String currency;
    public String getCurrency() {
        return currency;
    }
    private Integer max;
    public Integer getMax() {
        return max;
    }
    private Integer min;
    public Integer getMin() {
        return min;
    }
    @Column(nullable = false)
    private String name;
    public String getName() {
        return name;
    }
    @Column(nullable = false)
    private String type;
    public String getType() {
        return type;
    }
    @Column(nullable = false)
    private Integer value;
    public Integer getValue() {
        return value;
    }
}
