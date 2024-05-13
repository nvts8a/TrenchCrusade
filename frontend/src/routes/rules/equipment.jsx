import PageLayout from '../../components/_pageLayout'

// REDUX
import { useEquipment } from '../../store/loaders'

export default function Keywords() {
    const equipment = useEquipment()

    const renderEquipable = () => {
        return Object.values(equipment).map((equipable) => equipmentCard(equipable))
    }

    const equipmentCard = (equipable) => {
        return(
            <div id={`keyword-${equipable.id}`} key={equipable.id}>
                <h5 className='row text-start'><strong>{equipable.name}</strong></h5>
                <div className='row text-start'><em>{equipable.description}</em></div>
                {weaponBlock(equipable)}
            </div>
        )
    }

    const weaponBlock = (equipable) => {
        if (equipable.type.toLowerCase() === 'melee' || equipable.type.toLowerCase() === 'range') return(
            <table className='table'>
            <thead>
                <tr className='table-danger'>
                    <th className='col-2'>Name</th>
                    <th className='col-2'>Type</th>
                    <th className='col-2'>Range</th>
                    <th className='col-2'>Modifiers</th>
                    <th className='col-2'>Keywords</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{equipable.name}</th>
                    <td>{formatHandedness(equipable.handedness)}</td>
                    <td>{formatRange(equipable.range)}</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </tbody>
            </table>
        )
    }

    const formatHandedness = (handedness) => {
        if (handedness) return(`${handedness}-Handed`)
        return('Special')
    }

    const formatRange = (range) => {
        if (range) return `${range}"`
        return 'Melee'
    }

    return(
        <PageLayout pageName='+ Equipment +'>
            {renderEquipable()}
        </PageLayout>
    )
}