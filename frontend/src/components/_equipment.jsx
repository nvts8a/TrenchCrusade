import ListGroup from 'react-bootstrap/ListGroup';
import EquipableCard from './_equipableCard';

export default function Equipment({equipment}) {
    if (!equipment) return (<></>)

    const equipmentCards = () => equipment.map((e) => {
        // This lets Equipment take Equipment or TroopEquipment such that keys don't repeat
        const equipable = e.equipment ? e.equipment : e
        return <EquipableCard equipable={equipable} key={e.id} />
    })

    return(
        <ListGroup>
            {equipmentCards()}
        </ListGroup>
    )
}