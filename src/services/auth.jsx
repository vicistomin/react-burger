export const fakeAuth = () => {
  return new Promise(resolve => {
    // fake network request delay
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
