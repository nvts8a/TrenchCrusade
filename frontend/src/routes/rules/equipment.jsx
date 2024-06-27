import { useLoaderData } from 'react-router-dom'
import EquipableCard from '../../components/_equipableCard'
import PageLayout from '../../components/_pageLayout'

export default function Keywords() {
    const loader = useLoaderData()

    const renderEquipable = () => {
        return Object.values(loader.equipment).map((equipable) => <EquipableCard equipable={equipable} key={equipable.id} />)
    }

    return(
        <PageLayout pageName='Equipment'>
            {renderEquipable()}
        </PageLayout>
    )
}