import FactionInsignia from '../../components/_factionInsignia'
import PageLayout from '../../components/_pageLayout'
import { useFactions } from '../../store/loaders'

export default function Keywords() {
    const factions = useFactions()

    const renderVariants = (factionId) => {
        console.log(factions[factionId])
        if (factions[factionId]) return(factions[factionId].variants.map((variant) => variantCard(variant)))
    }

    const variantCard = (variant) => {
        return(
            <div className='row p-3' id={`keyword-${variant.id}`} key={variant.id}>
                <h4 className='font-english-towne'>{variant.name}</h4>
                <div className='col-7 text-start'>{variant.description}</div>
            </div>
        )
    }

    const renderFactions = () => {
        return Object.values(factions).map((faction) => factionCard(faction))
    }

    const factionCard = (faction) => {
        return(
            <div className='row p-3' id={`keyword-${faction.id}`} key={faction.id}>
                <h1 className='font-english-towne'>{faction.name}</h1>
                <div>
                    {<FactionInsignia factionId={faction.id} />}
                </div>
                <div className='col-7 text-start'>{faction.description}</div>
                {renderVariants(faction.id)}
            </div>
        )
    }

    return(
        <PageLayout pageName='+ Factions +'>
            {renderFactions()}
        </PageLayout>
    )
}