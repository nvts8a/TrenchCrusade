import EquipmentCard from '../../components/_equipmentCard'
import PageLayout from '../../components/_pageLayout'

// REDUX
import { useEquipment } from '../../store/loaders'

export default function Keywords() {
    const equipment = useEquipment()

    const renderEquipable = () => {
        return Object.values(equipment).map((equipable) => <EquipmentCard equipable={equipable} key={equipable.id} />)
    }

    return(
        <PageLayout pageName='Equipment'>
            {renderEquipable()}
        </PageLayout>
    )
}