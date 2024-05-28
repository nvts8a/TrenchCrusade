import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import RosterTroopRow from './_rosterTroopRow'

export default function AddNewTroop({warband, createTroop}) {
    const [show, setShow] = useState(false)
    const handleClose     = () => setShow(false)
    const handleShow      = () => setShow(true)
    
    const renderTroopTypes = (factionTroopTypes) => {
        return(factionTroopTypes.map((factionTroopType) => {
            const troopType = factionTroopType.troopType
            const handleCreate = (create, close) => {
                create()
                close()
            }
            return(
                <Accordion.Item eventKey={factionTroopType.id}>
                    <Accordion.Header>
                        <div className='row'>
                            <div className='col-10'>{troopType.name}</div>
                            <div className='col-2 icon-link icon-link-hover'
                                    onClick>
                                <i className='bi bi-person-fill-add'></i>
                            </div>
                        </div>
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
                <RosterTroopRow recruitment='true' factionTroopType={factionTroopType} />
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
                    {renderTroopTypes(warband.faction.factionTroopTypes)}
                </Accordion>
            </Modal.Body>
        </Modal>
        </>)
}