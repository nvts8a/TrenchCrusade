COPY keyword(id,name,definition)
    FROM '/tmp/v1_3_2/keyword.csv'
    CSV HEADER;




COPY equipment(id, name, type ,handedness, range, description)
    FROM '/tmp/v1_3_2/equipment.csv'
    CSV HEADER;

COPY equipment_keyword(equipment_id, keyword_id)
    FROM '/tmp/v1_3_2/equipment_keyword.csv'
    CSV HEADER;

COPY equipment_modifier(equipment_id, type, value)
    FROM '/tmp/v1_3_2/equipment_modifier.csv'
    CSV HEADER;

COPY equipment_rule(equipment_id, rule)
    FROM '/tmp/v1_3_2/equipment_rule.csv'
    CSV HEADER;




COPY troop_type(id,name,movement,movement_type,range,melee,armour,base_size,description)
    FROM '/tmp/v1_3_2/troop_type.csv'
    CSV HEADER;

COPY troop_type_keyword(troop_type_id,keyword_id)
    FROM '/tmp/v1_3_2/troop_type_keyword.csv'
    CSV HEADER;

COPY troop_type_rule(troop_type_id,name,rule)
    FROM '/tmp/v1_3_2/troop_type_rule.csv'
    CSV HEADER;

COPY troop_type_equipment(troop_type_id, equipment_id)
    FROM '/tmp/v1_3_2/troop_type_equipment.csv'
    CSV HEADER;



COPY faction(id,name,description)
    FROM '/tmp/v1_3_2/faction.csv'
    CSV HEADER;

COPY faction_variant(id, faction_id, name, description)
    FROM '/tmp/v1_3_2/faction_variant.csv'
    CSV HEADER;

COPY faction_troop_type(faction_id,troop_type_id,type,min,max,cost,currency)
    FROM '/tmp/v1_3_2/faction_troop_type.csv'
    CSV HEADER;

COPY faction_equipment(faction_id, equipment_id, cost, currency, min, max, filter)
    FROM '/tmp/v1_3_2/faction_equipment.csv'
    CSV HEADER;