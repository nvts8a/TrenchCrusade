import Button from 'react-bootstrap/Button'

export default function A11yButton({children, action}) {

    return(
        <Button variant='danger'             
            onClick={action}
            onKeyDown={(event) => { if (event.key === 'Enter') action() }}>
            {children}
        </Button>
    )
}