import EquipmentCard from './_equipmentCard'
import Keyword from './_keyword'
import Rules from './_rules'

export default function TroopCard({troopType}) {

    const fMovement = `${troopType.movement}"/${troopType.movementType}`
    const fRanged   = troopType.range ? (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice` : '-'
    const fMelee    = troopType.melee ? (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice` : '-'
    const fBaseSize = `${troopType.baseSize}mm`

    const formatKeywords = (keywords) => {
        if (keywords.length > 0) return keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
        return '-'
    }

    const renderAbilities = (abilities) => {
        if (abilities.length > 0) {
            return(
                <div className='col-9'>
                    <div>Abilities</div>
                    <Rules rules={troopType.rules} />
                </div>
            )
        }
        return(<div className='col-9'></div>)
    }

    const renderEquipment = (equipment) => {
        return equipment.map((equipable) => <EquipmentCard equipable={equipable} key={equipable.id} />)
    }


    if(troopType) return (
      <div className='container my-5' id={`troop-${troopType.id}`}>

        <div className='row'>{troopType.description}</div>

        <table className='table'>
            <thead>
                <tr className='table-danger'>
                    <th className='col-2'>Name</th>
                    <th className='col-2'>Movement</th>
                    <th className='col-2'>Ranged</th>
                    <th className='col-2'>Melee</th>
                    <th className='col-2'>Armour</th>
                    <th className='col-2'>Base</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{troopType.name}</th>
                    <td>{fMovement}</td>
                    <td>{fRanged}</td>
                    <td>{fMelee}</td>
                    <td>{troopType.armour}</td>
                    <td>{fBaseSize}</td>
                </tr>
            </tbody>
        </table>
        <div className='row'>
            {renderAbilities(troopType.rules)}
            <div className='col-3'>
                <div>Keywords</div>
                <div>
                    {formatKeywords(troopType.keywords)}
                </div>
            </div>
        </div>

        {renderEquipment(troopType.equipment)}
        <hr className='my-5'/>
      </div>
    )
  }