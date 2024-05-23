COPY troop_type(id,name,movement,movement_type,range,melee,armour,base_size,description)
    FROM '/tmp/troop_type.csv'
    CSV HEADER;

COPY faction_troop_type(faction_id,troop_type_id,type,min,max,cost,currency)
    FROM '/tmp/faction_troop_type.csv'
    CSV HEADER;