import axios from 'axios';
import { equipableRecieved, equipmentLoading, equipmentRecieved } from './_warbandEquipmentSlice';

export const { getWarbandEquipment, createWarbandEquipable, removeWarbandEquipable } = {

    getWarbandEquipment: (warband) => async dispatch => {
        dispatch(equipmentLoading())

        const equipment = await axios(`warband/${warband.id}/equipment/all`)
                            .then((response) => response.data)
                            .catch((err)     => console.log(err.message))
        dispatch(equipmentRecieved({ warbandId: warband.id, equipment: equipment }))
    },

    createWarbandEquipable: (warband, equipable, factionEquipable) => async dispatch => {
        dispatch(equipmentLoading())

        const created = await axios.post(`warband/${warband.id}/equipment`, {
            'factionEquipment': factionEquipable,
            'equipment':        equipable
        })
        .then((response) => response.data)
        .catch((err) => console.log(err.message))

        dispatch(equipableRecieved({ warbandId: warband.id, equipable: created }))
    },

    removeWarbandEquipable: (warband, equipable) => async dispatch => {
        dispatch(equipmentLoading())

        const deleted = await axios.delete(`warband/${warband.id}/equipment/${equipable.id}`)
        .then((response) => response.data)
        .catch((err) => console.log(err.message))

        dispatch(equipableRecieved({ warbandId: warband.id, equipable: deleted }))
    }
}