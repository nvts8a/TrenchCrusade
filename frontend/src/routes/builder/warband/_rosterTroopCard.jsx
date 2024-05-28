import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import TroopCard from '../../../components/_troopCard';
import { useEquipment } from '../../../store/loaders';

export default function RosterTroopCard({factionTroopType, troop, warband, handleDelete}) {
    const [show, setShow] = useState(false)
    const equipment = useEquipment()

    if (!factionTroopType || !troop) return(<></>)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const fCost = `(Value: ${factionTroopType.cost} Ducats)`
    const renderEquipmentPicker = (equipment) => {
        return(equipment.map( (equipable) => {
            return(<div className='row' key={equipable.id}>
                <div>{equipable.id}</div>
                <div>{equipable.cost}</div>
                <div>{equipable.currency}</div>
                <div>{equipable.max}</div>
                <div>{equipable.filter}</div>
            </div>)
        
        }))
    }


    return(
        <div className='container'>
            <div className='row'>
                <div className='col-4'>{fCost}</div>
                <div className='col-4'><h3 className='font-english-towne'>{troop.name}</h3></div>
                <div className='col-2 icon-link icon-link-hover' onClick={handleShow}><i className='bi bi-backpack4-fill'></i></div>
                <div className='col-2 icon-link icon-link-hover' onClick={handleDelete}><i className='bi bi-trash-fill'></i></div>
                <TroopCard troopType={factionTroopType.troopType} />
            </div>
            <Modal show={show} onHide={handleClose} className='text-dark' centered>
                <Modal.Header closeButton>
                    <Modal.Title className='col-6 font-english-towne'>{troop.name} Equipment</Modal.Title>
                    <div className='col-5'>{fCost}</div>
                </Modal.Header>
                <Modal.Body>{renderEquipmentPicker(warband.faction.factionEquipment)}</Modal.Body>
                <Modal.Footer>
                    <div className='col'>Pay Chest: {warband.ducats} Ducats</div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}