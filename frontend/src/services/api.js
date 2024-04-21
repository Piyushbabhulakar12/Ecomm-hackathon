import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

const postData = async (url, data) => {
  try {
    const response = await axios.post(base_url + url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getData = async (url) => {
  try {
    const response = await axios.get(base_url + url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteData = async (url) => {
  try {
    const response = await axios.delete(base_url + url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const putData = async (url, data) => {
  try {
    const response = await axios.put(base_url + url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { postData, getData, deleteData, putData };
