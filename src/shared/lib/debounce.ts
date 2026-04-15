/** Design reminder: search interactions should feel calm and responsive rather than jittery. */
export const debounce = <T extends (...args: never[]) => void>(fn: T, delay = 300) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
