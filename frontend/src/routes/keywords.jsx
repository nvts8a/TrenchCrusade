import axios from 'axios';
import { useEffect, useState } from 'react';



export default function Keywords() {
    const [keywords, setKeywords] = useState([]);


    useEffect(() => {
        axios('http://localhost:3000/keyword/all')
        .then((response) => {
            setKeywords(response.data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    


    const renderKeywords = () => {
        return keywords.map((keyword) => {
                return(
                    <div id={`keyword-${keyword.id}`}>
                        <div>{keyword.name}:</div>
                        <div>{keyword.definition}</div>
                    </div>
                );
            }
        )
    }


    return(
        <div> HELLO
            {renderKeywords()}
        </div>
    )
}