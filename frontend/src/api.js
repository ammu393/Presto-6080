import axios from 'axios';

export const putStore = async (newStore, token, onSuccess, onError) => {
  try {
    const response = await axios.put('http://localhost:5005/store', newStore, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      if (onSuccess) onSuccess();
    } else {
      console.error("Error:", response.data);
      if (onError) onError(response.data);
    }
  } catch (error) {
    console.error("Failed to put store", error);
    if (onError) onError(error);
  }
};

export const getStore = async (token, onSuccess, onError) => {
  try {
    const response = await axios.get('http://localhost:5005/store', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      if (onSuccess) onSuccess();
      return response;
    } else {
      console.log("Error: ", response.data);
    }
  } catch (error) {
    console.error("Failed to get store", error);
    if (onError) onError(error);
  } 
}
