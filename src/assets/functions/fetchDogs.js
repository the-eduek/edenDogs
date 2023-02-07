export default async (uri) => {
  try {
    const response = await fetch(uri);
    const dogData = await response.json();
    return dogData.message;    
  } catch (error) {
    return "Error fetching"
  }  
}