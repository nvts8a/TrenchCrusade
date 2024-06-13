import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Card from 'react-bootstrap/Card';
import TroopCard from './_warbandTroopsCard'

export default function AddNewTroop({currentTroops, factionTroopTypes, allTroopTypes, createTroop}) {
    const [showAddTroop, setShowAddTroop] = useState(false)
    const handleClose     = () => setShowAddTroop(false)
    const handleShow      = () => setShowAddTroop(true)

    if (!factionTroopTypes || !allTroopTypes) return (<></>)
    
    function CustomToggle({ eventKey, currentCount, factionTroopType, name }) {
        const invalidMin = factionTroopType.min && currentCount < factionTroopType.min
        const invalidMax = factionTroopType.max && currentCount > factionTroopType.max
        const textClass  = invalidMin || invalidMax ? 'text-danger' : ''
        const cost       = factionTroopType.cost + ' ' + (factionTroopType.currency ? factionTroopType.currency : 'ducats' )
        const counter    = currentCount + (factionTroopType.max ? '/' + factionTroopType.max : '')
        
        return (
            <div className={`d-inline-block ${textClass}`} style={{width: '80%'}} onClick={useAccordionButton(eventKey)}>
                <span className='d-inline-block' style={{minWidth: '25%'}}>{cost}</span>
                <span className='d-inline-block text-center' style={{minWidth: '20%'}}><strong>{counter}</strong></span>
                <span className='d-inline-block'>{name}</span>
            </div>
        )
      }

    const renderTroopTypes = () => {
        return(Object.values(factionTroopTypes).map((factionTroopType) => {
            const troopType = allTroopTypes[factionTroopType.troopTypeId]
            const currentCount = currentTroops.filter((troop) => troop.factionTroopTypeId === factionTroopType.id).length

            return(
                <Card key={factionTroopType.id}>
                    <Card.Header>
                        <span className='icon-link icon-link-hover me-3' onClick={createTroop(factionTroopType, allTroopTypes[factionTroopType.troopTypeId])}>
                            <i className='bi bi-plus-square'/>
                        </span>
                        <CustomToggle eventKey={factionTroopType.id} currentCount={currentCount} factionTroopType={factionTroopType} name={troopType.name} />
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
                <Modal.Title className='w-100 text-center font-english-towne'>Recruitment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {renderTroopTypes()}
                </Accordion>
            </Modal.Body>
        </Modal>
        </>)
}