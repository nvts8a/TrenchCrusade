export default function WarbandFaction({warband, factions, updateWarband}) {
    const renderVariants = (warband, factions) => {
        const variantOptions = factions[warband.factionId].variants.map((variant) => {
            return(<option value={variant.id} key={variant.id}>{variant.name}</option>)
        })

        return(
            <div className='col-sm-12 col-md-5 mb-3'>
                <div className='input-group '>
                    <span className='input-group-text font-english-towne' id='basic-addon1'>Variant</span>
                    <select className='form-select' aria-label='Variant Select'
                        id='variantId' onChange={updateWarband} defaultValue={warband.variantId}>
                        <option value='0'>-</option>
                        {variantOptions}
                    </select>
                </div>
            </div>)
    }

    if (warband) return(
        <div className='row justify-content-center'>
            <div className='col-sm-12 col-md-5 mb-3'>
                <div className='input-group'>
                    <span className='input-group-text font-english-towne' id='basic-addon1'>Faction</span>
                    <input type='text' className='form-control' placeholder='Faction' aria-label='Warband Faction' aria-describedby='basic-addon2'
                        id='name' defaultValue={factions[warband.factionId].name} disabled/>
                </div>
            </div>
            {renderVariants(warband, factions)}
        </div>
    )
}