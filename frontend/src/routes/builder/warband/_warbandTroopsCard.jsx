// REACT
import Accordion from 'react-bootstrap/Accordion'
import Keyword from '../../../components/_keyword'
import Rules from '../../../components/_rules'

// REDUX
import { useEquipment, useTroopTypes } from '../../../store/loaders'
import Equipment from '../../../components/_equipment'

export default function TroopCard({troop, factionTroopType, removeTroop}) {
    const equipment  = useEquipment()
    const troopTypes = useTroopTypes()
    const troopType = troopTypes[troop.troopTypeId]

    if (!troopType) return(<></>)

    /*
    const params   = useParams()

    const [troopEquipment, setTroopEquipment]  = useState([])
    const addTroopEquipable = (equipable) => {
        setTroopEquipment(troopEquipment.concat(equipable))
    }
    const findAndRemoveTroopEquipable = (factionEquipable) => {
        const equipmentRemovedIndex = troopEquipment.findIndex((troopEquipable) => troopEquipable.equipmentId === factionEquipable.equipmentId)
        
        if (equipmentRemovedIndex > -1) return troopEquipment.splice(equipmentRemovedIndex, 1)[0]
        return false
    }

    useEffect(() => {
        if (troop) axios(`warband/${params.id}/troop/${troop.id}/equipment/all`)
        .then((response) => setTroopEquipment(response.data))
        .catch((err) => console.log(err.message))
    }, [params, troop])
    */

    const troopMovement = () => `${troopType.movement}"/${troopType.movementType}`
    const troopRanged   = () => troopType.range ? (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice` : '-'
    const troopMelee    = () => troopType.melee ? (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice` : '-'
    const troopArmor    = () => troopType.armour
    const troopKeywords = () => {
        if (troopType.keywords.length > 0) return troopType.keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
        return '-'
    }
    const troopRules    = () => {
        if (troopType.rules.length > 0) return(<Rules rules={troopType.rules} />)
    }

    const renderTroopEquipment = (equipment, troopEquipment) => {
        if (equipment.length > 0 || troopEquipment.length > 0) {
            return(
                <Equipment equipment={equipment} />
            )
        }
    }

    const statBlock = (label, stat) => {
        return(
            <div className='col-6 col-md-2 text-center fs-7 mb-2' key={label}>
                <p className='m-0'><strong>{label}</strong></p>
                {stat}
            </div>
        )
    }

    const buttons = () => {
        const trashButton  = removeTroop ? <i className='bi bi bi-trash-fill' onClick={removeTroop(troop, factionTroopType)}/> : <></>
        const armoryButton = <i className='bi bi-shield-fill-plus'/>

        return(           
            <h5 className='text-center'>
                {trashButton}
                {armoryButton}
            </h5>
        )
    }

    return(
        <Accordion.Item eventKey={troopType.id}>
            <Accordion.Header>
                <div className='row w-100'>
                    <div className='col-6 col-md-2 font-english-towne'>
                        <h5><strong>{troopType.name}</strong></h5>
                    </div>
                    <div className='col-6 col-md-2 font-english-towne'>
                        {troopKeywords()}
                    </div>
                    {statBlock('Movement', troopMovement())}
                    {statBlock('Ranged',   troopRanged())}
                    {statBlock('Melee',    troopMelee())}
                    {statBlock('Armour',   troopArmor())}
                </div>
            </Accordion.Header>
            <Accordion.Body className='fs-7'>
                {buttons()}
                {troopRules()}
                {renderTroopEquipment(troopType.equipment, [])}
            </Accordion.Body>
        </Accordion.Item>
    )
}