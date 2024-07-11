import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getWarbands } from '../../../store/_warbandsActions'
import { getWarbandEquipment } from '../../../store/_warbandEquipmentActions'

import PageLayout from '../../../components/_pageLayout'
import Troops from './troops/_troops'
import WarbandFaction from './_warbandFaction'
import WarbandAssets from './_warbandAssets'
import WarbandDetails from './_warbandDetails'



export default function Roster() {
    const dispatch = useDispatch()
    const params   = useParams() 
    const warbands = useSelector(state => state.warbands)
    const warbandsLoading = useRef(false)
    const warbandEquipment = useSelector(state => state.warbandEquipment)

    useEffect(() => {
        if (!warbandsLoading.current && warbands.loading === 'idle') {
            warbandsLoading.current = true
            dispatch(getWarbands())
        }
    }, [dispatch, warbands])

    useEffect(() => {
        if (warbands.values[params.id] && !warbandEquipment.values[warbands.values[params.id].id] && warbandEquipment.loading === 'idle') dispatch(getWarbandEquipment(warbands.values[params.id]))
    }, [dispatch, warbands, warbandEquipment, params.id])

    if (!warbands.values[params.id]) return (<></>)
    const warband = warbands.values[params.id]

    return(
        <>
            <PageLayout pageName='Roster'>
                <WarbandDetails warband={warband} />
                <WarbandFaction warband={warband} />
                <WarbandAssets  warband={warband} warbandEquipment={warbandEquipment}/>
            </PageLayout>
            <Troops warband={warband} />
        </>
    )
}