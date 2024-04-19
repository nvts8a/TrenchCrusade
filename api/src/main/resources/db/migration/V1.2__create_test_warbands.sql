INSERT
INTO faction (id, name, description)
VALUES
(1, 'Heretic Legion',                   'A shroud of darkness blankets the world...'),
(2, 'Trench Pilgrims',                  'As the war rages against the minions of Hell...'),
(3, 'The Iron Sultanate',               'When the Infidels opened the thrice-cursed Gate to Jahannam...'),
(4, 'The Principality of New Antioch',  'For three hundred years the Principality of New Antioch has stood defiantly...'),
(5, 'The Cult of the Black Grail',      'Epidemics of typhus, malaria, typhoid, smallpox, yellow-fever, pneumonia, trench fever...');

INSERT
INTO variant (id, faction_id, name, description)
VALUES
(1,  1, 'Naval Raiding Party',                          'The Heretic Fleet operates as a...'),
(2,  1, 'Trench Ghosts',                                'Sometimes when Heretic troopers die...'),
(3,  2, 'Procession of the Sacred Affliction',          'Trench Pilgrims of the Procession of the Sacred Affliction are known for their zeal...'),
(4,  3, 'Cavalcade of the Tenth Plague',                'This Trench Pilgrim Procession traditionally sacrifices lambs before battle...'),
(5,  3, 'Fida’i of Alamut - The Cabal of Assassins',    'The pact between the Iron Sultanate and the Assassin fortress of Alamut...'),
(6,  4, 'Papal States Intervention Force',              'The Papal states who all operate under the command of...'),
(7,  4, 'Eire Rangers',                                 'Eire is a stronghold of the Church and an ancient centre of learning...'),
(8,  4, 'Stoßtruppen of the Free State of Prussia',     'When the need to take out an enemy strongpoint...'),
(9,  4, 'Kingdom of Alba Assault Detachment',           'Hailing from the Scottish Highlands where the Church is strong...');

INSERT
INTO troop_type (id, type, name, description, movement, movement_type, range, melee, armour, base_size)
VALUES
(1,  'elite', 'Heretic Priest',  '', 6, 'Infantry',  2,  2,  0, 32),
(2,  'elite', 'Death Commando',  '', 6, 'Infantry',  1,  2,  0, 32),
(3,  'elite', 'Chorister',       '', 6, 'Infantry', -2,  2,  0, 32),
(4,  'troop', 'Heretic Trooper', '', 6, 'Infantry',  0,  0,  0, 25),
(5,  'troop', 'Anointed',        '', 6, 'Infantry',  1,  1, -1, 32),
(6,  'elite', 'War Prophet',     '', 6, 'Infantry',  2,  2,  0, 32),
(7,  'elite', 'Castigator',      '', 6, 'Infantry',  1,  1,  0, 32),
(8,  'elite', 'Communicant',     '', 6, 'Infantry', -3,  2,  0, 40),
(9,  'troop', 'Trench Pilgrim',  '', 6, 'Infantry',  0,  0,  0, 25),
(10, 'troop', 'Stigmatic Nun',   '', 8, 'Infantry',  1,  1,  0, 25);

INSERT
INTO faction_troop_type (faction_id, troop_type_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10);