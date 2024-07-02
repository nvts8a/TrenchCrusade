import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { createTroopUpgrade, removeTroopUpgrade } from '../../../store/_troopsUpgradesActions'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Rules from '../../../components/_rules'

export default function AddNewUpgrade({warband, troop, troopType, currentUpgrades}) {
    const dispatch = useDispatch()
    const loader = useLoaderData()

    const [show, setShow] = useState(false)
    const handleClose     = () => setShow(false)
    const handleShow      = () => setShow(true)

    const CustomToggle = ({ upgrade }) => {
        const cost = upgrade.cost ? upgrade.cost + ' ' + (upgrade.currency ? upgrade.currency : 'ducats' ) : ''

        return (
            <div className='d-inline-block w-75' onClick={useAccordionButton(upgrade.id)}>
                <span className='d-inline-block' style={{minWidth: '25%'}}>{cost}</span>
                <span className='d-inline-block'>{upgrade.name}</span>
            </div>
        )
    }

    const toggleUpgrade = (upgrade) => (event) => {
        if (event.target.checked) dispatch(createTroopUpgrade(troop, upgrade))
        else                      dispatch(removeTroopUpgrade(troop, currentUpgrades, upgrade))
    }

    const renderUpgrades = () => {
        return(troopType.troopTypeUpgrades
            .filter((troopTypeUpgrade) => !troopTypeUpgrade.factionVariantId || troopTypeUpgrade.factionVariantId === warband.variantId)
            .sort((upgradeA, upgradeB) => upgradeA.upgrade.name.localeCompare(upgradeB.upgrade.name))
            .map((troopTypeUpgrade) => {
            const currentlyUpgraded = currentUpgrades.filter((currentUpgrade) => currentUpgrade.upgrade.id === troopTypeUpgrade.upgrade.id).length > 0

            const upgradeModifiers = () => {
                if (troopTypeUpgrade.upgrade.upgradeModifiers.length > 0) {
                    const modifiersAsRules = troopTypeUpgrade.upgrade.upgradeModifiers.map((modifier) => {
                        switch (modifier.type) {
                            case 'keyword':
                                return({name: loader.keywords[modifier.value].name, rule: loader.keywords[modifier.value].definition})
                            case 'equipment':
                                return({name: 'Equipment', rule: loader.equipment[modifier.value].name})
                            case 'armor':
                                return({name: 'Armour', rule: modifier.value})
                            case 'melee':
                                return({name: 'Melee',  rule: (modifier.value < 0) ? `${modifier.value} Dice` : `+${modifier.value} Dice` })
                            case 'range':
                                return({name: 'Ranged', rule: (modifier.value < 0) ? `${modifier.value} Dice` : `+${modifier.value} Dice` })
                            default:
                                return({name: modifier.type, rule: modifier.value })
                        }
                    })
                    return(<Rules rules={modifiersAsRules} />)
                }
            }

            const upgradeRules = () => {
                if (troopTypeUpgrade.upgrade.upgradeRules.length > 0) {
                    const upgradeRules = troopTypeUpgrade.upgrade.upgradeRules.map((upgradeRules) => upgradeRules.factionVariantRule)
                    return(<Rules rules={upgradeRules} />)
                }
            }

            return(
                <Card key={troopTypeUpgrade.upgrade.id}>
                    <Card.Header>
                        <Form.Check className='d-inline-block ms-2 me-3' 
                            type='switch' 
                            defaultChecked={currentlyUpgraded}
                            onChange={toggleUpgrade(troopTypeUpgrade.upgrade)} />
                        <CustomToggle upgrade={troopTypeUpgrade.upgrade} />
                    </Card.Header>
                    <Accordion.Collapse eventKey={troopTypeUpgrade.upgrade.id}>
                        <>
                            {upgradeRules()}
                            {upgradeModifiers()}
                        </>
                    </Accordion.Collapse>
                </Card>
            )
        }))
    }
    
    return(<>
        <Button variant='danger ms-2'><i className='bi bi-award-fill px-5' onClick={handleShow}></i></Button>
        <Modal className='text-dark' show={show} onHide={handleClose} size='md' centered>
            <Modal.Header closeButton>
                <Modal.Title className='w-100 text-center font-english-towne'>Upgrades</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    {renderUpgrades()}
                </Accordion>
            </Modal.Body>
        </Modal>
    </>)
}

