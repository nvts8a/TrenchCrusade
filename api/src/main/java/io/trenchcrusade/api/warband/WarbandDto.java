package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.rule.faction.Faction;
import io.trenchcrusade.api.rule.faction.variant.FactionVariant;
import io.trenchcrusade.api.security.User;


public class WarbandDto {
    private final Warband warband;

    public WarbandDto() {
        warband = new Warband();
    }

    public Long getId() {
        return warband.getId();
    }
    public void setId(Long id) {
        warband.setId(id);
    }

    public void setUser(User user) {
        warband.setUser(user);
    }

    public String getChronology() {
        return warband.getChronology();
    }
    public void setChronology(String chronology) {
        warband.setChronology(chronology);
    }

    public Integer getDucats() {
        return warband.getDucats();
    }
    public void setDucats(Integer ducats) {
        warband.setDucats(ducats);
    }

    private Long factionId;
    public Long getFactionId() {
        return factionId;
    }
    public void setFactionId(Long factionId) {
        this.factionId = factionId;
    }

    public Integer getGlory() {
        return warband.getGlory();
    }
    public void setGlory(Integer glory) {
        warband.setGlory(glory);
    }

    public String getName() {
        return warband.getName();
    }
    public void setName(String name) {
        warband.setName(name);
    }

    private Long variantId;
    public Long getVariantId() {
        return variantId;
    }
    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public Warband build() {
        if (getFactionId() != null) {
            Faction faction = new Faction();
            faction.setId(getFactionId());
            warband.setFaction(faction);
        }
        if (getVariantId() != null) {
            FactionVariant variant = new FactionVariant();
            variant.setId(getVariantId());
            warband.setVariant(variant);
        }

        return warband;
    }

    public Warband patch(Warband warband) {
        if (getChronology() != null) warband.setChronology(getChronology());
        if (getDucats()     != null) warband.setDucats(getDucats());
        if (getGlory()      != null) warband.setGlory(getGlory());
        if (getName()       != null) warband.setName(getName());
        if (getFactionId()  != null) {
            Faction faction = new Faction();
            faction.setId(getFactionId());
            warband.setFaction(faction);
        }
        if (getVariantId()  != null) {
            FactionVariant variant = new FactionVariant();
            variant.setId(getVariantId());
            warband.setVariant(variant);
        }

        return warband;
    }
}
