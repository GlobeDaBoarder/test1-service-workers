// Make sure sw are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_site.js')
      .then(() => console.log('Service Worker: Registered (Pages)'))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}
