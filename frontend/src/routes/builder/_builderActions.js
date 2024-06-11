import axios from 'axios';

import { deleteWarband, setWarband } from '../../store/_warbandSlice'

export const {  createWarband, removeWarband, updateWarband,
                createEquipment, removeEquipment,
                createTroop, removeTroop,
                createTroopEquipment, removeTroopEquipment } = {

    // WARBANDS

    createWarband: (faction, dispatch, navigate) => () => {
        axios.post('warband', { 
            'factionId': faction.id
        })
        .then((response) => {
            dispatch(setWarband(response.data))
            navigate(`/builder/warband/${response.data.id}/roster`, { replace: true })
        })
        .catch((err) => console.log(err.message))
    },

    removeWarband: (warbandId, dispatch) => () => {
        axios.delete(`warband/${warbandId}`)
        .then((response) => dispatch(deleteWarband(response.data)))
        .catch((err)     => console.log(err.message))
    },

    updateWarband: (warbandId, dispatch) => (event) => {
        let updates = {}
        updates[event.target.id] = event.target.value

        axios.put(`warband/${warbandId}`, updates)
        .then((response) => dispatch(setWarband(response.data)))
        .catch((err) => console.log(err.message))
    },

    // WARBAND EQUIPMENT

    createEquipment: (warband, dispatch, updateWarband, addWarbandEquipment) => (factionEquipable, equipable) => () => {
        axios.post(`warband/${warband.id}/equipment`, {
            'factionEquipment': factionEquipable,
            'equipment':        equipable
        })
        .then((response) => {
            updateWarband(warband.id, dispatch)({ target: { id: 'ducats', value: warband.ducats - factionEquipable.cost }})
            addWarbandEquipment(response.data)
        })
        .catch((err) => console.log(err.message))
    },

    removeEquipment: (warband, dispatch, updateWarband, findAndRemoveWarbandEquipment) => (factionEquipable) => () => {
        const removed = findAndRemoveWarbandEquipment(factionEquipable)
        if (removed) {
            axios.delete(`warband/${warband.id}/equipment/${removed.id}`)
            .then(() => {
                updateWarband(warband.id, dispatch)({ target: { id: 'ducats', value: warband.ducats + factionEquipable.cost}})
            })
            .catch((err) => console.log(err.message))
        }
    },

    // WARBAND TROOPS

    createTroop: (warband, dispatch, addTroop) => (factionTroopType, troopType) => () => {
        axios.post(`warband/${warband.id}/troop`, {
            'factionTroopType': factionTroopType,
            'troopType':        troopType, 
            'name':             troopType.name
        })
        .then((response) => {
            let purchase = { target: {} }

            if (factionTroopType.currency) {
                purchase.target = { id: factionTroopType.currency, value: warband[factionTroopType.currency] - factionTroopType.cost }
            } else {
                purchase.target = { id: 'ducats', value: warband.ducats - factionTroopType.cost }
            }

            updateWarband(warband.id, dispatch)(purchase)
            addTroop(response.data)
        })
        .catch((err) => console.log(err.message))
    },

    removeTroop: (warband, dispatch, removeTroop) => (troopRemoved, factionTroopType) => () => {
        axios.delete(`warband/${warband.id}/troop/${troopRemoved.id}`)
        .then(() => {
            let refund = { target: {} }

            if (factionTroopType.currency) {
                refund.target = { id: factionTroopType.currency, value: warband[factionTroopType.currency] + factionTroopType.cost }
            } else {
                refund.target = { id: 'ducats', value: warband.ducats + factionTroopType.cost }
            }

            updateWarband(warband.id, dispatch)(refund)
            removeTroop(troopRemoved)
        })
        .catch((err) => console.log(err.message))
    },

    // WARBAND TROOP EQUIPMENT

    createTroopEquipment: (warband, dispatch, updateWarband) => (troop, addTroopEquipment) => (factionEquipable, equipable) => () => {
        axios.post(`warband/${warband.id}/troop/${troop.id}/equipment`, {
            'factionEquipment': factionEquipable,
            'equipment':        equipable
        })
        .then((response) => {
            let purchase = { target: {} }

            if (factionEquipable.currency) {
                purchase.target = { id: factionEquipable.currency, value: warband[factionEquipable.currency] - factionEquipable.cost }
            } else {
                purchase.target = { id: 'ducats', value: warband.ducats - factionEquipable.cost }
            }

            updateWarband(warband.id, dispatch)(purchase)
            addTroopEquipment(response.data)
        })
        .catch((err) => console.log(err.message))
    },

    removeTroopEquipment: (warband, dispatch, updateWarband) => (troop, findAndRemoveTroopEquipment) => (factionEquipable) => () => {
        const removed = findAndRemoveTroopEquipment(factionEquipable)
        if (removed) {
            axios.delete(`warband/${warband.id}/troop/${troop.id}/equipment/${removed.id}`)
            .then(() => {
                let refund = { target: {} }

                if (factionEquipable.currency) {
                    refund.target = { id: factionEquipable.currency, value: warband[factionEquipable.currency] + factionEquipable.cost }
                } else {
                    refund.target = { id: 'ducats', value: warband.ducats + factionEquipable.cost }
                }
    
                updateWarband(warband.id, dispatch)(refund)            })
            .catch((err) => console.log(err.message))
        }
    }
}
