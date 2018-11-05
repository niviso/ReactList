const StringHelper = {
    capitalizeFirstLetter: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    isLowerCase: function(str) {
      {
        return str === str.toLowerCase() && str !== str.toUpperCase();
      }

  }
}
export default StringHelper;
