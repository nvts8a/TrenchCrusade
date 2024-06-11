// REACT
import { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import EquipableCard from '../../../components/_equipableCard'
import Modal from 'react-bootstrap/Modal'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

export default function AddNewEquipment({currentEquipment, factionEquipment, allEquipment, createEquipment, removeEquipment}) {
    const [show, setShow] = useState(false)
    const handleClose     = () => setShow(false)
    const handleShow      = () => setShow(true)

    if (!factionEquipment || !allEquipment) return(<></>)

    const CustomToggle = ({ children, eventKey }) => {      
        return (
            <>
            <div className='d-inline-block w-75' onClick={useAccordionButton(eventKey)}>
                {children}
            </div>
            </>
        )
      }

    const renderEquipment = () => {
        return(Object.values(factionEquipment).map((factionEquipable) => {
            const equipable = allEquipment[factionEquipable.equipmentId]
            const count = currentEquipment.filter((equipable) => equipable.factionEquipmentId === factionEquipable.id).length

            return(
                <Card key={factionEquipable.id}>
                    <Card.Header className=''>
                        <span className='icon-link icon-link-hover me-3' onClick={removeEquipment(factionEquipable)}>
                            <i className='bi bi-dash-circle'></i>
                        </span>
                        <span className='me-3'>
                            {count}
                        </span>
                        <span className='icon-link icon-link-hover me-3' onClick={createEquipment(factionEquipable, allEquipment[factionEquipable.equipmentId])}>
                            <i className='bi bi-plus-circle'></i>
                        </span>
                        <CustomToggle eventKey={factionEquipable.id}>{equipable.name}</CustomToggle>
                        <span>
                            {factionEquipable.cost} {factionEquipable.currency ? factionEquipable.currency : 'ducats'}
                        </span>
                    </Card.Header>
                    <Accordion.Collapse eventKey={factionEquipable.id}>
                        <EquipableCard equipable={allEquipment[factionEquipable.equipmentId]} />
                    </Accordion.Collapse>
                </Card>
            )
        }))
    }

    return(<>
        <Button variant='danger'><i className='bi bi-shield-fill-plus px-5' onClick={handleShow}></i></Button>
        <Modal className='text-dark' show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title className='w-100 text-center font-english-towne'>Armory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {renderEquipment()}
                </Accordion>
            </Modal.Body>
        </Modal>
        </>)
}

