export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null; 
  };
  
  export const getUserRole = () => {
    const role = localStorage.getItem('role'); 
    console.log("role",role);
    return role; 
  };
  