const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];
const weights = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

/**
 * Generates random Chakra-UI colors
 * @returns {string} a color in `color`.`weight` form
 */
export default () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomWeight = weights[Math.floor(Math.random() * weights.length)];
  return `${randomColor}.${randomWeight}`;
};
