package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.login.Login;
import io.trenchcrusade.api.warband.deed.Deed;
import io.trenchcrusade.api.faction.Faction;
import io.trenchcrusade.api.faction.variant.Variant;
import io.trenchcrusade.api.warband.troop.Troop;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Set;

@Entity
public class Warband {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    // ASSOCIATIONS
    @ManyToOne(optional = false)
    @JoinColumn(name = "faction_id")
    private Faction faction;
    public Integer getFaction() {
        return faction.getId();
    }
    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "login_id")
    private Login login;
    public Integer getLogin() {
        return login.getId();
    }

    @ManyToOne
    @JoinColumn(name = "variant_id")
    private Variant variant;
    public Integer getVariant() {
        return variant == null ? null : variant.getId();
    }
    public void setVariant(Variant variant) {
        this.variant = variant;
    }

    @ManyToMany
    @JoinTable(name = "warband_deed",
            joinColumns = @JoinColumn(name = "warband_id"),
            inverseJoinColumns = @JoinColumn(name = "deed_id"))
    private Set<Deed> deeds;

    @OneToMany(mappedBy="warband")
    private Set<Troop> troops;

    // COLUMNS
    @Column(columnDefinition = "TEXT")
    private String chronology;
    public String getChronology() {
        return chronology;
    }
    public void setChronology(String chronology) {
        this.chronology = chronology;
    }

    @ColumnDefault("700")
    private Integer ducats;
    public Integer getDucats() {
        return ducats;
    }
    public void setDucats(Integer ducats) {
        this.ducats = ducats;
    }

    @ColumnDefault("0")
    private Integer glory;
    public Integer getGlory() {
        return glory;
    }
    public void setGlory(Integer glory) {
        this.glory = glory;
    }

    private String name;
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
