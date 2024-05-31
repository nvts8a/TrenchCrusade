import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setEquipment } from './_equipmentSlice'
import { setKeywords }  from './_keywordSlice'
import { setWarbands } from './_warbandSlice'
import { setFactions } from './_factionSlice'
import { setFactionEquipment } from './_factionEquipmentSlice'
import { setFactionTroopTypes } from './_factionTroopType'
import { setTroopTypes } from './_troopTypeSlice'

console.log(axios.defaults.headers.common['Authorization'])

const get = (uri, dispatch, set) => {
    axios(uri)
    .then((response) => dispatch(set(response.data)))
    .catch((err)     => console.log(err.message))
}

const cache = (uri, dispatch, set) => {
    if (localStorage.getItem(uri)) {
        dispatch(set(JSON.parse(localStorage.getItem(uri))))
    } else {
        axios(uri).then((response) => {
            localStorage.setItem(uri, JSON.stringify(response.data))
            dispatch(set(response.data))
        })
        .catch((err) => console.log(err.message))
    }
}

export const { useEquipment, useFactions, useFactionEquipment, useFactionTroopTypes, useKeywords, useTroopTypes, useWarbands } = {
    useEquipment: () => {
        const dispatch = useDispatch()
        const equipment = useSelector(state => state.equipment) 

        if (equipment.pending) cache('/api/equipment/all', dispatch, setEquipment)
        
        return equipment.values
    },

    useFactions: () => {
        const dispatch = useDispatch()
        const factions = useSelector(state => state.factions) 

        if (factions.pending) cache('/api/faction/all', dispatch, setFactions)
        
        return factions.values
    },

    useFactionEquipment: () => {
        const dispatch = useDispatch()
        const factionEquipment = useSelector(state => state.factionEquipment) 

        if (factionEquipment.pending) cache('/api/faction/equipment/all', dispatch, setFactionEquipment)
        
        return factionEquipment.values
    },

    useFactionTroopTypes: () => {
        const dispatch = useDispatch()
        const factionTroopTypes = useSelector(state => state.factionTroopTypes) 

        if (factionTroopTypes.pending) cache('/api/faction/troop-type/all', dispatch, setFactionTroopTypes)
        
        return factionTroopTypes.values
    },

    useKeywords: () => {
        const dispatch = useDispatch()
        const keywords = useSelector(state => state.keywords) 

        if (keywords.pending) cache('/api/keyword/all', dispatch, setKeywords)
        
        return keywords.values
    },

    useTroopTypes: () => {
        const dispatch = useDispatch()
        const troopTypes = useSelector(state => state.troopTypes) 

        if (troopTypes.pending) cache('/api/troop-type/all', dispatch, setTroopTypes)
        
        return troopTypes.values
    },

    useWarbands: () => {
        const dispatch = useDispatch()
        const warbands = useSelector(state => state.warbands) 

        if (warbands.pending) get('/api/warband/all', dispatch, setWarbands)

        return warbands.values
    }
}