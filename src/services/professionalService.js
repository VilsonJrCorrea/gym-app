/* eslint-disable prettier/prettier */
import http from './api';

const apiEndpoint = '/profissionais';

function professionalUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProfessionals() {
  return http.get(apiEndpoint);
}

export function getProfessional(professionalId) {
  return http.get(professionalUrl(professionalId));
}

export function saveProfessional(professional) {
  if (professional._id) {
    const body = { ...professional };
    delete body._id;
    return http.put(professionalUrl(professional._id), body);
  }
  return http.post(apiEndpoint, professional);
}

export function deleteProfessional(professionalId) {
  return http.delete(professionalUrl(professionalId));
}
