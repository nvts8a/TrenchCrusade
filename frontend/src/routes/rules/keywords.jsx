import { useLoaderData } from 'react-router-dom'
import PageLayout from '../../components/_pageLayout'

export default function Keywords() {
    const loader = useLoaderData()

    const renderKeywords = () => {
        return Object.values(loader.keywords).map((keyword) => keywordCard(keyword))
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
        <PageLayout pageName='Keywords'>
            {renderKeywords()}
        </PageLayout>
    )
}