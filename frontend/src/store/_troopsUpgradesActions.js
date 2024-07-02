import axios from 'axios';
import { upgradeDeleted, upgradeRecieved, upgradesLoading, upgradesRecieved } from './_troopsUpgradesSlice';

export const { getTroopUpgrades, createTroopUpgrade, removeTroopUpgrade } = {

    getTroopUpgrades: (troop) => async dispatch => {
        dispatch(upgradesLoading())

        const upgrades = await axios(`warband/${troop.warbandId}/troop/${troop.id}/upgrade/all`)
                            .then((response) => response.data)
                            .catch((err)     => console.log(err.message))
        dispatch(upgradesRecieved({ troopId: troop.id, upgrades: upgrades }))
    },

    createTroopUpgrade: (troop, upgrade) => async dispatch => {
        await axios.post(`warband/${troop.warbandId}/troop/${troop.id}/upgrade`, { 'upgrade': upgrade })
            .then((response) => dispatch(upgradeRecieved({ troopId: troop.id, upgrade: response.data })))
            .catch((err)     => console.log(err.message))
    },

    removeTroopUpgrade: (troop, troopUpgrades, troopUpgrade) => async dispatch => {
        const indexToDelete = troopUpgrades.findIndex((currentUpgrade) => currentUpgrade.upgrade.id === troopUpgrade.upgrade.id)
        if (indexToDelete > -1) {
            await axios.delete(`warband/${troop.warbandId}/troop/${troop.id}/upgrade/${troopUpgrade.id}`)
                .then(() => dispatch(upgradeDeleted({ troopId: troop.id, indexToDelete: indexToDelete })))
                .catch((err) => console.log(err.message))
        }
    }
}