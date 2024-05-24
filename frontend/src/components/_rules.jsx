export default function Rules({rules}) {
    const renderRule = (rule) => {
        return(
            <li className='list-group-item text-start list-group-item-dark'>    
                <span className='fw-bold'>{`⛨ ${rule.name ? rule.name : 'Rule'}: `}</span>
                <span>{rule.rule}</span>
            </li>
        )
    }


    const renderRules = () => rules.map((rule) => renderRule(rule))

    if (rules) return(
        <ul className='list-group list-group-flush'>
            {renderRules()}
        </ul>
    )
    
    return(<></>)
}

