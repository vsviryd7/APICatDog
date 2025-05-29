//API URL dogs
const dogApiUrl = 'https://api.thedogapi.com/v1/images/search';
const dogBreedApiUrl = 'https://api.thedogapi.com/v1/breeds';
//dropdown list
async function DogBreeds() {
    const breedSelect = document.getElementById('dogBreed');
    const answer = await fetch(dogBreedApiUrl);
    const breedsText = await answer.text(); 
    const breeds = JSON.parse(breedsText); 

    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id; 
        option.text = breed.name; 
        breedSelect.add(option); 
    });
}
//image
async function fetchDogImageAndInfo() {
    const breedSelect = document.getElementById('dogBreed');
    const selectedBreed = breedSelect.value;

    if (selectedBreed) {
        //breed info
        const breedAnswer = await fetch(`${dogBreedApiUrl}/${selectedBreed}`);
        const breedText = await breedAnswer.text();
        const breedData = JSON.parse(breedText);
        displayDogInfo(breedData);

        const imageAnswer = await fetch(`${dogApiUrl}?breed_ids=${selectedBreed}`);
        const imageText = await imageAnswer.text();
        const imageData = JSON.parse(imageText);
        
        if (imageData.length > 0) {
            displayDogImage(imageData[0].url);
        } else {
            document.getElementById('dogDisplay').innerHTML = '<p>Image NOT found.</p>';
        }
    }
}

function displayDogImage(imageUrl) {
    const dogDisplay = document.getElementById('dogDisplay');
    dogDisplay.innerHTML = `<img src="${imageUrl}" alt="Random Dog" />`;
}

function displayDogInfo(breed) {
    const dogInfo = document.getElementById('dogInfo');
    dogInfo.innerHTML = `
        <h3>${breed.name}</h3>
        <p><strong>Origin:</strong> ${breed.origin || 'N/A'}</p>
        <p><strong>Character:</strong> ${breed.temperament || 'N/A'}</p>
        <p><strong>Weight:</strong> ${breed.weight?.metric || 'N/A'} kg</p>
    `;
}

document.getElementById('dogBtn').addEventListener('click', fetchDogImageAndInfo);
window.onload = DogBreeds;
