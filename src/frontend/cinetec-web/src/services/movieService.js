const API_URL = "http://localhost:5000/api/movies";

export async function getMovies() 
{
    const response = await fetch(API_URL);
    if(!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    return await response.json();
}

export async function createMovie (movieData){
    const response = await fetch(API_URL, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"        
        },
        body: JSON.stringify(movieData),
        }
    )
    let data = null;

    try {
        data = await response.json();
    } catch (error){
        data = null;
    }

    if(!response.ok) {   
        throw new Error(`Failed to create movie: ${response.statusText}`);
    }
    return data;
}

