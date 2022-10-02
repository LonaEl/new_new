export default (claims = [], action) => {
  switch(action.type) {
    case 'CLAIM':
      return [...claims, action.payload];
     default:
        return claims;
  }
 };


