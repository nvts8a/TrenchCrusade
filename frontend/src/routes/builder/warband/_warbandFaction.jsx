import Rules from '../../../components/_rules'
import { updateWarband } from '../../../store/_warbandsActions'
import { useLoaderData } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function WarbandFaction({warband}) {
    const loader = useLoaderData()
    const dispatch = useDispatch()

    if (!warband) return(<></>)

    const faction = loader.factions[warband.factionId]

    const renderVariants = () => {
        const variantOptions = faction.variants.map((variant) => {
            return(<option value={variant.id} key={variant.id}>{variant.name}</option>)
        })

        return(
            <div className='col-sm-12 col-md-5 mb-3'>
                <div className='input-group '>
                    <span className='input-group-text font-english-towne' id='basic-addon1'>Variant</span>
                    <select className='form-select' aria-label='Variant Select'
                        id='variantId' onChange={(event) => dispatch(updateWarband(warband, event))} defaultValue={warband.variantId}>
                        <option value='0'>-</option>
                        {variantOptions}
                    </select>
                </div>
            </div>)
    }

    const renderRules = () => {
        if (!warband.variantId) return(<></>)
        
        const variant = faction.variants.find((variant) => variant.id === warband.variantId)
        
        return(
            <div className='text-start mb-3'>
                <Rules rules={variant.factionVariantRules} />
            </div>
        )
    }


    if (warband) return(
        <div className='row justify-content-center'>
            <div className='col-sm-12 col-md-5 mb-3'>
                <div className='input-group'>
                    <span className='input-group-text font-english-towne' id='basic-addon1'>Faction</span>
                    <input type='text' className='form-control' placeholder='Faction' aria-label='Warband Faction' aria-describedby='basic-addon2'
                        id='name' defaultValue={faction.name} disabled/>
                </div>
            </div>
            {renderVariants()}
            {renderRules()}
        </div>
    )
}