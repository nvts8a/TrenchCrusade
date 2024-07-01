import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getWarbands } from '../../../store/_warbandsActions'
import { getWarbandEquipment } from '../../../store/_warbandEquipmentActions'
import { getTroops } from '../../../store/_warbandTroopsActions'

import PageLayout from '../../../components/_pageLayout'
import WarbandFaction from './_warbandFaction'
import WarbandAssets from './_warbandAssets'
import WarbandDetails from './_warbandDetails'
import WarbandTroops from './_warbandTroops'



export default function Roster() {
    const dispatch = useDispatch()
    const params   = useParams() 
    const warbands = useSelector(state => state.warbands)
    const warbandsLoading = useRef(false)
    const warbandEquipment = useSelector(state => state.warbandEquipment)
    const troops = useSelector(state => state.warbandTroops)

    useEffect(() => {
        if (!warbandsLoading.current && warbands.loading === 'idle') {
            warbandsLoading.current = true
            dispatch(getWarbands())
        }
    }, [dispatch, warbands])

    useEffect(() => {
        if (warbands.values[params.id] && !warbandEquipment.values[warbands.values[params.id].id] && warbandEquipment.loading === 'idle') dispatch(getWarbandEquipment(warbands.values[params.id]))
        if (warbands.values[params.id] && !troops.values[warbands.values[params.id].id] && troops.loading === 'idle') dispatch(getTroops(warbands.values[params.id]))
    }, [dispatch, warbands, warbandEquipment, troops, params.id])

    if (!warbands.values[params.id]) return (<></>)
    const warband = warbands.values[params.id]

    return(
        <>
            <PageLayout pageName='Roster'>
                <h5 className='display-5 font-english-towne text-center text-danger'>Warband</h5>
                <WarbandDetails warband={warband} />
                <WarbandFaction warband={warband} />
                <WarbandAssets  warband={warband} warbandEquipment={warbandEquipment}/>
            </PageLayout>
            <WarbandTroops warband={warband} troops={troops}/>
        </>
    )
}