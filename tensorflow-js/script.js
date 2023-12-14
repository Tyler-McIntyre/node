const status = document.getElementById('status');

if (status) {
  status.innerText = 'Loaded TensorFlow.js - version: ' + tf.version.tfjs;
}

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
var model = undefined;

function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }

function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
        return;
    }

    event.target.classList.add('removed');  

    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
}

cocoSsd.load().then(function (loadedModel) {
    model = loadedModel;
    demosSection.classList.remove('invisible');
});

var children = [];

function predictWebcam() {
    model.detect(video).then(function (predictions) {
      for (let i = 0; i < children.length; i++) {
        liveView.removeChild(children[i]);
      }
      children.splice(0);
  
      // loop through the predictions and draw them if they have a high confidence score
      for (let n = 0; n < predictions.length; n++) {
        // The confidence threshold is 66%
        if (predictions[n].score > 0.66) {
          const p = document.createElement('p');
          p.innerText = predictions[n].class + ' - with ' +
            Math.round(parseFloat(predictions[n].score) * 100) +
            '% confidence.';
          p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: ' +
            (predictions[n].bbox[1] - 10) + 'px; width: ' +
            (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
  
          const highlighter = document.createElement('div');
          highlighter.setAttribute('class', 'highlighter');
          highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: ' +
            predictions[n].bbox[1] + 'px; width: ' +
            predictions[n].bbox[2] + 'px; height: ' +
            predictions[n].bbox[3] + 'px;';
  
          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);
  
          // Call the event listener with predictions[n].class
          handlePredictionEvent(predictions[n].class);
  
        }
      }
  
      window.requestAnimationFrame(predictWebcam);
    });
  }
  
  function handlePredictionEvent(predictionClass) {
    new Promise(resolve => setTimeout(resolve, 2000));
    // Find the first <ul> element in the document
    var ulElement = document.getElementsByTagName('ul')[0];

    // Check if there is at least one <li> element with the given class
    if (!hasClass(ulElement.getElementsByTagName('li'), predictionClass)) {
        // Create a new <li> element
        var listItem = document.createElement('li');

        // Set the text content of the <li> element to the prediction class
        listItem.textContent = predictionClass;

        // Append the <li> element to the <ul> element
        ulElement.appendChild(listItem);
    }
}

// Function to check if a specific class exists in the class list of an element
function hasClass(listItems, className) {
    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].innerText === className) {
            return true
        }
      }

    return false
}
