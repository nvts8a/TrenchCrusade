import Keyword from './_keyword'
import Rules from './_rules'

export default function EquipmentCard({equipable}) {
    const weaponBlock = (equipable) => {
        if (equipable.type.toLowerCase() === 'melee' || equipable.type.toLowerCase() === 'range') return(
            <table className='table mb-0'>
            <thead>
                <tr className='table-danger'>
                    <th className='col-2'>Name</th>
                    <th className='col-2'>Type</th>
                    <th className='col-2'>Range</th>
                    <th className='col-2'>Modifiers</th>
                    <th className='col-2'>Keywords</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{equipable.name}</th>
                    <td>{formatHandedness(equipable.handedness)}</td>
                    <td>{formatRange(equipable.range)}</td>
                    <td>{formatModifiers(equipable.modifiers)}</td>
                    <td>{formatKeywords(equipable.keywords)}</td>
                </tr>
            </tbody>
            </table>
        )
    }

    const formatHandedness = (handedness) => {
        if (handedness) return(`${handedness}-Handed`)
        return('Special')
    }

    const formatRange = (range) => {
        if (range) return `${range}"`
        return 'Melee'
    }

    let formatModifier = (modifier) => {
        let formattedModifier = (modifier.value > 0 ? '+' : '') + modifier.value

        if (modifier.type === 'injure' ||  modifier.type === 'hit') {
            formattedModifier = formattedModifier + 'D to ' + modifier.type
        } else {
            formattedModifier = formattedModifier + ' to ' + modifier.type
        }

        return formattedModifier
    }

    const formatModifiers = (modifiers) => {
        if (modifiers.length > 0) {
            return modifiers.map((modifier) => formatModifier(modifier)).join(', ')
        }
        return '-'
    }

    const formatKeywords = (keywords) => {
        if (keywords.length > 0) return keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
        return '-'
    }

    return(
        <div className='m-5' id={`keyword-${equipable.id}`} key={equipable.id}>
            <h5 className='row text-start'><strong>{equipable.name}</strong></h5>
            <div className='row text-start'><em>{equipable.description}</em></div>
            {weaponBlock(equipable)}
            <Rules rules={equipable.rules} />
        </div>
    )
  }