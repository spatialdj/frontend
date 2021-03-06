/**
 * Maps `val`, which is between `a` and `b` to a number between `c` and `d`
 * @param {number} val
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @returns {number} a number between `c` and `d`
 */
const linearTransform = (val, a, b, c, d) => {
  return Math.min(((val - a) / (b - a)) * (d - c) + c, 100);
};

const maxUnscaledDistance = Math.sqrt(100 * 100 + 100 * 100);

/**
 * Calculates volume given player bounding box and client position
 * @param {object} boundingBox
 * @param {{x: number, y: number}} position
 * @returns {number} volume, from 0 to 100 inclusive
 */
export default (boundingBox, position) => {
  const { left, bottom, right } = boundingBox;
  const { x, y } = position;

  // Distance from left/right/bottom edge
  let dx = Math.max(left - x, 0, x - right);
  let dy = Math.max(y - bottom, 0);

  dx = linearTransform(dx, 0, left, 0, 100);
  dy = linearTransform(dy, 0, bottom, 0, 100);

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 0) {
    return 100;
  }

  const rescaledVolume = linearTransform(
    distance,
    0,
    maxUnscaledDistance,
    0,
    100
  );

  const volume = 100 - rescaledVolume;

  if (volume >= 90) return linearTransform(volume, 0, 90, 0, 100);

  return volume;
};
