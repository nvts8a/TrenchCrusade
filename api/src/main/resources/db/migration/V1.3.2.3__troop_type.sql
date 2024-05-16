COPY troop_type(id,name,movement,movement_type,range,melee,armour,base_size,description)
    FROM '/Users/stevenjustin/Development/TrenchCrusade/api/src/main/resources/db/migration/data/v1_3_2/troop_type.csv'
    CSV HEADER;

COPY faction_troop_type(faction_id,troop_type_id,type,min,max,cost,currency)
    FROM '/Users/stevenjustin/Development/TrenchCrusade/api/src/main/resources/db/migration/data/v1_3_2/faction_troop_type.csv'
    CSV HEADER;