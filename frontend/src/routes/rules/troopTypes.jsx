import PageLayout from '../../components/_pageLayout'
import TroopCard from '../../components/_troopCard'
import { useTroopTypes } from '../../store/loaders'

export default function Keywords() {
    const troopTypes = useTroopTypes()

    const renderTroopTypes = () => {
        return Object.values(troopTypes).map((troopType) => <TroopCard troopType={troopType} key={troopType.id} />)
    }

    return(
        <PageLayout pageName='Troop Types'>
            {renderTroopTypes()}
        </PageLayout>
    )
}