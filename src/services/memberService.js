/* eslint-disable prettier/prettier */
import http from './api';

const apiEndpoint = '/alunos';

function memberUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMembers() {
  return http.get(apiEndpoint);
}

export function getMember(memberId) {
  return http.get(memberUrl(memberId));
}

export function saveMember(member) {
  if (member._id) {
    const body = { ...member };
    delete body._id;
    return http.put(memberUrl(member._id), body);
  }
  return http.post(apiEndpoint, member);
}

export function deleteMember(memberId) {
  return http.delete(memberUrl(memberId));
}
