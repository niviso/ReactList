const LocalStorageHelper = {
    key: "list",
    getStorage: function(keyName){
      return localStorage.getItem(keyName || this.key);
    },
    setStorage: function(data,keyName){
      localStorage.setItem(keyName || this.key, data);
    }
}

export default LocalStorageHelper;
