//your JS code here. If required.
// Array of image URLs
window.onload = function() {
  const images = document.querySelectorAll('.img');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');
  let clickedTiles = [];
  
  // Randomly arrange the images
  const randomizeImages = () => {
    const imageSrcs = ['https://th.bing.com/th/id/OIP.LeumCFbXMRyKqW1hoacmgAHaP4?pid=ImgDet&rs=1', 
					   'https://freepngimg.com/thumb/pineapple/17-pineapple-png-image-download.png',
					   'https://pngimg.com/uploads/pineapple/pineapple_PNG2760.png',
					   'https://www.freepngimg.com/thumb/apple/16-red-apple-png-image.png',
					   'https://th.bing.com/th/id/R.c0611d279e44423939765f40c4ec421e?rik=uCP1lX0yyO7s7g&riu=http%3a%2f%2fwww.freepngclipart.com%2fdownload%2flion%2f87951-lion-png-image-high-quality.png&ehk=V9Xg2jXyvR0FJVe6VBo6el5QgdspBXS6Mvmy2sKx07k%3d&risl=&pid=ImgRaw&r=0'
					  ];
    const repeatedImageIndex = Math.floor(Math.random() * 5);
  
    for (let i = 0; i < images.length; i++) {
      images[i].src = imageSrcs[i];
      images[i].classList.remove('selected');
  
      if (i === repeatedImageIndex) {
        images[i].classList.add(`img${i + 1}`);
      } else {
        images[i].classList.add(`img${Math.floor(Math.random() * 5) + 1}`);
      }
    }
  };
  
  // Reset the state
  const resetState = () => {
    clickedTiles = [];
    resetButton.classList.add('hidden');
    verifyButton.classList.add('hidden');
    para.textContent = '';
  };
  
  // Handle tile click event
  const handleTileClick = (event) => {
    const clickedImage = event.target;
  
    if (clickedImage.classList.contains('selected')) {
      return;
    }
  
    clickedImage.classList.add('selected');
    clickedTiles.push(clickedImage.classList[1]);
  
    if (clickedTiles.length === 1) {
      resetButton.classList.remove('hidden');
    } else if (clickedTiles.length === 2) {
      verifyButton.classList.remove('hidden');
    }
  };
  
  // Handle reset button click event
  resetButton.addEventListener('click', () => {
    resetState();
    randomizeImages();
  });
  
  // Handle verify button click event
  verifyButton.addEventListener('click', () => {
    verifyButton.classList.add('hidden');
  
    if (clickedTiles[0] === clickedTiles[1]) {
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
  });
  
  // Assign click event to image tiles
  images.forEach((image) => {
    image.addEventListener('click', handleTileClick);
  });
  
  // Initial setup
  randomizeImages();
};