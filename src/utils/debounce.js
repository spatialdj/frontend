// debounce function from El Aoutar Hamza and Ryne
// https://stackoverflow.com/a/61786423/6216561
export default function debounce(func, wait, immediate) {
  let timeout;

  return (...args) => {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
