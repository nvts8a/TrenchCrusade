import Badge from 'react-bootstrap/Badge'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default function Upgrade({upgrade}) {

    return(
        <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 250 }}
            overlay={<Tooltip>UPGRADE</Tooltip>}>
            <Badge pill bg='danger' className='font-artisan ms-1'>{upgrade.name}</Badge>
        </OverlayTrigger>
    )
}