import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import RosterTroopRow from './_rosterTroopRow'

export default function AddNewTroop({warband, allFactionTroopTypes, troopTypes, createTroop}) {
    const [show, setShow] = useState(false)
    const handleClose     = () => setShow(false)
    const handleShow      = () => setShow(true)

    const renderTroopTypes = (factionTroopTypes) => {
        return(Object.values(factionTroopTypes).map((factionTroopType) => {
            const troopType = troopTypes[factionTroopType.troopTypeId]

            return(
                <Accordion.Item key={factionTroopType.id} eventKey={factionTroopType.id}>
                    <Accordion.Header>
                            <span className='icon-link icon-link-hover' onClick={createTroop(factionTroopType, troopTypes[factionTroopType.troopTypeId])}>
                                <i className='bi bi-plus-circle'></i>
                            </span>
                            <span className='ms-3'>{troopType.name}</span>
                    </Accordion.Header>
                    <Accordion.Body>
                        {renderAddTroopTypeCard(factionTroopType)}
                    </Accordion.Body>
                </Accordion.Item>
            )
        }))
    }

    const renderAddTroopTypeCard = (factionTroopType) => {
        return(
            <table className='table table-borderless'>
            <thead>
                <tr className='table-danger'>
                    <th className='col-2'>Movement</th>
                    <th className='col-2'>Ranged</th>
                    <th className='col-2'>Melee</th>
                    <th className='col-2'>Armour</th>
                    <th className='col-2'>Keywords</th>
                    <th className='col-2'>Base</th>
                </tr>
            </thead>
            <tbody>
                <RosterTroopRow recruitment='true' troopType={troopTypes[factionTroopType.troopTypeId]} key={factionTroopType.id}/>
            </tbody>
        </table>
        )
    }

    return(<>
        <Button variant='danger' onClick={handleShow}>Add Troop</Button>
        <Modal className='text-dark' show={show} onHide={handleClose} size='lg' centered>
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