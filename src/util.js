export function merge(...objects) {
  return Object.assign({}, ...objects);
}

export function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
