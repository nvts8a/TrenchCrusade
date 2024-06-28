import axios from 'axios';
import { equipableDeleted, equipableRecieved, equipmentLoading, equipmentRecieved } from './_warbandEquipmentSlice';

export const { getWarbandEquipment, createWarbandEquipable, removeWarbandEquipable } = {

    getWarbandEquipment: (warband) => async dispatch => {
        dispatch(equipmentLoading())

        const equipment = await axios(`warband/${warband.id}/equipment/all`)
                            .then((response) => response.data)
                            .catch((err)     => console.log(err.message))
        dispatch(equipmentRecieved({ warbandId: warband.id, equipment: equipment }))
    },

    createWarbandEquipable: (warband) => (factionEquipable) => async dispatch => {
        await axios.post(`warband/${warband.id}/equipment`, {
            'factionEquipment': factionEquipable,
            'equipment':        factionEquipable.equipment  })
            .then((response) => dispatch(equipableRecieved({ warbandId: warband.id, equipable: response.data })))
            .catch((err)     => console.log(err.message))
    },

    removeWarbandEquipable: (warband) => (warbandEquipment, factionEquipable) => async dispatch => {
        const indexToDelete = warbandEquipment.findIndex((currentEquipable) => currentEquipable.equipmentId === factionEquipable.equipment.id)
        if (indexToDelete > -1) {
            await axios.delete(`warband/${warband.id}/equipment/${warbandEquipment[indexToDelete].id}`)
                .then(() => dispatch(equipableDeleted({ warbandId: warband.id, indexToDelete: indexToDelete })))
                .catch((err) => console.log(err.message))
        }
    }
}