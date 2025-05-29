//API link cats
const catApiUrl = 'https://api.thecatapi.com/v1/images/search';
const catBreedApiUrl = 'https://api.thecatapi.com/v1/breeds';

//dropdown list
async function CatBreeds() {
    const breedSelect = document.getElementById('catBreed');
    const answer = await fetch(catBreedApiUrl);
    const breed = await answer.json(); 

    breed.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id; 
        option.text = breed.name; 
        breedSelect.add(option); 
    });
}

//info and image
async function fetchCatImageAndInfo() {
    const breedSelect = document.getElementById('catBreed');
    const selectedBreed = breedSelect.value; 

    if (selectedBreed) {
        //images 
        const imageAnswer = await fetch(`${catApiUrl}?breed_ids=${selectedBreed}`);
        const imageInfo = await imageAnswer.json(); 

        if (imageInfo.length > 0) {
            document.getElementById('catDisplay').innerHTML = `<img src="${imageInfo[0].url}" alt="Random Cat" />`;
        } else {
            document.getElementById('catDisplay').innerHTML = '<p>Image NOT found.</p>';
        }

        //breed info
        const breedAnswer = await fetch(catBreedApiUrl);
        const breed = await breedAnswer.json();
        const breedInfo = breed.find(breed => breed.id === selectedBreed);
        
        if (breedInfo) {
            document.getElementById('catInfo').innerHTML = `
                <h3>${breedInfo.name}</h3>
                <p><strong>Origin Country:</strong> ${breedInfo.origin || 'N/A'}</p>
                <p><strong>Character:</strong> ${breedInfo.temperament || 'N/A'}</p>
            `;
        }
    }
}

document.getElementById('catBtn').addEventListener('click', fetchCatImageAndInfo);
window.onload = CatBreeds;