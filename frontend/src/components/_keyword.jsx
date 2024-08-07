import Badge from 'react-bootstrap/Badge'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default function Keyword({keyword}) {

    return(
        <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 250 }}
            overlay={<Tooltip>{keyword.definition}</Tooltip>}>
            <Badge pill bg='secondary' className='font-artisan ms-1'>{keyword.name}</Badge>
        </OverlayTrigger>
    )
}