class DamFunc {
  static IndInObjArr(objArray, subj, inkey, sensetive) {
    var sens = ((typeof inkey) === "boolean") ? inkey : false;
    var found = false;
    var result = [];
    if (objArray.length > 0) {
      objArray.forEach(function(obj, ind) {
        if (!sens && inkey) {
          var sub1 = sensetive ? obj[inkey] : obj[inkey].toString().toLowerCase();
          var sub2 = sensetive ? subj : subj.toString().toLowerCase();
          if (sub1 == sub2) {
            found = true;
            result.push(ind);
          }
        } else {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              var sub1 = sens ? obj[key] : obj[key].toString().toLowerCase();
              var sub2 = sens ? subj : subj.toString().toLowerCase();
              if (sub1 == sub2) {
                found = true;
                result.push(ind);
              }
            }
          }
        }
      })
    }
    if (found) {
      return result;
    } else {
      return false;
    }
  }
}

export default DamFunc;
