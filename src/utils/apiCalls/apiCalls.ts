const URL = "https://api.getgeoapi.com/v2/currency";
const API_KEY = "api_key=5a35f17f4f0817de4bc6aeb0f5954a6b57771212";
const FORMAT = "format={json}";

export const getCurrencies = async () => {
  const response = await fetch(`${URL}/list?${API_KEY}&${FORMAT}`);
  return response.json();
}

export const getExchangedValue = async (from: string, to: string, amount: number) => {
  const response = await fetch(`${URL}/convert?${API_KEY}&${FORMAT}&from=${from}&to=${to}&amount=${amount}`);
  return response.json();
}