// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log("HERE I AM");


let deferredPrompt;
var btnInstall = document.querySelector('#installBut');
var words;

window.addEventListener('beforeinstallprompt', (event) => {

    console.log("beforeinstallprompt - showme!!!");
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update the install UI to notify the user app can be installed
    document.querySelector('#installBut').classList.add("showme");
});

/* btnInstall.addEventListener('click', () => {

    document.querySelector('#installBut').classList.remove("showme");
    // Show the modal add to home screen dialog
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      deferredPrompt = null;
    });
  }); */

  window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs', 'installed');
  });


  if (window.matchMedia('(display-mode: standalone)').matches) {
    window.resizeTo(1200,900);
  }