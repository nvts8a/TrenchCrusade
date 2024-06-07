import Keyword from '../../../components/_keyword';
import Rules from '../../../components/_rules';
import EquipmentRow from '../../../components/_equipmentRow';
import AddNewTroopEquipment from './_addNewTroopEquipment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RosterTroopRow({troop, troopType, equipment, allFactionEquipment, warband,
                                        handleDelete, createEquipment, removeEquipment, recruitment=false}) {
    const params   = useParams()

    const [troopEquipment, setTroopEquipment]  = useState([])
    const addTroopEquipable = (equipable) => {
        setTroopEquipment(troopEquipment.concat(equipable))
    }
    const findAndRemoveTroopEquipable = (factionEquipable) => {
        const equipmentRemovedIndex = troopEquipment.findIndex((troopEquipable) => troopEquipable.equipmentId === factionEquipable.equipmentId)
        
        if (equipmentRemovedIndex > -1) return troopEquipment.splice(equipmentRemovedIndex, 1)[0]
        return false
    }

    useEffect(() => {
        if (troop) axios(`warband/${params.id}/troop/${troop.id}/equipment/all`)
        .then((response) => setTroopEquipment(response.data))
        .catch((err) => console.log(err.message))
    }, [params, troop])

    const fMovement = `${troopType.movement}"/${troopType.movementType}`
    const fRanged   = troopType.range ? (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice` : '-'
    const fMelee    = troopType.melee ? (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice` : '-'

    const formatArmor = (troopEquipment) => {
        let armor = troopType.armour

        if(troopEquipment && troopEquipment.length > 0) {

            troopEquipment
            .filter((equipable) => equipable.equipment.type === 'armor')
            .forEach(equipable => {
                if(equipable.equipment.modifiers) equipable.equipment.modifiers.forEach((modifier) => {
                    if(modifier.type === 'armor') {
                        armor = armor + modifier.value
                    }
                })
            })
        }

        if(troopType && troopType.equipment) {
            troopType.equipment
            .filter((equipable) => equipable.type === 'armor')
            .forEach(equipable => {
                if(equipable.modifiers) equipable.modifiers.forEach((modifier) => {
                    if(modifier.type === 'armor') armor = armor + modifier.value
                })
            })
        }
        
        return armor
    }

    const formatKeywords = (keywords) => {
        if (keywords.length > 0) return keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
        return '-'
    }

    const renderTroopStats = () => {
        const handlers = () => {
            if (!recruitment) {
                return(<>
                    <div className='col-1 icon-link icon-link-hover'>
                        <AddNewTroopEquipment
                            warband={warband} troopEquipment={troopEquipment}
                            equipment={equipment} allFactionEquipment={allFactionEquipment}
                            handleCreateEquipment={createEquipment(addTroopEquipable)} handleRemoveEquipment={removeEquipment(findAndRemoveTroopEquipable)}/>
                    </div>
                    <div className='col-1 icon-link icon-link-hover' onClick={handleDelete}>
                        <i className='bi bi-trash-fill'></i>
                    </div>
                </>)
            }
        }

        return(
            <tr className='table-warning'>
                <th >
                    <div className='row'>
                        <div className='col-9'>{troopType.name}</div>
                        {handlers()}
                    </div>
                </th>
                <td>{fMovement}</td>
                <td>{fRanged}</td>
                <td>{fMelee}</td>
                <td>{formatArmor(troopEquipment)}</td>
                <td>{formatKeywords(troopType.keywords)}</td>
            </tr>
        )
    }


    const renderTroopRules = (rules) => {
        if (rules.length > 0) return(
            <tr>
                <td colSpan='100%'>{<Rules rules={rules} />}</td>
            </tr>
        )
    }

    const renderTroopEquipment = (equipment, troopEquipment) => {
        if (equipment.length > 0 || troopEquipment.length > 0) {
            const typeEquipped = () => equipment.map((equipable) => <EquipmentRow recruitment={recruitment} equipable={equipable} key={equipable.id} />)
            const troopEquipped = () => troopEquipment.map((equipable) => <EquipmentRow recruitment={recruitment} equipable={equipable.equipment} key={equipable.id} />)
            const spacer = () => {
                if (!recruitment) return(<td className='table-dark'></td>)
            }

            return(
                <>
                <tr className='table-secondary'>
                    {spacer()}
                    <th colSpan={recruitment ? '2' : '1'}>Equipment</th>
                    <th>Type</th>
                    <th>Range</th>
                    <th>Modifiers</th>
                    <th>Keywords</th>
                </tr>
                {typeEquipped()}
                {troopEquipped()}
                </>
            )
        }
    }

    return(
        <>
            {renderTroopStats()}
            {renderTroopRules(troopType.rules)}
            {renderTroopEquipment(troopType.equipment, troopEquipment)}
        </>
    )
}