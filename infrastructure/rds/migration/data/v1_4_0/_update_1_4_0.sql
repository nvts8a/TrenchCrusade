# KEYWORDS
UPDATE keyword SET definition = 'Ranged attacks made with weapons that have this Keyword do not prevent a model from charging during the same activation. A charge may only be made if a single ranged attack is made with a weapon with this Keyword, regardless of any other rules that the weapon might have.' WHERE id = 4;
UPDATE keyword SET definition = 'A model hit by a weapon will this Keyword suffers a BLOOD MARKER, in addition to any other effects of the attack. The model suffers this Blood Marker even if the attack has no other effects or is otherwise negated. Some equipment or abilities can negate the additional BLOOD MARKER caused by this Keyword.' WHERE id = 12;
UPDATE keyword SET definition = 'This model is part of a Fireteam. All models that are part of the same Fireteam can be activated at the same time without the opponent getting their turn in between. Note that if the Activation of either member of the Fireteam forcefully ends (due a failed RISKY ACTION for example), it ends both Activations. Note that Mercenaries cannot be part of a FIRETEAM.' WHERE id = 13;
UPDATE keyword SET definition = 'A model hit by a weapon will this Keyword suffers a BLOOD MARKER, in addition to any other effects of the attack. The model suffers this Blood Marker even if the attack has no other effects or is otherwise negated. Some equipment or abilities can negate the additional BLOOD MARKER caused by this Keyword.' WHERE id = 14;
UPDATE keyword SET definition = 'Grenade-type weapons ignore penalties for cover and long range. They do not count towards the number of Ranged weapons a model can carry and do not have to be held in your hand at all times. A model armed with grenades can use them as many times as they wish.' WHERE id = 15;
UPDATE keyword SET definition = 'Models with this Keyword can be placed anywhere on the table out of line of sight of any enemies, but at least 8” away from the closest enemy. Deployed after all other models without this Keyword. If any infiltrators cannot be deployed according to these restrictions then those models can always be deployed in your deployment zone.' WHERE id = 18;
UPDATE keyword SET definition = 'A model hit by a weapon will this Keyword suffers a BLOOD MARKER, in addition to any other effects of the attack. The model suffers this Blood Marker even if the attack has no other effects or is otherwise negated. Some equipment or abilities can negate the additional BLOOD MARKER caused by this Keyword.' WHERE id = 23;
UPDATE keyword SET definition = 'Unless engaged in melee, when an enemy model declares a charge against a model with this Keyword, the SKIRMISHER can immediately move D3” in any direction they wish (except within 1” of any enemy). After this manoeuvre, the charging model is moved as normal. This may lead to the charger being unable to enter into Melee. If the SKIRMISHER moves behind another friendly model so it is now in the path and reach of the Charger, then the Charge is redirected to this model.' WHERE id = 24;
UPDATE keyword SET definition = 'A model with this Keyword ignores the rules for weapons/armour/equipment with Keyword HEAVY. In addition, it may use a single 2-handed Melee weapon as a 1-handed weapon.' WHERE id = 26;
UPDATE keyword SET definition = 'If a TOUGH model would be taken Out Of Action, it is taken Down instead. After a TOUGH model has been taken Down in this way once, it can be taken Out of Action as normal.' WHERE id = 28;
INSERT INTO keyword(id, name, definition) VALUES (30, 'BLAST (X)"', 'A weapon with BLAST (X) has an area of effect with a radius of inches indicated by the (X). If this weapon targets a model, this radius is measured from the centre of that model’s base in all directions. If this weapon targets a point on the ground, this radius is measured from that point in all directions, including vertically. If the Attack ACTION with this weapon is successful, it hits every model within this radius that the target (either model or point) has line of sight to (ie. not completely blocked by terrain). Add +1 DICE to any injury rolls the weapon causes if you roll a Critical (i.e. 12+) on the Action Success Chart.');
INSERT INTO keyword(id, name, definition) VALUES (31, 'CUMBERSOME', 'Model always requires two hands to use this weapon, even if the model has Keyword STRONG.');

# EQUIPMENT
INSERT INTO equipment_rule(equipment_id, rule) VALUES (11, 'If equipped with a Sniper Scope (see Equipment), the Sniper Rifle also ignores the penalty for Long Range, even if it has moved this turn.');
UPDATE equipment_rule SET rule = 'Grenades have BLAST 2" - all models within 2" of a model are hit but models other than the original target roll Injuries with -1 DICE.' WHERE equipment_id = 12;
INSERT INTO equipment_keyword(equipment_id, keyword_id) VALUES (12, 30);
UPDATE equipment_rule SET rule = 'Bayonets can only be attached to weapons indicated in each Warband’s Armoury with "Bayonet lug". They do not count towards the maximum Melee weapons a model can carry.' WHERE equipment_id = 26;
INSERT INTO equipment_keyword(equipment_id, keyword_id) VALUES (30, 31);
INSERT INTO equipment_rule(equipment_id, rule) VALUES (30, 'Tartarus Claws always come as a pair and do not allow the use of any other melee weapons or carry shield. You can make two Attack ACTIONS with the Claws without the usual -1 DICE for the second attack. If the opponent is taken Down or Out of Action with either of the Claws you may immediately move the model up to 6” into any direction. If the move takes you into contact with another enemy model, this counts as a charge and you can make a second Melee Attack ACTION with both of the claws. You can only do this follow-up move once per Activation.');
UPDATE equipment_rule SET rule = 'Polearms take two hands to use and the model armed with it cannot use any shield. Melee attacks made against this model are made with -1 DICE if the attacking model charged this turn.' WHERE equipment_id = '32';
INSERT INTO equipment_rule(equipment_id, rule) VALUES (33, 'Hit bonus does not apply if used as an off-hand weapon.');
INSERT INTO equipment_rule(equipment_id, rule) VALUES (37, 'Takes always one hand to use in both melee and in ranged combat and cannot be switched out. Grants -1 to all injury rolls against the model. This bonus stacks with any armour the model wears, unless otherwise indicated. 2-handed Ranged weapons with "Shield Combo" indicator in the Armoury list of the Warband only take 1 hand to use if the model also carries a Trench Shield.');
INSERT INTO equipment_rule(equipment_id, rule) VALUES (37, 'Takes always one hand to use in both melee and in ranged combat and cannot be switched out. Grants -1 to all injury rolls against the model. This bonus stacks with any armour the model wears, unless otherwise indicated. 2-handed Ranged weapons with "Shield Combo" indicator in the Armoury list of the Warband only take 1 hand to use if the model also carries a Trench Shield.');
UPDATE equipment_rule SET rule = 'All weapons with keyword SHRAPNEL suffer -1 DICE on all Injury rolls against the Combat Engineer, and the SHRAPNEL attacks do not cause the extra BLOOD MARKERS on a model wearing this suit. These effects work even against attacks that ignore armour.' WHERE equipment_id = 48;
INSERT INTO equipment_rule(equipment_id, rule) VALUES (40, 'Due to its bulk the wearer rolls 2D6 during a change and picks the lowest number. Machine armour cannot be combined with any shield.');

UPDATE equipment_rule SET rule = 'Ignores additional BLOOD MARKERS caused by the Keyword SHRAPNEL.' WHERE equipment_id = 58;
UPDATE equipment_rule SET rule = 'Negates the extra BLOOD MARKER from attacks with the keyword GAS, and such attacks suffer -1 DICE penalty to all Injury Rolls.' WHERE equipment_id = 61;
UPDATE equipment_rule SET rule = 'Before the battle begins, a model may use this item to grant a “rifle” or “pistol” weapon that they are equipped with the following ability: “Reduce the injury penalty from Armour and Shields by 1” until the end of the battle.' WHERE equipment_id = 63;
UPDATE equipment_rule SET rule = 'Before the battle begins, a model may use this item to grant a “rifle” or “pistol” weapon that they are equipped with the CRITICAL keyword until the end of the battle.' WHERE equipment_id = 64;
UPDATE equipment_rule SET rule = 'Before the battle begins, a model may use this item to grant a “rifle” or “pistol” weapon that they are equipped with the FIRE keyword until the end of the battle.' WHERE equipment_id = 65;
UPDATE equipment_rule SET rule = 'Before the battle begins, a model may use this item to grant a “rifle” or “pistol” weapon that they are equipped with +1D to hit with ranged attacks until the end of the battle.' WHERE equipment_id = 66;
UPDATE equipment_rule SET rule = 'A model equipped with a Shovel always starts the game in Cover if deployed on ground level, even if placed in open terrain. As soon as the model moves, it is no longer in Cover. It also acts exactly as a Trench Club in Melee, except it requires two hands to use.' WHERE equipment_id = 68;
UPDATE equipment_rule SET rule = 'Before the battle begins, a model may use this item. If it does, injuries rolled against it suffer -1 DICE until the end of the battle, and the model is not affected by FEAR.' WHERE equipment_id = 70;
UPDATE equipment_rule SET rule = 'When a model equipped with an Unholy Trinket fails a RISKY ACTION, that model may use this item. If it does, its Activation is not ended.' WHERE equipment_id = 71;
UPDATE equipment_rule SET rule = 'When a model equipped with a Blessed Icon fails a RISKY ACTION, that model may use this item. If it does, its Activation is not ended.Can be used once per Battle.' WHERE equipment_id = 73;
UPDATE equipment_rule SET rule = 'Negates the extra BLOOD MARKER from attacks with the keyword FIRE, and such attacks suffer -1 DICE penalty to all Injury Rolls.' WHERE equipment_id = 74;
UPDATE equipment_rule SET rule = 'Any friendly models within 4” of the musician who is not Down can add +1 DICE to their Dash ACTIONS. Musical Instruments take one hand to use at all times as if it were a weapon.' WHERE equipment_id = 78;
INSERT INTO equipment(id,name,type,handedness,range,description) VALUES (101, 'Mountaineer Kit', 'equipment', NULL, NULL, 'This kit includes ropes, carabiners, slings, mountaineering harness and pitons to aid a soldier in overcoming almost any vertical obstacle.');
INSERT INTO equipment_rule(equipment_id,rule) VALUES (101, 'Model with this Kit adds +1 DICE to any Climbing ACTION rolls.');


# FACTION
UPDATE faction_equipment SET max  = 2  WHERE faction_id = 1 AND equipment_id = 5;
UPDATE faction_equipment SET cost = 7  WHERE faction_id = 1 AND equipment_id = 12;
UPDATE faction_equipment SET cost = 15 WHERE faction_id = 1 AND equipment_id = 13;
UPDATE faction_equipment SET cost = 10 WHERE faction_id = 1 AND equipment_id = 7;
UPDATE faction_equipment SET cost = 15 WHERE faction_id = 1 AND equipment_id = 8;
UPDATE faction_equipment SET cost = 40 WHERE faction_id = 1 AND equipment_id = 15;
UPDATE faction_equipment SET cost = 30 WHERE faction_id = 1 AND equipment_id = 20;
UPDATE faction_equipment SET cost = 10 WHERE faction_id = 1 AND equipment_id = 34;
UPDATE faction_equipment SET cost = 12 WHERE faction_id = 1 AND equipment_id = 35;
UPDATE faction_equipment SET cost = 1  WHERE faction_id = 1 AND equipment_id = 29;
UPDATE faction_equipment SET max  = 1  WHERE faction_id = 1 AND equipment_id = 65;
INSERT INTO faction_equipment(faction_id,equipment_id,cost,currency,min,max,filter) VALUES (1, 78, 15, NULL, NULL, 1, NULL);
INSERT INTO faction_equipment(faction_id,equipment_id,cost,currency,min,max,filter) VALUES (1, 101, 3, NULL, NULL, 2, NULL);



UPDATE troop_type_rule SET rule = 'This wicked infernal weapon as BLAST 3” Keyword. Specify a 1x1mm point on the battlefield within 36” that you want to target that the Witch can see. Next, take a Ranged Attack ACTION. If the roll fails (i.e. you roll 6 or less with the two lowest Dice), the bomb lands 1” away from its intended location, multiplied by the number representing the degree of failure (for example, if you rolled 5, the bomb lands 2” away, as 7-5=2). The direction is decided by your opponent. Roll on the Injury Chart for each model within the BLAST radius. If the bomb lands exactly on top of any model, roll with 3D6 on the Injury Chart and add the dice together! Other models hit by the Bomb roll on the Injury Chart as standard. Any model hit but not taken Out of Action by this attack is blown D3” directly away from the point of impact (roll for each model separately), stopping if they hit other models/buildings/objects. This attack has the Keyword SHRAPNEL and therefore causes an additional +1 BLOOD MARKER. Cover, range and higher position do not affect the attacks by the Infernal Bomb. Roll injuries for models in cover/behind intervening terrain with -1 DICE.' WHERE name = 'Infernal Bomb';
UPDATE faction_variant_rule SET rule = 'Since only mortals who have souls become ghosts, this Warband may not have any War Wolves or Artillery Witches, since they are artificial beings. In addition, no model in the Warband may have a Hellbound Soul Contract or an Infernal Brand Mark.' WHERE id = 10;



UPDATE faction_equipment SET cost = 15  WHERE faction_id = 2 AND equipment_id = 13;
UPDATE faction_equipment SET cost = 10  WHERE faction_id = 2 AND equipment_id = 7;
UPDATE faction_equipment SET cost = 30  WHERE faction_id = 2 AND equipment_id = 20;
INSERT INTO faction_equipment(faction_id,equipment_id,cost,currency,min,max,filter) VALUES (2, 11, 3, 'glory', NULL, NULL, NULL);

INSERT INTO equipment(id,name,type,handedness,range,description) VALUES (102, 'Warcross', 'range', NULL, NULL, 'Warcross (also known as a wurfkreuz in the Holy Roman Empire) is a four-pronged throwing weapon in the shape of a cross. It is engraved with prayers and psalms that guide it on an unerring path.');
INSERT INTO equipment_rule(equipment_id,rule) VALUES (102, 'Does not count as one of the Ranged weapons carried by the model. Cannot be carried wih Grenades. Ignores penalties for long range. A model with the weapon will not run out of them.');


INSERT INTO equipment_keyword(equipment_id, keyword_id) VALUES (102, 4);

INSERT INTO equipment(id,name,type,handedness,range,description) VALUES (103, 'Punt Gun', 'range', 2, 18, 'Punt Gun is an enormous shotgun loaded with up to 25 ounces of shot. It can be loaded with a risky amount of powder and square shot which causes widespread damage and destruction. It is a very popular weapon among Trench Pilgrims who lack access to conventional heavy weapons.');
INSERT INTO equipment_rule(equipment_id,rule) VALUES (103, 'Owing to its high accuracy and lethal shot, Punt Gun adds +1 DICE to all rolls to hit and to Injury rolls. You can overcharge it with a shot, giving the weapon BLAST 3” radius. If you do this, the Shooting ACTION with the Punt Gun always ends the shooter’s Activation and causes 1 BLOOD MARKER on the shooter. If a model carrying it does not have Keyword STRONG, another model must be in base contact with the shooter before it can make a Ranged Attack ACTION with the Punt Gun.');
INSERT INTO equipment_modifier(equipment_id,type,value) VALUES (103, 'hit', 1);
INSERT INTO equipment_modifier(equipment_id,type,value) VALUES (103, 'injure', 1);
INSERT INTO equipment_keyword(equipment_id, keyword_id) VALUES (103, 16);
INSERT INTO equipment_keyword(equipment_id, keyword_id) VALUES (103, 23);

UPDATE troop_type_rule SET rule = 'At the start of each of their Activations, any Stigmatic can remove 1 BLOOD MARKER (but not an INFECTION MARKER) from themselves, and convert it into a BLESSING MARKER.' WHERE name = 'Blessed Stigmata';

INSERT INTO upgrade(id,cost,currency,min,max,name) VALUES (19, 5, NULL, NULL, NULL, 'Zealot Strength');
INSERT INTO troop_type_upgrade(upgrade_id,troop_type_id,faction_variant_id) VALUES (19, 9, NULL);

INSERT INTO upgrade(id,cost,currency,min,max,name) VALUES (20, 5, NULL, NULL, 1, 'Zealot Strength');
INSERT INTO troop_type_upgrade(upgrade_id,troop_type_id,faction_variant_id) VALUES (20, 11, NULL);

INSERT INTO upgrade(id,cost,currency,min,max,name) VALUES (21, 45, NULL, NULL, NULL, 'Resurrection');
INSERT INTO troop_type_upgrade(upgrade_id,troop_type_id,faction_variant_id) VALUES (21, 11, NULL);

UPDATE troop_type_rule SET troop_type_id = 12 WHERE name = 'Agile';
INSERT INTO troop_type_rule(troop_type_id,name,rule) VALUES (13, 'Awaited', ' If the Ecclesiastic Prisoner is taken Out of Action by its Martyrdom Device, it does not count as being Out of Action for any rules related to Morale.');

UPDATE faction_variant_rule SET rule = 'All models in the Procession of the Sacred Affliction (except Ecclesiastic Prisoners who are not worthy) add extra +1 DICE to Injury rolls in melee against models that are Down.' WHERE id = 14;
INSERT INTO faction_variant_rule(id,faction_variant_id,name,rule) VALUES (52, 3, 'Zealot Strength', 'Up to 3 Trench Pilgrims may purchase the Zealot Strength upgrade.');
INSERT INTO faction_variant_rule(id,faction_variant_id,name,rule) VALUES (53, 3, 'Hammer and the Anvil', 'The Anti-tank Hammers of the Warband are not limited to ELITE.');
INSERT INTO faction_variant_rule(id,faction_variant_id,name,rule) VALUES (54, 3, 'Wrath of God', 'One Trench Pilgrim or Castigator in this Warband can be gripped by the vengeful fury of the Lord. This model is immune to FEAR and disregards any BLOOD MARKERS from any source. This model may never wear armour, though they can carry a Trench Shield or Holy Icon Shield. Add +15 Ducats to the cost of this model. This model may not carry any Ranged Weapons.');

INSERT INTO upgrade(id,cost,currency,min,max,name) VALUES (22, 5, NULL, NULL, 2, 'Zealot Strength');
INSERT INTO troop_type_upgrade(upgrade_id,troop_type_id,faction_variant_id) VALUES (22, 11, 3);

>>>>>>>>   RUN   <<<<<<<<<<

>>>>>>>> CHECKED <<<<<<<<<<




