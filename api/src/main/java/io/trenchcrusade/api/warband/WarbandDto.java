package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.rule.faction.Faction;
import io.trenchcrusade.api.rule.faction.Variant;

public class WarbandDto {
    private Integer id;
    private String  chronology;
    private Integer ducats;
    private Faction faction;
    private Integer glory;
    private String  name;
    private Variant variant;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Faction getFaction() { return faction; }
    public void setFaction(Faction faction) {
        this.faction = faction;
    }

    public Variant getVariant() {
        return variant == null ? null : variant;
    }
    public void setVariant(Variant variant) {
        this.variant = variant;
    }

    public String getChronology() {
        return chronology;
    }
    public void setChronology(String chronology) {
        this.chronology = chronology;
    }

    public Integer getDucats() {
        return ducats;
    }
    public void setDucats(Integer ducats) {
        this.ducats = ducats;
    }

    public Integer getGlory() {
        return glory;
    }
    public void setGlory(Integer glory) {
        this.glory = glory;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
