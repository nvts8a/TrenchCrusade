export default function FactionInsignia({factionId}) {
    if (factionId === 1) return(<img src='/img/1/insignia.png' alt='Heretic Insignia' height='100' width='100'/>)
    if (factionId === 2) return(<img src='/img/2/insignia.png' alt='Trench Pilgrams Insignia' height='100' width='100'/>)
    return(<></>)
}