// REACT
import Accordion from 'react-bootstrap/Accordion'
import TroopEquipment from './_warbandTroopEquipment'
import Keyword from '../../../components/_keyword'
import Rules from '../../../components/_rules'
import Table from 'react-bootstrap/Table'

// REDUX
import { useEquipment, useTroopTypes } from '../../../store/loaders'


export default function TroopCard({troop}) {
    const equipment  = useEquipment()
    const troopTypes = useTroopTypes()

    if (!troop) return(<></>)

    const troopType  = troopTypes[troop.troopTypeId] 

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
    const troopKeywords = () => {
        if (troopType.keywords.length > 0) return troopType.keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
        return '-'
    }
    const troopMovement = () => `${troopType.movement}"/${troopType.movementType}`
    const troopRanged   = () => troopType.range ? (troopType.range < 0) ? `${troopType.range} Dice` : `+${troopType.range} Dice` : '-'
    const troopMelee    = () => troopType.melee ? (troopType.melee < 0) ? `${troopType.melee} Dice` : `+${troopType.melee} Dice` : '-'
    const troopArmor    = () => troopType.armour
    const troopRules    = () => {
        if (troopType.rules.length > 0) return(<Rules rules={troopType.rules} />)
    }
    
    /*
        let armor = troopType.armour

        if(troopEquipment && troopEquipment.length > 0) {

            troopEquipment
            .filter((equipable) => equipable.equipment.type === 'armor')
            .forEach(equipable => {
                if(equipable.equipment.modifiers) equipable.equipment.modifiers.forEach((modifier) => {
                    if(modifier.type === 'armor') {
                        armor = armor + modifier.value
                    }
                })
            })
        }

        if(troopType && troopType.equipment) {
            troopType.equipment
            .filter((equipable) => equipable.type === 'armor')
            .forEach(equipable => {
                if(equipable.modifiers) equipable.modifiers.forEach((modifier) => {
                    if(modifier.type === 'armor') armor = armor + modifier.value
                })
            })
        }
        
        return armor
    }
    */

    const renderTroopEquipment = (equipment, troopEquipment) => {
        if (equipment.length > 0 || troopEquipment.length > 0) {
            const typeEquipped = () => equipment.map((equipable) => <TroopEquipment equipable={equipable} key={equipable.id} />)
            const troopEquipped = () => troopEquipment.map((equipable) => <TroopEquipment equipable={equipable.equipment} key={equipable.id} />)

            return(
                <Table>
                    <thead>
                        <tr className='table-secondary'>
                            <th>Equipment</th>
                            <th>Type</th>
                            <th>Range</th>
                            <th>Modifiers</th>
                            <th>Keywords</th>
                        </tr>
                    </thead>
                    <tbody>
                        {typeEquipped()}
                        {troopEquipped()}
                    </tbody>
                </Table>
            )
        }
    }

    return(
        <Accordion.Item eventKey={troop.id}>
            <Accordion.Header>
                <div className='row w-100'>
                    <div className='col-sm-6 col-md-2 font-english-towne'>
                        <h5><strong>{troop.name}</strong></h5>
                    </div>
                    <div className='col-sm-6 col-md-2 font-english-towne'>
                        {troopKeywords()}
                    </div>
                    <div className='col-sm-6 col-md-2 text-center'>
                        <p><strong>Movement</strong></p>
                        {troopMovement()}
                    </div>
                    <div className='col-sm-6 col-md-2 text-center'>
                        <p><strong>Ranged</strong></p>
                        {troopRanged()}
                    </div>
                    <div className='col-sm-6 col-md-2 text-center'>
                        <p><strong>Melee</strong></p>
                        {troopMelee()}
                    </div>
                    <div className='col-sm-6 col-md-2 text-center'>
                        <p><strong>Armour</strong></p>
                        {troopArmor()}
                    </div>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                {troopRules()}
                {renderTroopEquipment(troopType.equipment, [])}
            </Accordion.Body>
        </Accordion.Item>
    )
}