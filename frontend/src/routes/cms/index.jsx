import { useLoaderData } from 'react-router-dom'
import PageLayout from '../../components/_pageLayout'
import Table from 'react-bootstrap/Table'

export default function ContentManagement() {
    const loader = useLoaderData()

    const Models = ({models}) => {
        if (models) {
            return (
            <Table>
                <ModelsHeader model={models[0]} />
                <ModelsBody models={models} />
            </Table>
            )
        }

    }

    const ModelsHeader = ({model}) => {
        const headers = Object.keys(model).map((key) => <th key={key}>{key}</th>)

        return (
            <thead>
                <tr>{headers}</tr>
            </thead>
        )
    }

    const ModelsBody = ({models}) => {
        const rows = models.map((model) => {
            const values = Object.values(model).map((value) => {
                return (
                    <td key={value}>
                        <input type='text' className='form-control' defaultValue={value} onInput={(event) => console.log(event)}/>
                    </td>
                )
            })
            return (<tr key={model.id}>{values}</tr>)
        })

        return(
            <tbody>
                {rows}
            </tbody>
        )
    }

    return(
        <PageLayout pageName='Content Management'>
            <Models models={loader.keywords} />
        </PageLayout>
    )
}