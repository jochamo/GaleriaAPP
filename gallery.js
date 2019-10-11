function onLoad() {
    getDelay().addEventListener("ionChange", init);
    window.addEventListener('resize', init);
    getTabs().addEventListener("ionTabsWillChange", pause);
    init();

    //Camara
    document.addEventListener("deviceready", onDeviceReady, false);
}
function getDelay() {
    return(document.querySelector('ion-range'));
}
function getTabs() {
    return(document.querySelector('ion-tabs'));
}
function getSlides() {
    return(document.querySelectorAll('ion-slides'));
}
function init() {
    getSlides().forEach(function(s) {
        s.options = {
            width: window.innerWidth,
            autoplay: {
                delay: 5000 - getDelay().value
            }
        };
    });
}
function play() {
	vibrar();
    getTabs().getSelected().then(function(tab) {
        document.getElementById(tab).startAutoplay();
    });
}
function pause() {
	vibrar();
    getSlides().forEach(function(s) {
        s.stopAutoplay();
    });
}
function previous() {
	vibrar();
    getTabs().getSelected().then(function(tab) {
        document.getElementById(tab).slidePrev();
    });
}
function next() {
	vibrar();
    getTabs().getSelected().then(function(tab) {
        document.getElementById(tab).slideNext();
    });
}
function vibrar(){
	navigator.vibrate(150);
}
//https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html#module_camera.getPicture
function hacerFoto(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI });
}
function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}
function onFail(message) {
    //alert('Failed because: ' + message);
    presentAlertIonic();
}

function recuperarFoto(){
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

//Mostrar alerta
function presentAlertIonic() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.subHeader = 'Subtitle';
    alert.message = 'This is an alert message.';
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    return alert.present();
  }