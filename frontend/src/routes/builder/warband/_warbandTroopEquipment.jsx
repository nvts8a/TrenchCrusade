import Keyword from '../../../components/_keyword'
import Rules from '../../../components/_rules'

export default function TroopEquipment({equipable}) {
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
        if (modifiers && modifiers.length > 0) {
            return modifiers.map((modifier) => formatModifier(modifier)).join(', ')
        }
        return '-'
    }

    const formatKeywords = (keywords) => {
        if (keywords && keywords.length > 0) return keywords.map((keyword) => <Keyword keyword={keyword} key={keyword.id}/>)
        return '-'
    }

    const rulesBlock = (rules) => {
        if (rules && rules.length > 0) return(
        <tr>
            <td colSpan='100%'>
                <Rules rules={rules} />
            </td>
        </tr>)
    }

    return(
        <>
        <tr>
            <th>{equipable.name}</th>
            <td>{formatHandedness(equipable.handedness)}</td>
            <td>{formatRange(equipable.range)}</td>
            <td>{formatModifiers(equipable.modifiers)}</td>
            <td>{formatKeywords(equipable.keywords)}</td>
        </tr>
        {rulesBlock(equipable.rules)}
        </>

        
    )
  }