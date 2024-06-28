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
        dispatch(warbandsLoading())

        const created = await axios.post('warband', { 'factionId': faction.id, 'name': faction.name })
                            .then((response) => response.data)
                            .catch((err) => console.log(err.message))
        dispatch(warbandRecieved(created))
    },

    removeWarband: (warbandId) => async dispatch => {
        dispatch(warbandsLoading())

        const deleted = await axios.delete(`warband/${warbandId}`)
                            .then((response) => response.data)
                            .catch((err)     => console.log(err.message))
        dispatch(warbandDeleted(deleted))
    },

    updateWarband: (warbandId, event) => async dispatch => {
        let updates = {}
        updates[event.target.id] = event.target.value

        dispatch(warbandsLoading())

        const updated = await axios.put(`warband/${warbandId}`, updates)
                            .then((response) => response.data)
                            .catch((err) => console.log(err.message))
        dispatch(warbandRecieved(updated))
    }
}