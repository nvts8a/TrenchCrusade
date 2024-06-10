import EquipableCard from '../../components/_equipableCard'
import PageLayout from '../../components/_pageLayout'

// REDUX
import { useEquipment } from '../../store/loaders'

export default function Keywords() {
    const equipment = useEquipment()

    const renderEquipable = () => {
        return Object.values(equipment).map((equipable) => <EquipableCard equipable={equipable} key={equipable.id} />)
    }

    return(
        <PageLayout pageName='Equipment'>
            {renderEquipable()}
        </PageLayout>
    )
}