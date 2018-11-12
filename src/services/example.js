import request from '../utils/request'

export function query () {
  return request('/api/users')
}



import * as fetch from '../utils/fetch'

export const getMessage = () => {
  return fetch.get(`/api/users`, {})
}

export const postMessage = (data) => {
  return fetch.post(`/api/users`, {}, data)
}
export const delMessage = (uuid) => {
  return fetch.del(`/api/users/${uuid}`, {})
}

export const uploaderFile = (data) => {
  return fetch.postFormData(`/api/upload`, {}, data)
}




export const getLocals = () => {
  return fetch.get('/blog/example', {})
}
export const delLocals = (id) => {
  return fetch.del('/blog/delexam/'+ id, {})
}
export const postLocals = (data) => {
  return fetch.post('/blog/postexam', {}, data)
}
export const putLocals = (id, data) => {
  return fetch.post('/blog/putexam/' + id, {}, data)
}



export const tt = (data) => {
  return fetch.postText('urls?site=https://www.51bricks.com&token=8MwcDiO6eo2SV64g',{}, data)
}
