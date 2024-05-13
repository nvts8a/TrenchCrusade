package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.login.Login;
import io.trenchcrusade.api.warband.deed.Deed;
import io.trenchcrusade.api.rule.faction.Faction;
import io.trenchcrusade.api.rule.faction.Variant;
import io.trenchcrusade.api.warband.troop.Troop;
import jakarta.persistence.*;

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
    public Faction getFaction() { return faction; }
    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "login_id")
    private Login login;

    public Login getLogin() {
        return login;
    }

    @ManyToOne
    @JoinColumn(name = "variant_id")
    private Variant variant;
    public Variant getVariant() {
        return variant == null ? null : variant;
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

    public Warband update(Warband updates) {
        if (updates.getName()       != null) setName(updates.getName());
        if (updates.getChronology() != null) setChronology(updates.getChronology());
        if (updates.getDucats()     != null) setDucats(updates.getDucats());
        if (updates.getFaction()    != null) setFaction(updates.getFaction());
        if (updates.getGlory()      != null) setGlory(updates.getGlory());
        return this;
    }
}
