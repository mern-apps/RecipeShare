import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
// to check if can do W/O {} import jwtDecode from 'jwt-decode';




export const setTokenCookie = (token) => {
  Cookies.set('token', token, { expires: 5, secure: true, sameSite: 'strict' });
};




export const removeTokenCookie = () => {
  Cookies.remove('token');
};

export const getTokenFromCookie = () => {
  const token = Cookies.get('token');
  return token ? token : null;
};

export const decodeToken = () => {
  const token = getTokenFromCookie();
  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode(token);

  // Prepare the user object
  const user = {
    _id: decodedToken._id,
    firstName: decodedToken.firstName,
  };
  console.log(decodedToken);

  // Return the user object
  return { user };
};


// Function to check if the token is expired
export const isTokenExpired = (token) => {
  if (!token) {
    return true; // If there's no token, consider it expired
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

//This line below returns true if the token has expired (i.e., the expiration timestamp is earlier than the current time), and false otherwise
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return true; // If there's an error decoding the token, consider it expired
  }
};

