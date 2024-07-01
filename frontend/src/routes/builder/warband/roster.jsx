import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWarbands } from '../../../store/_warbandsActions'
import { useParams } from 'react-router-dom'

import PageLayout from '../../../components/_pageLayout'
import WarbandFaction from './_warbandFaction'
import WarbandAssets from './_warbandAssets'
import WarbandDetails from './_warbandDetails'
import WarbandTroops from './_warbandTroops'


export default function Roster() {
    const dispatch = useDispatch()
    const params   = useParams() 
    const warbands = useSelector(state => state.warbands)

    useEffect(() => {
        if (warbands.uninitialized && warbands.loading === 'idle') dispatch(getWarbands())
    })

    if (!warbands.values[params.id]) return (<></>)
    const warband = warbands.values[params.id]

    return(
        <>
            <PageLayout pageName='Roster'>
                <h5 className='display-5 font-english-towne text-center text-danger'>Warband</h5>
                <WarbandDetails warband={warband} />
                <WarbandFaction warband={warband} />
                <WarbandAssets  warband={warband} />
            </PageLayout>
            <WarbandTroops warband={warband} />
        </>
    )
}