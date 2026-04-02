export default async function fetchData(query :string) {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${query}`);  
    const data = await response.json();
    return data;
}