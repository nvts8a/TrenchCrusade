import axios from 'axios';
import { warbandDeleted, warbandRecieved, warbandsLoading, warbandsRecieved } from './_warbandsSlice'

export const {  getWarbands, createWarband, removeWarband, updateWarband } = {

    getWarbands: () => async dispatch => {
        dispatch(warbandsLoading())

        const warbands = await axios('warband/all')
                            .then((response) => response.data)
                            .catch((err)     => console.log(err.message))
        dispatch(warbandsRecieved(warbands))
    },

    createWarband: (faction) => async dispatch => {
        await axios.post('warband', { 'factionId': faction.id, 'name': faction.name })
            .then((response) => dispatch(warbandRecieved(response.data)))
            .catch((err)     => console.log(err.message))
    },

    removeWarband: (warband) => async dispatch => {
        await axios.delete(`warband/${warband.id}`)
            .then((response) => dispatch(warbandDeleted(response.data)))
            .catch((err)     => console.log(err.message))
    },

    updateWarband: (warband, event) => async dispatch => {
        let updates = {}
        updates[event.target.id] = event.target.value

        await axios.put(`warband/${warband.id}`, updates)
            .then((response) => dispatch(warbandRecieved(response.data)))
            .catch((err) => console.log(err.message))
    }
}