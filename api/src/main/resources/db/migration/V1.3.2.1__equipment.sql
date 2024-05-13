COPY equipment(id, name, type ,handedness, range, description)
    FROM '/Users/stevenjustin/Development/TrenchCrusade/api/src/main/resources/db/migration/data/v1_3_2/equipment.csv'
    CSV HEADER;