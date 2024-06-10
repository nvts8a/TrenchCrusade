import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Card from 'react-bootstrap/Card';
import TroopCard from './_warbandTroopsCard'

export default function AddNewTroop({warband, allFactionTroopTypes, troopTypes, createTroop}) {
    const [showAddTroop, setShowAddTroop] = useState(false)
    const handleClose     = () => setShowAddTroop(false)
    const handleShow      = () => setShowAddTroop(true)

    function CustomToggle({ children, eventKey }) {      
        return (
            <>
            <div className='d-inline-block' style={{width: '66%'}} onClick={useAccordionButton(eventKey)}>
                {children}
            </div>
            </>
        );
      }

    const renderTroopTypes = (factionTroopTypes) => {
        return(Object.values(factionTroopTypes).map((factionTroopType) => {
            const troopType = troopTypes[factionTroopType.troopTypeId]

            return(
                <Card key={factionTroopType.id}>
                    <Card.Header className=''>
                        <span className='icon-link icon-link-hover me-3' onClick={createTroop(factionTroopType, troopTypes[factionTroopType.troopTypeId])}>
                            <i className='bi bi-plus-circle'></i>
                        </span>
                        <CustomToggle eventKey={factionTroopType.id}>{troopType.name}</CustomToggle>
                        <span>
                            {factionTroopType.cost} {factionTroopType.currency ? factionTroopType.currency : 'ducats'}
                        </span>
                    </Card.Header>
                    <Accordion.Collapse eventKey={factionTroopType.id}>
                        <TroopCard troop={factionTroopType} />
                    </Accordion.Collapse>
                </Card>
            )
        }))
    }

    return(<>
        <div className='container text-center'>
            <Button className='my-2' variant='danger' onClick={handleShow}><i className='bi bi-person-fill-add px-5' /></Button>
        </div>
        <Modal className='text-dark' show={showAddTroop} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title className='font-english-towne'>Recruitment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {renderTroopTypes(allFactionTroopTypes[warband.factionId])}
                </Accordion>
            </Modal.Body>
        </Modal>
        </>)
}