COPY troop_type_keyword(troop_type_id,keyword_id)
    FROM '/Users/stevenjustin/Development/TrenchCrusade/api/src/main/resources/db/migration/data/v1_3_2/troop_type_keyword.csv'
    CSV HEADER;

COPY troop_type_rule(troop_type_id,name,rule)
    FROM '/Users/stevenjustin/Development/TrenchCrusade/api/src/main/resources/db/migration/data/v1_3_2/troop_type_rule.csv'
    CSV HEADER;