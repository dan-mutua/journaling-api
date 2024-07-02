export default function toBoolean(data) {
  const d = typeof data === 'string' ? data.toLowerCase() : data;

  switch (d) {
    case '':
    case 'false':
    case false:
    case '0':
    case 0:
    case 'null':
    case null:
    case 'undefined':
    case undefined:
      return false;

    default:
      return true;
  }
}
