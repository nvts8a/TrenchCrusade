COPY equipment(id, name, type ,handedness, range, description)
    FROM '/tmp/equipment.csv'
    CSV HEADER;