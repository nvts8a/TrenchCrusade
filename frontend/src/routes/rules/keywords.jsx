import PageLayout from '../../components/_pageLayout'
import { useKeywords } from '../../store/loaders'

export default function Keywords() {
    const keywords = useKeywords()

    const renderKeywords = () => {
        return Object.values(keywords).map((keyword) => keywordCard(keyword))
    }

    const keywordCard = (keyword) => {
        return(
            <div className='row p-3' id={`keyword-${keyword.id}`} key={keyword.id}>
                <div className='col-3 text-end font-artisan'>{keyword.name}:</div>
                <div className='col-7 text-start'>{keyword.definition}</div>
            </div>
        );
    }

    return(
        <PageLayout pageName='+ Keywords +'>
            {renderKeywords()}
        </PageLayout>
    )
}