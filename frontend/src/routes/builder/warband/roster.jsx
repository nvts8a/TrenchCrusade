// REACT
import { useLoaderData, useParams } from 'react-router-dom'
import PageLayout from '../../../components/_pageLayout'
import WarbandFaction from './_warbandFaction'
import WarbandAssets from './_warbandAssets'
import WarbandTroops from './_warbandTroops'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { getWarbands, updateWarband } from '../../../store/_warbandsActions'
import WarbandDetails from './_warbandDetails'

export default function Roster() {
    const dispatch = useDispatch()
    const loader = useLoaderData()

    const params   = useParams() 
    const warbands = useSelector(state => state.warbands)

    if (warbands.uninitialized && warbands.loading === 'idle') dispatch(getWarbands())
    const warband = warbands.values[params.id]

    if (!warband) return (<></>)

    return(
        <>
        <PageLayout pageName='Roster'>
            <h5 className='display-5 font-english-towne text-center text-danger'>Warband</h5>
            <WarbandDetails warband={warband} />


        </PageLayout>

        </>)
}