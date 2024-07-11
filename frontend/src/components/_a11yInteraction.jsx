export default function A11yInteraction({children, action}) {

    return(
        <button 
            className='unset icon-link icon-link-hover'
            onClick={action}
            onKeyDown={(event) => { if (event.key === 'Enter') action() }}>
            {children}
        </button>
    )
}