package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.security.User;
import io.trenchcrusade.api.warband.deed.Deed;
import io.trenchcrusade.api.rule.faction.Faction;
import io.trenchcrusade.api.rule.faction.FactionVariant;
import io.trenchcrusade.api.warband.troop.Troop;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Warband {
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
    @JoinColumn(name = "faction_id")
    private Faction faction;
    public Faction getFaction() { return faction; }
    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;
    public User getUser() {
        return user;
    }

    @ManyToOne
    @JoinColumn(name = "variant_id")
    private FactionVariant factionVariant;
    public FactionVariant getVariant() {
        return factionVariant == null ? null : factionVariant;
    }
    public void setVariant(FactionVariant factionVariant) {
        this.factionVariant = factionVariant;
    }

    @ManyToMany
    @JoinTable(name = "warband_deed",
            joinColumns = @JoinColumn(name = "warband_id"),
            inverseJoinColumns = @JoinColumn(name = "deed_id"))
    private Set<Deed> deeds;

    @OneToMany(mappedBy="warband")
    private Set<Troop> troops;
    public Set<Troop> getTroops() {
        return troops;
    }

    // COLUMNS
    @Column(columnDefinition = "TEXT")
    private String chronology;
    public String getChronology() {
        return chronology;
    }
    public void setChronology(String chronology) {
        this.chronology = chronology;
    }

    private Integer ducats = 700;
    public Integer getDucats() {
        return ducats;
    }
    public void setDucats(Integer ducats) {
        this.ducats = ducats;
    }

    private Integer glory = 0;
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
