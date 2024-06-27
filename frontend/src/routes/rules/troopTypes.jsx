import { useLoaderData } from 'react-router-dom'
import PageLayout from '../../components/_pageLayout'

export default function Keywords() {
    const loader = useLoaderData()

    const renderTroopTypes = () => {
        return Object.values(loader.troopTypes).map((troopType) => <div><p>{troopType.name}</p></div>)
    }

    return(
        <PageLayout pageName='Troop Types'>
            {renderTroopTypes()}
        </PageLayout>
    )
}