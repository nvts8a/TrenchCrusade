import { useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Card from 'react-bootstrap/Card';
import EquipmentCard from '../../../components/_equipableCard'

export default function AddNewTroopEquipment({warband, troopEquipment, equipment, allFactionEquipment, handleCreateEquipment, handleRemoveEquipment}) {
    const [show, setShow] = useState(false)
    const handleClose     = () => setShow(false)
    const handleShow      = () => setShow(true)
    if (!troopEquipment) troopEquipment = []

    const CustomToggle = ({ children, eventKey }) => {      
        return (
            <>
            <div className='d-inline-block w-75' onClick={useAccordionButton(eventKey)}>
                {children}
            </div>
            </>
        )
      }

    const renderEquipment = (factionEquipment) => {
        return(Object.values(factionEquipment).map((factionEquipable) => {
            const equipable = equipment[factionEquipable.equipmentId]
            const count = troopEquipment.filter((equipable) => equipable.factionEquipmentId === factionEquipable.id).length

            return(
                <Card key={factionEquipable.id}>
                    <Card.Header className=''>
                        <span className='icon-link icon-link-hover me-3' onClick={handleRemoveEquipment(factionEquipable)}>
                            <i className='bi bi-dash-circle'></i>
                        </span>
                        <span className='me-3'>
                            {count}
                        </span>
                        <span className='icon-link icon-link-hover me-3' onClick={handleCreateEquipment(factionEquipable, equipment[factionEquipable.equipmentId])}>
                            <i className='bi bi-plus-circle'></i>
                        </span>
                        <CustomToggle eventKey={factionEquipable.id}>{equipable.name}</CustomToggle>
                        <span>
                            {factionEquipable.cost} {factionEquipable.currency ? factionEquipable.currency : 'ducats'}
                        </span>
                    </Card.Header>
                    <Accordion.Collapse eventKey={factionEquipable.id}>
                        <EquipmentCard equipable={equipment[factionEquipable.equipmentId]} />
                    </Accordion.Collapse>
                </Card>
            )
        }))
    }

    return(<>
        <i className='bi bi-shield-fill-plus' onClick={handleShow}></i>
        <Modal className='text-dark' show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title className='font-english-towne'>Armory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {renderEquipment(allFactionEquipment[warband.factionId])}
                </Accordion>
            </Modal.Body>
        </Modal>
        </>)
}