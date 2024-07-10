import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { createWarband } from '../../../store/_warbandsActions'

const CustomToggle = ({ label, eventKey }) => {
    const style = {
        textShadow: '2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff'
    }

    return (
        <h1 className='text-center text-danger font-english-towne p-4' style={style} onClick={useAccordionButton(eventKey)}>
            {label}
        </h1>
    )
}

const FactionCard = ({faction, handleAdd}) => {
    const style = {
        backgroundImage: `url('/img/${faction.id}/banner.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: '100%'
      }

    const paragraphs = faction.description.split('|')
    let firstParagraph = paragraphs.shift()
    const firstLetter = firstParagraph.substring(0,1)
    firstParagraph = firstParagraph.substring(1)
    const description = paragraphs.map((paragraph) => <p style={{textIndent: '20px'}}>{paragraph}</p>)

    return (
        <Card className='faction'>
            <Card.Header style={style}>
                <CustomToggle label={faction.name} eventKey={faction.id} />
            </Card.Header>
            <Accordion.Collapse eventKey={faction.id}>
                <div className='text-center my-3'>
                    <Button variant='danger ms-2' onClick={() => handleAdd(faction)}><i className='bi bi-bookmark-plus-fill px-5' /></Button>
                    <div className='col-11 text-start container'>
                        <div className='ps-2 lh-1 float-start font-english-towne text-danger' style={{fontSize: '72px'}}>{firstLetter}</div>
                        <p className='pt-4'>{firstParagraph}</p>
                        {description}
                    </div>
                </div>
            </Accordion.Collapse>
        </Card>
    )
}

export default function AddNewWarband() {
    const dispatch = useDispatch()
    const loader   = useLoaderData()

    const [show, setShow] = useState(false)
    const handleClose     = () => setShow(false)
    const handleShow      = () => setShow(true)
    const handleAdd       = (faction) => {
        dispatch(createWarband(faction))
        handleClose()
    }


    const factionCards = Object.values(loader.factions).map((faction) => {
        return <FactionCard faction={faction} key={faction.id} handleAdd={handleAdd} />
    })

    return(
        <>
            <Button variant='danger font-artisan' onClick={handleShow}>New Warband</Button>
            <Modal className='text-dark' show={show} onHide={handleClose} size='lg' centered>
                <Modal.Body>
                    <Accordion>
                        {factionCards}
                    </Accordion>
                </Modal.Body>
            </Modal>
        </>
    )
}

