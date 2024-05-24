import FactionInsignia from '../../components/_factionInsignia'
import PageLayout from '../../components/_pageLayout'
import { useFactions } from '../../store/loaders'

export default function Keywords() {
    const factions = useFactions()

    const renderVariants = (factionId) => {
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

    const renderParagraphs = (paragraphs) => {
        return paragraphs.map((paragraph) => <p style={{textIndent: '20px'}}>{paragraph}</p>)
    }

    const factionCard = (faction) => {
        const paragraphs = faction.description.split('|')
        if (paragraphs.length > 0) {
            let firstParagraph = paragraphs.shift()
            let firstLetter = firstParagraph.substring(0,1)
            firstParagraph = firstParagraph.substring(1)

            return(
                <div className='row p-3' id={`keyword-${faction.id}`} key={faction.id}>
                    <h1 className='font-english-towne'>{faction.name}</h1>
                    <div>
                        {<FactionInsignia factionId={faction.id} />}
                    </div>
                    <div className='col-7 text-start container'>
                        <div className='ps-2 lh-1 float-start font-english-towne text-danger' style={{fontSize: '72px'}}>{firstLetter}</div>
                        <p className='pt-4'>{firstParagraph}</p>
                        {renderParagraphs(paragraphs)}
                    </div>
                    {renderVariants(faction.id)}
                </div>
            )
        }

        return(<></>)
    }

    return(
        <PageLayout pageName='Factions'>
            {renderFactions()}
        </PageLayout>
    )
}