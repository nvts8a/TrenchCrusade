export default function FactionDetails({warband, factions, updateWarband}) {
    const renderVariants = (warband, factions) => {
        let defaultValue = 0
        const variantOptions = factions[warband.factionId].variants.map((variant) => {
            if (warband.variant && warband.variant.id === variant.id) defaultValue = variant.id
            return(<option value={variant.id} key={variant.id}>{variant.name}</option>)
        })

        return(
            <div className='col input-group mb-3'>
                <span className='input-group-text font-english-towne' id='basic-addon1'>Variant</span>
                <select className='form-select' aria-label='Variant Select'
                    id='variantId' onChange={updateWarband} defaultValue={warband.variantId}>
                    <option value='0'>-</option>
                    {variantOptions}
                </select>
            </div>)
    }

    if (warband) return(
        <div className='row'>
            <div className='col input-group mb-3'>
                <span className='input-group-text font-english-towne' id='basic-addon1'>Faction</span>
                <input type='text' className='form-control' placeholder='Faction' aria-label='Warband Faction' aria-describedby='basic-addon2'
                    id='name' defaultValue={factions[warband.factionId].name} disabled/>
            </div>
            {renderVariants(warband, factions)}
        </div>
    )
}