import ListGroup from 'react-bootstrap/ListGroup';
import EquipableCard from './_equipableCard';

export default function Equipment({equipment}) {
    if (!equipment) return (<></>)

    const equipmentCards = () => equipment.map((equipable) => <EquipableCard equipable={equipable} key={equipable.id} />)

    return(
        <ListGroup>
            {equipmentCards()}
        </ListGroup>
    )
}