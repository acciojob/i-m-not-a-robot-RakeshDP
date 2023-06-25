//your JS code here. If required.
// Array of image URLs
const imageUrls = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
];

// Get random index for repeating image
const repeatedImageIndex = Math.floor(Math.random() * imageUrls.length);

// Get random index for verify image
const verifyImageIndex = Math.floor(Math.random() * imageUrls.length);

// Generate an array of image indexes
const imageIndexes = Array.from({ length: imageUrls.length }, (_, i) => i);

// Shuffle the image indexes
const shuffledIndexes = shuffle(imageIndexes);

// Create the image elements
const imagesContainer = document.getElementById('images-container');
shuffledIndexes.forEach((index, i) => {
  const imageUrl = imageUrls[i === repeatedImageIndex ? repeatedImageIndex : index];
  const img = document.createElement('img');
  img.src = imageUrl;
  img.className = `img${i + 1}`;
  img.addEventListener('click', handleImageClick);
  imagesContainer.appendChild(img);
});

// State variables
let clickedImages = [];
let verifyButtonVisible = false;

// Image click event handler
function handleImageClick(event) {
  const clickedImage = event.target;
  const clickedImageIndex = parseInt(clickedImage.className.replace('img', ''));
  
  if (verifyButtonVisible) {
    return; // Ignore clicks when Verify button is visible
  }

  if (clickedImages.includes(clickedImageIndex)) {
    return; // Ignore clicks on the same image
  }

  clickedImages.push(clickedImageIndex);
  clickedImage.classList.add('selected');

  if (clickedImages.length === 2) {
    showVerifyButton();
  }

  if (clickedImages.length > 2) {
    resetState();
  }
}

// Show the Verify button
function showVerifyButton() {
  const verifyButton = document.getElementById('verify');
  verifyButtonVisible = true;
  verifyButton.style.display = 'block';
  verifyButton.addEventListener('click', handleVerifyClick);
}

// Verify button click event handler
function handleVerifyClick() {
  const verifyButton = document.getElementById('verify');
  verifyButton.removeEventListener('click', handleVerifyClick);
  verifyButton.style.display = 'none';

  const para = document.getElementById('para');
  if (clickedImages.length === 2) {
    if (clickedImages[0] === clickedImages[1]) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }

  resetState();
}

// Reset the state to the initial state
function resetState() {
  const resetButton = document.getElementById('reset');
  resetButton.style.display = 'none';
  resetButton.removeEventListener('click', resetState);

  const para = document.getElementById('para');
  para.textContent = '';

  clickedImages.forEach((index) => {
    const img = document.querySelector(`.img${index}`);
    img.classList.remove('selected');
  });

  clickedImages = [];
  verifyButtonVisible = false;
}

// Shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
  const arrayCopy = array.slice();
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
}