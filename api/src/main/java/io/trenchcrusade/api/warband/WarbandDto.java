package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.rule.faction.Faction;
import io.trenchcrusade.api.rule.faction.FactionVariant;
import io.trenchcrusade.api.security.User;


public class WarbandDto {
    private final Warband warband;

    public WarbandDto() {
        warband = new Warband();
    }

    public Warband getWarband() {
        return warband;
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

    public Long getFactionId() {
        if (warband.getFaction() == null) return null;
        return warband.getFaction().getId();
    }
    public void setFactionId(Long factionId) {
        if (warband.getFaction() == null) warband.setFaction(new Faction());
        warband.getFaction().setId(factionId);
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

    public Long getVariantId() {
        if (warband.getVariant() == null) return null;
        return warband.getVariant().getId();
    }
    public void setVariantId(Long variantId) {
        if (warband.getVariant() == null) warband.setVariant(new FactionVariant());
        warband.getVariant().setId(variantId);
    }

    public Warband patch(Warband warband) {
        if (getChronology() != null) warband.setChronology(getChronology());
        if (getDucats()     != null) warband.setDucats(getDucats());
        if (getGlory()      != null) warband.setGlory(getGlory());
        if (getName()       != null) warband.setName(getName());

        if (this.warband.getVariant() != null) warband.setVariant(this.warband.getVariant());

        return warband;
    }
}
