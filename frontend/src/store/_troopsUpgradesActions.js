import axios from 'axios';
import { upgradeDeleted, upgradeRecieved } from './_troopsSlice';

export const { createTroopUpgrade, removeTroopUpgrade } = {

    createTroopUpgrade: (troop, upgrade) => async dispatch => {
        await axios.post(`warband/${troop.warbandId}/troop/${troop.id}/upgrade`, { 'upgrade': upgrade })
            .then((response) => dispatch(upgradeRecieved({ troop: troop, upgrade: response.data })))
            .catch((err)     => console.log(err.message))
    },

    removeTroopUpgrade: (troop, troopUpgrades, upgrade) => async dispatch => {
        const indexToDelete = troopUpgrades.findIndex((currentUpgrade) => currentUpgrade.upgrade.id === upgrade.id)
        if (indexToDelete > -1) {
            await axios.delete(`warband/${troop.warbandId}/troop/${troop.id}/upgrade/${troopUpgrades[indexToDelete].id}`)
                .then(() => dispatch(upgradeDeleted({ troop: troop, indexToDelete: indexToDelete })))
                .catch((err) => console.log(err.message))
        }
    }
}