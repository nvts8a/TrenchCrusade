export default function TroopCard({ factionTroopType, troopType, troop }) {
    const isRoster  = !!troop && !!factionTroopType

    const fCost     = (isRoster) ? `(Cost: ${factionTroopType.cost} Ducats)` : ''
    const fMovement = `${troopType.movement}"/${troopType.movementType}`
    const fRanged   = (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice`
    const fMelee    = (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice`
    const fBaseSize = `${troopType.baseSize}mm`

    if(troopType) return (
      <div className='container' id={`troop-${troopType.id}`}>
        <div className='row'>
            <div className='col'><h3 className='font-english-towne'>{troopType.name}</h3></div>
            <div className='col'>{fCost}</div>
        </div>
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
            <div className='col'>Equipment</div>
            <div className='col'>Abilities</div>
            <div className='col'>
                <div>Keywords</div>
                <div className='font-artisan'>
                    <span>ELITE</span>
                    <span>, </span>
                    <span>PILGRAM</span>
                </div>
            </div>
        </div>
      </div>
    )
  }