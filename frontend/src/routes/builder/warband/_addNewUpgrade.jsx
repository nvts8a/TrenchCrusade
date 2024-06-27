// REACT
import { useState } from 'react'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import EquipableCard from '../../../components/_equipableCard'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export default function AddNewUpgrade({troop, troopType, createUpgrade, removeUpgrade}) {
    const [show, setShow] = useState(false)
    const handleClose     = () => setShow(false)
    const handleShow      = () => setShow(true)
    console.log(troop.upgrades)
    console.log(troopType.troopTypeUpgrades)

    const CustomToggle = ({ children, eventKey }) => {      
        return (
            <>
            <div className='d-inline-block w-75' onClick={useAccordionButton(eventKey)}>
                {children}
            </div>
            </>
        )
    }

    const renderUpgrades = () => {
        return(troopType.troopTypeUpgrades.map((upgrade) => {
            return(
                <Card key={upgrade.id}>
                    <Card.Header className=''>
                        <Form.Check type='switch' />
                        <CustomToggle eventKey={upgrade.id}>{upgrade.name}</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={upgrade.id}>
                        UPGRADE
                    </Accordion.Collapse>
                </Card>
            )
        }))
    }
    
    return(<>
        <Button variant='danger ms-2'><i className='bi bi-award-fill px-5' onClick={handleShow}></i></Button>
        <Modal className='text-dark' show={show} onHide={handleClose} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title className='w-100 text-center font-english-towne'>Upgrades</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {renderUpgrades}
                </Accordion>
            </Modal.Body>
        </Modal>
    </>)
}

