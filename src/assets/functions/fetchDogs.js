export default async (uri) => {
  const response = await fetch(uri);
  const dogData = await response.json();
  return dogData.message;
}