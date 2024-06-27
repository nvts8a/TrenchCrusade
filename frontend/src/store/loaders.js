import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setWarbands } from './_warbandSlice'

const get = (uri, dispatch, set) => {
    axios(uri)
    .then((response) => dispatch(set(response.data)))
    .catch((err)     => console.log(err.message))
}

export const { useWarbands } = {
    useWarbands: () => {
        const dispatch = useDispatch()
        const warbands = useSelector(state => state.warbands) 

        if (warbands.pending) get('warband/all', dispatch, setWarbands)

        return warbands.values
    }
}