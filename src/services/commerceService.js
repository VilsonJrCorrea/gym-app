/* eslint-disable prettier/prettier */
import http from './api';

const apiEndpoint = '/comercios';

function commerceUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCommerces() {
  return http.get(apiEndpoint);
}

export function getCommerce(commerceId) {
  return http.get(commerceUrl(commerceId));
}

export function saveCommerce(commerce) {
  if (commerce._id) {
    const body = { ...commerce };
    delete body._id;
    return http.put(commerceUrl(commerce._id), body);
  }
  return http.post(apiEndpoint, commerce);
}

export function deleteCommerce(commerceId) {
  return http.delete(commerceUrl(commerceId));
}
