import axios from 'axios';
import { equipableDeleted, equipableRecieved, equipmentLoading, equipmentRecieved } from './_troopsEquipmentSlice';

export const { getTroopEquipment, createTroopEquipable, removeTroopEquipable } = {

    getTroopEquipment: (troop) => async dispatch => {
        dispatch(equipmentLoading())

        const equipment = await axios(`warband/${troop.warbandId}/troop/${troop.id}/equipment/all`)
                            .then((response) => response.data)
                            .catch((err)     => console.log(err.message))
        dispatch(equipmentRecieved({ troopId: troop.id, equipment: equipment }))
    },

    createTroopEquipable: (troop) => (factionEquipable) => async dispatch => {
        await axios.post(`warband/${troop.warbandId}/troop/${troop.id}/equipment`, {
            'factionEquipment': factionEquipable,
            'equipment':        factionEquipable.equipment  })
            .then((response) => dispatch(equipableRecieved({ troopId: troop.id, equipable: response.data })))
            .catch((err)     => console.log(err.message))
    },

    removeTroopEquipable: (troop) => (troopEquipment, factionEquipable) => async dispatch => {
        const indexToDelete = troopEquipment.findIndex((currentEquipable) => currentEquipable.equipmentId === factionEquipable.equipment.id)
        if (indexToDelete > -1) {
            await axios.delete(`warband/${troop.warbandId}/troop/${troop.id}/equipment/${troopEquipment[indexToDelete].id}`)
                .then(() => dispatch(equipableDeleted({ troopId: troop.id, indexToDelete: indexToDelete })))
                .catch((err) => console.log(err.message))
        }
    }
}