import axios from 'axios';
import { equipableDeleted, equipableRecieved } from './_troopsSlice';

export const { createTroopEquipable, removeTroopEquipable } = {

    createTroopEquipable: (troop) => (factionEquipable) => async dispatch => {
        await axios.post(`warband/${troop.warbandId}/troop/${troop.id}/equipment`, {
            'factionEquipment': factionEquipable,
            'equipment':        factionEquipable.equipment  })
            .then((response) => dispatch(equipableRecieved({ troop: troop, equipable: response.data })))
            .catch((err)     => console.log(err.message))
    },

    removeTroopEquipable: (troop) => (troopEquipment, factionEquipable) => async dispatch => {
        const indexToDelete = troopEquipment.findIndex((currentEquipable) => currentEquipable.equipment.id === factionEquipable.equipment.id)
        if (indexToDelete > -1) {
            await axios.delete(`warband/${troop.warbandId}/troop/${troop.id}/equipment/${troopEquipment[indexToDelete].id}`)
                .then(() => dispatch(equipableDeleted({ troop: troop, indexToDelete: indexToDelete })))
                .catch((err) => console.log(err.message))
        }
    }
}