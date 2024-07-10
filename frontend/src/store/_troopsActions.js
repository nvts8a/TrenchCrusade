import axios from 'axios';
import { troopDeleted, troopRecieved, troopsLoading, troopsRecieved } from './_troopsSlice';

export const { getTroops, createTroop, removeTroop } = {

    getTroops: (warband) => async dispatch => {
        dispatch(troopsLoading())

        const troops = await axios(`warband/${warband.id}/troop/all`)
                            .then((response) => response.data)
                            .catch((err)     => console.log(err.message))
        dispatch(troopsRecieved({ warbandId: warband.id, troops: troops }))
    },

    createTroop: (warband, factionTroopType, troopType) => async dispatch => {
        await axios.post(`warband/${warband.id}/troop`, {
                'factionTroopType': factionTroopType,
                'troopType':        troopType, 
                'name':             troopType.name
            })
            .then((response) => dispatch(troopRecieved({ warbandId: warband.id, troop: response.data })))
            .catch((err)     => console.log(err.message))
    },

    removeTroop: (warband, troop) => async dispatch => {
        await axios.delete(`warband/${warband.id}/troop/${troop.id}`)
            .then((response) => dispatch(troopDeleted({ warbandId: warband.id, troopId: response.data })))
            .catch((err) => console.log(err.message))
    }
}