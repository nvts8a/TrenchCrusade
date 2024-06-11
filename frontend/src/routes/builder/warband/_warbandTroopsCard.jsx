// REACT
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddNewEquipment from './_addNewEquipment'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/esm/Button'
import Equipment from '../../../components/_equipment'
import Keyword from '../../../components/_keyword'
import Rules from '../../../components/_rules'

// REDUX
import axios from 'axios';
import { useTroopTypes } from '../../../store/loaders'

export default function TroopCard({troop, factionTroopType, removeTroop, factionEquipment, createTroopEquipment, removeTroopEquipment, rostered=false}) {
    const params   = useParams()
    const troopTypes = useTroopTypes()
    const [troopEquipment, setTroopEquipment]  = useState([])
    const addTroopEquipable = (equipable) => {
        setTroopEquipment(troopEquipment.concat(equipable))
    }
    const findAndRemoveTroopEquipable = (factionEquipable) => {
        const equipmentRemovedIndex = troopEquipment.findIndex((equipable) => equipable.factionEquipmentId === factionEquipable.id)
        
        if (equipmentRemovedIndex > -1) return troopEquipment.splice(equipmentRemovedIndex, 1)[0]
        return false
    }

    useEffect(() => {
        if (rostered && troop) axios(`warband/${params.id}/troop/${troop.id}/equipment/all`)
        .then((response) => setTroopEquipment(response.data))
        .catch((err) => console.log(err.message))
    }, [params, rostered, troop])

    const troopType = troopTypes[troop.troopTypeId]

    if (!troopType) return(<></>)

    const troopMovement = () => `${troopType.movement}"/${troopType.movementType}`
    const troopRanged   = () => troopType.range ? (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice` : '-'
    const troopMelee    = () => troopType.melee ? (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice` : '-'
    const troopArmor    = () => {
        let armor = troopType.armour

        troopEquipment
        .map((equipable) => equipable.equipment)
        .concat(troopType.equipment)
        .filter((equipable) => equipable.modifiers && equipable.modifiers.length > 0)
        .forEach((equipable) => {
            equipable.modifiers.forEach((modifier) => {
                if(modifier.type === 'armor') armor = armor + modifier.value
            })
        })

        return armor
    }
    const troopKeywords = () => {
        if (troopType.keywords.length > 0) return troopType.keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
        return '-'
    }
    const troopRules    = () => {
        if (troopType.rules.length > 0) return(<Rules rules={troopType.rules} />)
    }

    const renderTroopEquipment = (equipment, troopEquipment) => {
        if (equipment.length > 0 || troopEquipment.length > 0) {
            const mapped = troopEquipment.map((troopEquipable) => troopEquipable.equipment)

            return(
                <Equipment equipment={equipment.concat(mapped)} />
            )
        }
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
        const armoryButton = createTroopEquipment && removeTroopEquipment ? <AddNewEquipment
                                currentEquipment={troopEquipment}
                                factionEquipment={factionEquipment}
                                createEquipment={createTroopEquipment(troop, addTroopEquipable)}
                                removeEquipment={removeTroopEquipment(troop, findAndRemoveTroopEquipable)} /> : <></>
        const trashButton  = removeTroop ? <Button variant='danger ms-2'><i className='bi bi bi-trash-fill px-5' onClick={removeTroop(troop, factionTroopType)}/></Button> : <></>

        return(           
            <h5 className='text-center'>
                {armoryButton}
                {trashButton}
            </h5>
        )
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
                {renderTroopEquipment(troopType.equipment, troopEquipment)}
            </Accordion.Body>
        </Accordion.Item>
    )
}