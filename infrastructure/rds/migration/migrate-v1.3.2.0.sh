export PGPASSWORD=
export PGHOSTNAME=rpg.cn20sa602to3.us-east-2.rds.amazonaws.com
export PGUSERNAME=crusader
export PGDATABASE=trench
alias migrate="psql -h $PGHOSTNAME -p 5432 -U $PGUSERNAME -d $PGDATABASE -c"migrate "\copy keyword(id,name,definition) FROM './data/v1_3_2/keyword.csv' CSV HEADER"
migrate "\copy equipment(id, name, type ,handedness, range, description) FROM './data/v1_3_2/equipment.csv' CSV HEADER"
migrate "\copy equipment_keyword(equipment_id, keyword_id) FROM './data/v1_3_2/equipment_keyword.csv' CSV HEADER"
migrate "\copy equipment_modifier(equipment_id, type, value) FROM './data/v1_3_2/equipment_modifier.csv' CSV HEADER"
migrate "\copy equipment_rule(equipment_id, rule) FROM './data/v1_3_2/equipment_rule.csv' CSV HEADER"
migrate "\copy troop_type(id,name,movement,movement_type,range,melee,armour,base_size,description) FROM './data/v1_3_2/troop_type.csv' CSV HEADER"
migrate "\copy troop_type_keyword(troop_type_id,keyword_id) FROM './data/v1_3_2/troop_type_keyword.csv' CSV HEADER"
migrate "\copy troop_type_rule(troop_type_id,name,rule) FROM './data/v1_3_2/troop_type_rule.csv' CSV HEADER"
migrate "\copy troop_type_equipment(troop_type_id, equipment_id) FROM './data/v1_3_2/troop_type_equipment.csv' CSV HEADER"
migrate "\copy faction(id,name,description) FROM './data/v1_3_2/faction.csv' CSV HEADER"
migrate "\copy faction_variant(id, faction_id, name, description) FROM './data/v1_3_2/faction_variant.csv' CSV HEADER"
migrate "\copy faction_troop_type(faction_id,troop_type_id,type,min,max,cost,currency) FROM './data/v1_3_2/faction_troop_type.csv' CSV HEADER"
migrate "\copy faction_equipment(faction_id, equipment_id, cost, currency, min, max, filter) FROM './data/v1_3_2/faction_equipment.csv' CSV HEADER"