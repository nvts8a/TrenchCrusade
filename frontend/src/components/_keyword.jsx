import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

export default function Keyword({keyword}) {

    return(
        <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 250 }}
            overlay={<Tooltip>{keyword.definition}</Tooltip>}>
            <span className='badge rounded-pill text-bg-secondary font-artisan ms-1'>{keyword.name}</span>
        </OverlayTrigger>
    )
}