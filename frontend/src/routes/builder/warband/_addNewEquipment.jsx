import { useState } from 'react'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import EquipableCard from '../../../components/_equipableCard'
import Modal from 'react-bootstrap/Modal'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch } from 'react-redux'

export default function AddNewEquipment({currentEquipment, availableEquipment, createEquipment, removeEquipment}) {
    const dispatch        = useDispatch()
    const [show, setShow] = useState(false)
    const handleClose     = () => setShow(false)
    const handleShow      = () => setShow(true)

    if (!currentEquipment) return(<></>)

    const CustomToggle = ({ children, eventKey }) => {      
        return (
            <>
                <div className='d-inline-block w-75' onClick={useAccordionButton(eventKey)}>
                    {children}
                </div>
            </>
        )
      }

    const renderEquipment = (equipmentType) => {
        return(equipmentType.map((factionEquipable) => {
            const count = currentEquipment.filter((currentEquipable) => currentEquipable.factionEquipmentId === factionEquipable.id).length

            return(
                <Card key={factionEquipable.id}>
                    <Card.Header className=''>
                        <span className='icon-link icon-link-hover me-3' onClick={() => dispatch(removeEquipment(currentEquipment, factionEquipable))}>
                            <i className='bi bi-dash-circle'></i>
                        </span>
                        <span className='me-3'>
                            {count}
                        </span>
                        <span className='icon-link icon-link-hover me-3' onClick={() => dispatch(createEquipment(factionEquipable))}>
                            <i className='bi bi-plus-circle'></i>
                        </span>
                        <CustomToggle eventKey={factionEquipable.id}>{factionEquipable.equipment.name}</CustomToggle>
                        <span>
                            {factionEquipable.cost} {factionEquipable.currency ? factionEquipable.currency : 'ducats'}
                        </span>
                    </Card.Header>
                    <Accordion.Collapse eventKey={factionEquipable.id}>
                        <EquipableCard equipable={factionEquipable.equipment} />
                    </Accordion.Collapse>
                </Card>
            )
        }))
    }

    const equipmentByType = {}
    Object.values(availableEquipment)
            .sort((equipableA, equipableB) => equipableA.equipment.name.localeCompare(equipableB.equipment.name))
            .forEach((equipable) => {
                if (!equipmentByType[equipable.equipment.type]) equipmentByType[equipable.equipment.type] = []
                equipmentByType[equipable.equipment.type].push(equipable)
            })

    const equipmentTabs = Object.keys(equipmentByType).map((type) => {
        return(
            <Tab eventKey={type} title={type} key={type}>
                <Accordion>
                    {renderEquipment(equipmentByType[type])}
                </Accordion>
            </Tab>
        )
    })

    return(
        <>
            <Button variant='danger'><i className='bi bi-shield-fill-plus px-5' onClick={handleShow}></i></Button>
            <Modal className='text-dark' show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center font-english-towne'>Armory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs fill className='font-english-towne fs-7'>
                        {equipmentTabs}
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    )
}

