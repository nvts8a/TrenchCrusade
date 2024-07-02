import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { removeTroop } from '../../../store/_warbandTroopsActions'
import { createTroopEquipable, getTroopEquipment, removeTroopEquipable } from '../../../store/_troopsEquipmentActions'

import Accordion from 'react-bootstrap/Accordion'
import AddNewEquipment from './_addNewEquipment'
import Button from 'react-bootstrap/esm/Button'
import Keyword from '../../../components/_keyword'
import Rules from '../../../components/_rules'
import Equipment from '../../../components/_equipment'

export default function TroopCard({troop, warband, rostered=false}) {
    const dispatch = useDispatch()
    const loader = useLoaderData()
    const troopsEquipment = useSelector(state => state.troopsEquipment)
    const equipmentLoading = useRef(false)

    useEffect(() => {
        if (rostered && !equipmentLoading.current && !troopsEquipment.values[troop.id] && troopsEquipment.loading === 'idle') {
            equipmentLoading.current = true
            dispatch(getTroopEquipment(troop))
        }
    }, [dispatch, troop, rostered, troopsEquipment])

    const troopType = loader.troopTypes[troop.troopTypeId]
    const troopEquipment = troopsEquipment.values[troop.id] ? troopsEquipment.values[troop.id] : []

    const troopMovement = () => `${troopType.movement}"/${troopType.movementType}`
    const troopRanged   = () => troopType.range ? (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice` : '-'
    const troopMelee    = () => troopType.melee ? (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice` : '-'
    const troopArmor    = () => {
        let armor = troopType.armour
        troopEquipment.map((equipable) => equipable.equipment)
            .concat(troopType.equipment)
            .filter((equipable) => equipable.modifiers && equipable.modifiers.length > 0)
            .forEach((equipable) => {
                equipable.modifiers.forEach((modifier) => {
                    if(modifier.type === 'armor') armor = armor + modifier.value
                })
            })
        return troopType.melee ? (armor < 0) ? `${armor} Dice` : `+${armor} Dice` : '-'
    }
    const troopKeywords = () => {
        if (troopType.keywords.length > 0) return troopType.keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
        return '-'
    }
    const troopRules = () => {
        if (troopType.rules.length > 0) return(<Rules rules={troopType.rules} />)
    }

    const statBlock = (label, stat) => {
        return(
            <div className='col-6 col-md-2 text-center fs-7 mb-2' key={label}>
                <p className='m-0'><strong>{label}</strong></p>
                {stat}
            </div>
        )
    }

    const buttons = () => {
        const armoryButton = rostered
                                ? <AddNewEquipment
                                    currentEquipment={troopEquipment}
                                    availableEquipment={loader.factionEquipment[warband.factionId]} 
                                    createEquipment={createTroopEquipable(troop)}
                                    removeEquipment={removeTroopEquipable(troop)} /> 
                                : <></>
        const trashButton  = rostered
                                ? <Button variant='danger ms-2' onClick={() => dispatch(removeTroop(warband, troop))}><i className='bi bi-trash-fill px-5' /></Button>
                                : <></>

        return(           
            <h5 className='text-center'>
                {armoryButton}
                {trashButton}
            </h5>
        )
    }

    const renderTroopEquipment = () => {
        if (troopType.equipment.length > 0 || (troopEquipment && troopEquipment.length > 0)) {
            const mapped = troopEquipment.map((troopEquipable) => troopEquipable.equipment)

            return(
                <Equipment equipment={troopType.equipment.concat(mapped)} />
            )
        }
    }

    return(
        <Accordion.Item eventKey={troop.id}>
            <Accordion.Header>
                <div className='row w-100'>
                    <div className='col-6 col-md-2 font-english-towne'>
                        <h5><strong>{troopType.name}</strong></h5>
                    </div>
                    <div className='col-6 col-md-2 font-english-towne'>
                        {troopKeywords()}
                    </div>
                    {statBlock('Movement', troopMovement())}
                    {statBlock('Ranged',   troopRanged())}
                    {statBlock('Melee',    troopMelee())}
                    {statBlock('Armour',   troopArmor())}
                </div>
            </Accordion.Header>
            <Accordion.Body className='fs-7'>
                {buttons()}
                {troopRules()}
                {renderTroopEquipment()}
            </Accordion.Body>
        </Accordion.Item>
    )
}