package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.rule.equipment.Equipment;
import io.trenchcrusade.api.security.User;
import io.trenchcrusade.api.warband.deed.Deed;
import io.trenchcrusade.api.rule.faction.Faction;
import io.trenchcrusade.api.rule.faction.FactionVariant;
import io.trenchcrusade.api.warband.equipment.WarbandEquipment;
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
    public Long getFactionId() { return faction.getId(); }
    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;
    public Long getUserId() {
        return user.getId();
    }
    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "variant_id")
    private FactionVariant factionVariant;
    public Long getVariantId() {
        return factionVariant == null ? null : factionVariant.getId();
    }
    public void setVariant(FactionVariant factionVariant) {
        this.factionVariant = factionVariant;
    }



    @ManyToMany
    @JoinTable(name = "warband_deed",
            joinColumns = @JoinColumn(name = "warband_id"),
            inverseJoinColumns = @JoinColumn(name = "deed_id"))
    private Set<Deed> deeds;

    @OneToMany(
            mappedBy = "warband",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<WarbandEquipment> warbandEquipment;

    @OneToMany(
            mappedBy = "warband",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
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

    private Integer ducats;
    public Integer getDucats() {
        return ducats;
    }
    public void setDucats(Integer ducats) {
        this.ducats = ducats;
    }

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
