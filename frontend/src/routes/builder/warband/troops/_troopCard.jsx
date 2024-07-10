import { useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { removeTroop } from '../../../../store/_troopsActions'
import { createTroopEquipable, removeTroopEquipable } from '../../../../store/_troopsEquipmentActions'

import Accordion from 'react-bootstrap/Accordion'
import AddNewEquipment from '../_addNewEquipment'
import Button from 'react-bootstrap/esm/Button'
import Keyword from '../../../../components/_keyword'
import Rules from '../../../../components/_rules'
import AddNewUpgrade from './_addNewUpgrade'
import Upgrade from '../../../../components/_upgrade'
import Equipment from '../../../../components/_equipment'

const Stat = ({label, stat}) => {
    return(
        <div className='col-6 col-md-2 text-center fs-7 mb-2' key={label}>
            <p className='m-0'><strong>{label}</strong></p>
            {stat}
        </div>
    )
}

const calculateStat = (type, baseValue, troopType, equipment, upgrades) => {
    let calulatedValue = baseValue

    if (equipment) {
        equipment
            .map((equipable) => equipable.equipment)
            .concat(troopType.equipment)
            .filter((equipable) => equipable.modifiers && equipable.modifiers.length > 0)
            .forEach((equipable) => {
                equipable.modifiers.forEach((modifier) => {
                    if (modifier.type === type) calulatedValue = calulatedValue + modifier.value
                })
            })
    }

    if (upgrades) {
        upgrades
            .forEach((troopUpgrade) => {
                troopUpgrade.upgrade.upgradeModifiers.forEach((modifier) => {
                    if (modifier.type === type) calulatedValue = calulatedValue + modifier.value
                })
            })
    }

    return calulatedValue
}

export default function TroopCard({troop, warband, rostered=false}) {
    const dispatch  = useDispatch()
    const loader    = useLoaderData()
    const troopType = loader.troopTypes[troop.troopTypeId]

    const armoryButton  = rostered
        ? <AddNewEquipment
            currentEquipment={troop.equipment ? troop.equipment : []}
            availableEquipment={loader.factionEquipment[warband.factionId]} 
            createEquipment={createTroopEquipable(troop)}
            removeEquipment={removeTroopEquipable(troop)} />
        : <></>

    const upgradeButton = rostered && troopType.troopTypeUpgrades.length > 0
        ? <AddNewUpgrade
            warband={warband}
            troop={troop} 
            troopType={troopType} 
            currentUpgrades={troop.upgrades} />
        : <></>

    const trashButton   = rostered
        ? <Button variant='danger ms-2' onClick={() => dispatch(removeTroop(warband, troop))}><i className='bi bi-trash-fill px-5' /></Button>
        : <></>

    const troopKeywords = (troopType.keywords.length > 0) ? troopType.keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>) : '-'
    const troopUpgrades = troop.upgrades ? troop.upgrades.map((troopUpgrade) => <Upgrade key={troopUpgrade.id} upgrade={troopUpgrade.upgrade} />) : ''
    
    const calculatedMovem = calculateStat('movemment', troopType.movement, troopType, troop.equipment, troop.upgrades)
    const calculatedRange = calculateStat('range', troopType.range,  troopType, troop.equipment, troop.upgrades)
    const calculatedMelee = calculateStat('melee', troopType.melee,  troopType, troop.equipment, troop.upgrades)
    const calculatedArmor = calculateStat('armor', troopType.armour, troopType, troop.equipment, troop.upgrades)

    const presentMovement = `${calculatedMovem}"/${troopType.movementType}`
    const presentRanged   = calculatedRange !== 0 ? ((calculatedRange < 0) ? `${calculatedRange} Dice` : `+${calculatedRange} Dice`) : '-'
    const presentMelee    = calculatedMelee !== 0 ? ((calculatedMelee < 0) ? `${calculatedMelee} Dice` : `+${calculatedMelee} Dice`) : '-'
    const presentArmor    = calculatedArmor ? calculatedArmor : '-'

    const troopRules    = <Rules rules={troopType.rules} />

    return(
        <Accordion.Item eventKey={troop.id}>
            <Accordion.Header>
                <div className='row w-100'>
                    <div className='col-6 col-md-2 font-english-towne'>
                        <h5><strong>{troopType.name}</strong></h5>
                    </div>
                    <div className='col-6 col-md-2 font-english-towne'>
                        {troopKeywords}
                        {troopUpgrades}
                    </div>
                    <Stat label='Movement' stat={presentMovement} />
                    <Stat label='Ranged'   stat={presentRanged} />
                    <Stat label='Melee'    stat={presentMelee} />
                    <Stat label='Armour'   stat={presentArmor} />
                </div>
            </Accordion.Header>
            <Accordion.Body className='fs-7'>
                <h5 className='text-center'>
                    {armoryButton}
                    {upgradeButton}
                    {trashButton}
                </h5>
                {troopRules}
                <Equipment equipment={troopType.equipment} />
                <Equipment equipment={troop.equipment} />
            </Accordion.Body>
        </Accordion.Item>
    )
}