export default function TroopCard({ troop }) {
    const fMovement = `${troop.troopType.movement}"/${troop.troopType.movementType}`
    const fRanged   = (troop.troopType.range < 0) ? `-${troop.troopType.range} Dice` : `+${troop.troopType.range} Dice`
    const fMelee    = (troop.troopType.melee < 0) ? `-${troop.troopType.melee} Dice` : `+${troop.troopType.melee} Dice`
    const fBaseSize = `${troop.troopType.baseSize}mm`

    if(troop) return (
      <div className='container' id={`troop-${troop.id}`}>
        <div className='row'>
            <div className='col'>{troop.troopType.name}</div>
            <div className='col'>Cost: 80 Ducats</div>
        </div>
        <div className='row'>{troop.troopType.description}</div>
        <div className='row'>
            <div className='col'>Name</div>
            <div className='col'>Movement</div>
            <div className='col'>Ranged</div>
            <div className='col'>Melee</div>
            <div className='col'>Armour</div>
            <div className='col'>Base</div>
        </div>
        <div className='row'>
            <div className='col'>{troop.troopType.name}</div>
            <div className='col'>{fMovement}</div>
            <div className='col'>{fRanged}</div>
            <div className='col'>{fMelee}</div>
            <div className='col'>{troop.troopType.armour}</div>
            <div className='col'>{fBaseSize}</div>
        </div>
        <div>
            <div>Equipment</div>
        </div>
        <div>
            <div>Abilities</div>
        </div>
        <div>
            <div>Keywords</div>
            <div className='font-artisan'>
                <span>ELITE</span>
                <span>, </span>
                <span>PILGRAM</span>
            </div>
        </div>
      </div>
    )
  }