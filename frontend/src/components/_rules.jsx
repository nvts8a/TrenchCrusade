import ListGroup from 'react-bootstrap/ListGroup';

export default function Rules({rules}) {
    const renderRule = (rule) => {
        return(
            <ListGroup.Item variant='dark' key={rule.id}>    
                <span className='fw-bold'>{`⛨ ${rule.name ? rule.name : 'Rule'}: `}</span>
                <span>{rule.rule}</span>
            </ListGroup.Item>
        )
    }


    const renderRules = () => rules.map((rule) => renderRule(rule))

    if (rules) return(
        <ListGroup>
            {renderRules()}
        </ListGroup>
    )
    
    return(<></>)
}

