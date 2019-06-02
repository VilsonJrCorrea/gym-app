/* eslint-disable prettier/prettier */
import http from './api';

const apiEndpoint = '/equipamentos';

function equipmentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getEquipments() {
  return http.get(apiEndpoint);
}

export function getEquipment(equipmentId) {
  return http.get(equipmentUrl(equipmentId));
}

export function saveEquipment(equipment) {
  if (equipment._id) {
    const body = { ...equipment };
    delete body._id;
    console.log("oi ",body)
    return http.put(equipmentUrl(equipment._id), body);
  }
  return http.post(apiEndpoint, equipment);
}

export function deleteEquipment(equipmentId) {
  return http.delete(equipmentUrl(equipmentId));
}
