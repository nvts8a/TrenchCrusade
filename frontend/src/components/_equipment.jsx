import Keyword from './_keyword'
import ListGroup from 'react-bootstrap/ListGroup';
import Rules from './_rules';

function EquipableCard({equipable}) {
    if (!equipable) return (<></>)

    const keywords = () => {
        if (equipable.keywords.length > 0) return equipable.keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
    }

    const handedness = () => {
        if (equipable.handedness) return(`${equipable.handedness}-Handed`)
        return('Special')
    }
    
    const range = () => {
        if (equipable.range) return `${equipable.range}"`
        if (equipable.handedness) return 'Melee'
        return '-'
    }

    const modifiers = () => {
        if (equipable.modifiers && equipable.modifiers.length > 0) {
            return equipable.modifiers.map((modifier) => {
                let formattedModifier = (modifier.value > 0 ? '+' : '') + modifier.value

                if (modifier.type === 'injure' ||  modifier.type === 'hit') {
                    formattedModifier = formattedModifier + 'D to ' + modifier.type
                } else {
                    formattedModifier = formattedModifier + ' to ' + modifier.type
                }
                
                return(formattedModifier)            
            }).join(', ')
        }
        return '-'
    }

    const statBlock = (label, stat) => {
        return(
            <div className='col-4 col-md-2 text-center mb-2' key={label}>
                <p className='m-0'><strong>{label}</strong></p>
                {stat}
            </div>
        )
    }

    return(
        <ListGroup.Item eventKey={equipable.id} key={equipable.id}>    
            <div className='row w-100'>
                <div className='col-6 col-md-3 font-english-towne'>
                    <h5>{equipable.name}</h5>
                </div>
                <div className='col-6 col-md-3 font-english-towne'>
                    {keywords()}
                </div>
                {statBlock('Type',      handedness())}
                {statBlock('Range',     range())}
                {statBlock('Modifiers', modifiers())}
            </div>
            <Rules rules={equipable.rules} />
        </ListGroup.Item>
    )
}

export default function Equipment({equipment}) {
    if (!equipment) return (<></>)

    const equipmentCards = () => equipment.map((equipable) => <EquipableCard equipable={equipable} key={equipable.id} />)

    return(
        <ListGroup>
            {equipmentCards()}
        </ListGroup>
    )
}