// REACT
import { useLoaderData } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/esm/Button'
import Keyword from '../../../components/_keyword'
import Rules from '../../../components/_rules'
import { useDispatch } from 'react-redux'
import { removeTroop } from '../../../store/_warbandTroopsActions'
import { createTroopEquipable, removeTroopEquipable } from '../../../store/_troopsEquipmentActions'
import AddNewEquipment from './_addNewEquipment'

export default function TroopCard({troop, warband, rostered=false}) {
    const dispatch = useDispatch()
    const loader = useLoaderData()
    const troopType = loader.troopTypes[troop.troopTypeId]

    const troopMovement = () => `${troopType.movement}"/${troopType.movementType}`
    const troopRanged   = () => troopType.range ? (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice` : '-'
    const troopMelee    = () => troopType.melee ? (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice` : '-'
    const troopArmor    = () => {
        let armor = troopType.armour

        return armor
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
                                    currentEquipment={[]}
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
            </Accordion.Body>
        </Accordion.Item>
    )
}