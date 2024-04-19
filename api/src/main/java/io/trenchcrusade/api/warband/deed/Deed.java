package io.trenchcrusade.api.warband.deed;

import jakarta.persistence.*;

@Entity
public class Deed {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
    }

    // COLUMNS
    @Column(columnDefinition = "TEXT")
    private String description;
    public String getDescription() {
        return description;
    }

    private String name;
    public String getName() {
        return name;
    }
}
