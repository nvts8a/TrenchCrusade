import EquipmentRow from './_equipmentRow'
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
        if (equipment < 1) return (<></>)
        const equipped = () => equipment.map((equipable) => <EquipmentRow equipable={equipable} />)
        
        return(
            <div className='row '>
                <div>Equipment</div>
                <table className='table mb-0'>
                    <thead>
                        <tr className='table-danger'>
                            <th className='col-2'>Name</th>
                            <th className='col-2'>Type</th>
                            <th className='col-2'>Range</th>
                            <th className='col-2'>Modifiers</th>
                            <th className='col-2'>Keywords</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipped()}
                    </tbody>
                </table>
            </div>
        )
    }


    if(troopType) return (
      <div className='container my-5' id={`troop-${troopType.id}`}>

        <div className='row'>{troopType.description}</div>

        <table className='table mb-3'>
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
        <div className='row mb-3'>
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