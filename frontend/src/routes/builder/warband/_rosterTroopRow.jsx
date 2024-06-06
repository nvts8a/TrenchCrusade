import Keyword from '../../../components/_keyword';
import Rules from '../../../components/_rules';
import EquipmentRow from '../../../components/_equipmentRow';

export default function RosterTroopRow({troop, factionTroopType, troopType, handleDelete, recruitment=false}) {
    const fMovement = `${troopType.movement}"/${troopType.movementType}`
    const fRanged   = troopType.range ? (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice` : '-'
    const fMelee    = troopType.melee ? (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice` : '-'

    const formatArmor = () => {
        let armor = troopType.armour

        if(troop && troop.equipment) {
            troop.equipment
            .filter((equipable) => equipable.type === 'armor')
            .forEach(equipable => {
                if(equipable.modifiers) equipable.modifiers.forEach((modifier) => {
                    if(modifier.type === 'armor') armor = armor + modifier.value
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

    const troopStats = () => {
        const handlers = () => {
            if (!recruitment) {
                return(<>
                    <div className='col-1 icon-link icon-link-hover' onClick={handleDelete}>
                        <i className='bi bi-shield-fill-plus'></i>
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
                <td>{formatArmor()}</td>
                <td>{formatKeywords(troopType.keywords)}</td>
            </tr>
        )
    }


    const troopRules = (rules) => {
        if (rules.length > 0) return(
            <tr>
                <td colSpan='100%'>{<Rules rules={rules} />}</td>
            </tr>
        )
    }

    const troopEquipment = (equipment) => {
        if (equipment.length > 0) {
            const equipped = () => equipment.map((equipable) => <EquipmentRow recruitment={recruitment} equipable={equipable} key={equipable.id} />)
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
                {equipped()}
                </>
            )
        }
    }

    return(
        <>
            {troopStats()}
            {troopRules(troopType.rules)}
            {troopEquipment(troopType.equipment)}
        </>
    )
}