import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setEquipment } from './_equipmentSlice'
import { setKeywords }  from './_keywordSlice'
import { setWarband, setWarbands } from './_warbandSlice';
import { setFaction } from './_factionSlice';
import { setTroopTypes } from './_troopTypeSlice';

const get = (uri, dispatch, set) => {
    axios(uri).then((response) => {
        dispatch(set(response.data))
    })
    .catch((err) => {
        console.log(err.message)
    })
}

export const { useEquipment, useFactions, useKeywords, useTroopTypes, useWarband, useWarbands } = {
    useEquipment: () => {
        const dispatch = useDispatch()
        const equipment = useSelector(state => state.equipment) 

        if (equipment.pending) get('/api/equipment/all', dispatch, setEquipment)
        
        return equipment.values
    },

    useFactions: () => {
        const dispatch = useDispatch()
        const factions = useSelector(state => state.factions) 

        if (factions.pending) get('/api/faction/all', dispatch, setFaction)
        
        return factions.values
    },

    useKeywords: () => {
        const dispatch = useDispatch()
        const keywords = useSelector(state => state.keywords) 

        if (keywords.pending) get('/api/keyword/all', dispatch, setKeywords)
        
        return keywords.values
    },

    useTroopTypes: () => {
        const dispatch = useDispatch()
        const troopTypes = useSelector(state => state.troopTypes) 

        if (troopTypes.pending) get('/api/troop-type/all', dispatch, setTroopTypes)
        
        return troopTypes.values
    },

    useWarband: (id) => {
        const dispatch = useDispatch()
        const warbands = useSelector(state => state.warbands) 

        if (warbands.pending && !warbands.values[id]) get(`/api/warband/${id}`, dispatch, setWarband)

        return warbands.values
    },

    useWarbands: () => {
        const dispatch = useDispatch()
        const warbands = useSelector(state => state.warbands) 

        if (warbands.pending) get('/api/warband/all', dispatch, setWarbands)

        return warbands.values
    }
}