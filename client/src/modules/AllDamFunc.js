function IndInObjArr(objArray, subj, inkey, sensetive) {
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
function matchInObjArr(objArray, subjarr, keysArr, sensetive) {
  var res = [];
  if (subjarr.length != keysArr.length) {
    return false;
  }
  function getAll(arr) {
    var res = [];
    var was = [];
    var raw = [];
    arr.forEach(function(a, i) {
      a.forEach(function(f, i2) {
        if (was.indexOf(f) == -1) {
          was.push(f);
          raw.push(1);
        } else {
          raw[was.indexOf(f)]++;
          if (raw[was.indexOf(f)] == arr.length)
            res.push(f);
          }
        })
    })
    return res;
  }
  var preResult = [];
  subjarr.forEach(function(subj, si) {
    if (typeof(subj) == 'object') {
      //
      subj.forEach(function(sb) {

        if (typeof(keysArr[si]) == 'object') {
          //
          keysArr[si].forEach(function(ka) {
            var R = IndInObjArr(objArray, sb, ka, sensetive);
            if (R) {
              preResult.push(R);
            }
          })
        } else {
          var R = IndInObjArr(objArray, sb, keysArr[si], sensetive);
          if (R) {
            preResult.push(R);
          }
        }
      })
    } else {
      if (typeof(keysArr[si]) == 'object') {
        //
        keysArr[si].forEach(function(ka) {
          var R = IndInObjArr(objArray, subj, ka, sensetive);
          if (R) {
            preResult.push(R);
          }
        })
      } else {
        var R = IndInObjArr(objArray, subj, keysArr[si], sensetive);
        if (R) {
          preResult.push(R);
        }
      }
    }
  })
  ////
  if (preResult.length = subjarr.length) {
    return getAll(preResult);
  } else {
    return [];
  }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////\

function makeHash(){
  var alp = ['a','0','b','c','1','d','e','f','g','2','3','4','h','i','5','j','6','7','k','l','m','n','8','o','p','q','r','s','t','u','v','w','x','y','9','z']
  var r = ''
  for (var i = 0; i < 21; i++) {
    var q = Math.round(Math.random() * alp.length-1)
    if(q<0)q=0;
    r = r+alp[q]
  }
  return r;
}

function incl(arr, obj) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == obj) return true;
  }
  return false;
}

function ValInObjArr(objArray, subj, inkey, sensetive) {
  var sens = ((typeof inkey) === "boolean") ? inkey : false;
  var found = false;
  var result = {};
  if (objArray.length > 0) {

    objArray.forEach(function(obj, ind) {
      if (!sens && inkey) {
        var sub1 = sensetive ? obj[inkey] : obj[inkey].toLowerCase();
        var sub2 = sensetive ? subj : subj.toLowerCase();
        if (sub1 == sub2) {
          found = true;
          result = ind;
        }
      } else {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var sub1 = sens ? obj[key] : obj[key].toString().toLowerCase();
            var sub2 = sens ? subj : subj.toString().toLowerCase();
            if (sub1 == sub2) {
              found = true;
              result = ind;
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
function GetObjById(Source, id) {
  var e = false;
  var fnd = {};
  Source.forEach(function(src) {

    if (src.id == id) {
      e = true;
      fnd = src;
    }
  })
  if (e) {
    return fnd;
  } else {
    return e;
  }
}
function ExistId(Source, id) {
  var e = false;
  Source.forEach(function(src) {
    if (src.id == id) {
      e = true;
    }
  })
  return e;
}

function ch(v) {
  if (typeof (v) == 'number') {
    return true
  } else {
    return v;
  }
}
function dateToArray(date){
  date = date || new Date();
  return [date.getFullYear(), date.getMonth(), date.getDate()]
}
function nd(a,b,c,d){
   var cur = new Date();
   if(!a){
     return cur;
   }
   if(typeof(a)=='string'){
    if(a.indexOf(':')>-1){
    var num = a.split(":");
    if(!b){
      var date = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate(), num[0], num[1]);
    } else {
      var date = new Date(b.getFullYear(), b.getMonth(), b.getDate(), num[0], num[1]);
    }
    return date;
    }
  }
 if(a && b && c && d){
   var num = d.split(":");
   var date = new Date(a, b, c, num[0], num[1], '00');
   return date;
 }
}
function today(d){
  var tdy = new Date();
  if(d.getFullYear() == tdy.getFullYear()
  && d.getMonth() == tdy.getMonth()
  && d.getDate() == tdy.getDate()
  ) return true
  else return false
}
function Ago( what, count, initDate){
  var def = 'days';

  count = count ? count : ((typeof(initDate) == 'object') ? 1 : initDate*1 );
  initDate = initDate ? ((typeof(initDate) == 'object') ? initDate : new Date() ): new Date();
  what = what ? what : def;
  itr = Array.isArray(what) ? what.length : 1;
  for (var i = 0; i < itr; i++) {
    w = Array.isArray(what) ? what[i] : what;
    cnt = Array.isArray(count) ? ((count.length > i) ? count[i] : count[count.length-1]) : count;
    switch (w.toLowerCase()) {
      case 'years':
      var d =  (initDate.getFullYear()+cnt)
      initDate.setYear(d);
      break;
      case 'months':
      var d =  (initDate.getMonth()+cnt);
      initDate.setMonth(d);
      break;
      case 'days':
      var d =  (initDate.getDate()+cnt) ;
      initDate.setDate(d);
      break;
      case 'hours':
      var d =  (initDate.getHours()+cnt) ;
      initDate.setHours(d);
      break;
      case 'minutes':
      var d =  (initDate.getMinutes()+cnt);
      initDate.setMinutes(d);
      break;
      case 'seconds':
      var d =  (initDate.getSeconds()+cnt) ;
      initDate.setSeconds(d);
      break;
      default:
      var d =  (initDate.getDate()+cnt) ;
      initDate.setDate(d);
    }
  }
  return initDate;
}
function CompareDate(Fdate, Sdate, returnBy, abs) {
  if(typeof(Sdate) == 'string') {
    var spl = Sdate.split(':');
    var Sdate = new Date(Fdate);
    Sdate.setHours(spl[0]);
    Sdate.setMinutes(spl[1]);
    // console.log(Sdate.toString(), Fdate.toString())
  }
  delta = Fdate.getTime() - Sdate.getTime();
  returnBy = returnBy ? returnBy : 'ms';
  var res = 0;
  switch (returnBy.toLowerCase()) {
    case 'year':
      res = Math.floor(delta / 1000 / 60 / 60 / 24 / 7 / 52);
      break;
    case 'week':
      res = Math.floor(delta / 1000 / 60 / 60 / 24 / 7);
      break;
    case 'day':
      res = Math.floor(delta / 1000 / 60 / 60 / 24);
      break;
    case 'hour':
      res = Math.floor(delta / 1000 / 60 / 60);
      break;
    case 'min':
      res = Math.floor(delta / 1000 / 60);
      break;
    case 'sec':
      res = Math.floor(delta / 1000 );
      break;
    case 'ms':
      res = Math.floor(delta);
      break;
    default:
      res = Math.floor( delta / 1000 / 60 );
  }
  return abs ? Math.abs(res) : res;
}
function daysInMonth(year, month){
  var date = new Date(year*1,month*1);
  date.setDate(32);
  return 32 - date.getDate();
}
function getMonthInfo(year, month, prazd){
  var budni = [];
  var subbot = [];
  var vih = [];
  var pr = prazd || [];
  var dim = daysInMonth(year*1,month*1);
  var nd = new Date(year*1,month*1,1);
  var d = 0;
  for (var i = 1; i < dim+1; i++) {
    nd.setDate(i);
    d = nd.getDay();
    if(d == 6 && pr.indexOf(i) == -1){
      subbot.push(i);
    }else {
      if(d != 0 && pr.indexOf(i) == -1){
        budni.push(i);
      }else{
        vih.push(i);
      }
    }
  }

  return {
    days: dim,
    budni: budni,
    subbot: subbot,
    vih: vih
  }
  // sd.setDate(sd.getDate())
}
function calcHrs(year, month, fixT, fixST, prazd){
  // calcHrs(2017(год),0(месяц),7(часы в будни),5(часы в субботу),[](праздники))
  var mon = getMonthInfo(year,month,prazd);
  var hrs = (mon.budni.length*(fixT*1))+(mon.subbot.length*(fixST*1));
  return hrs;
}
function rawToDate(raw) {
  var d = raw.split(/\.|\-|\ /);
  if((d[0]*1 > 31) || (d[0]*1 < 1) || (d[1]*1 > 12) || (d[1]*1 < 1)){
    return new Date(d[2],d[1]-1,d[0]);
  }else{
    return false;
  }
}
function splitByTime (fdate, sdate, time) {
  function chk (f,s,h,m){
    var td = new Date(f);
    td.setHours(h*1);
    td.setMinutes(m*1);
    if(CompareDate(td, s)<=0){
      if(CompareDate(td, f)>=0) {return true;} else {return false}
    } else {
      if(CompareDate(td, f)<=0) {return true;} else {return false}
    }
  }
  var t1 = time[0].split(':');
  var t2 = time[1].split(':');
  var fa = [];
  var c = false
  var splInd = 0;
  var subDate = new Date(sdate)
  var late = true;
  var lateMin = 0;
  if(chk(fdate,sdate,t1[0],t1[1])){
    splInd=1;
    late = false;
    subDate.setHours(t1[0]*1);
    subDate.setMinutes(t1[1]*1);
    fa.push([fdate, subDate])
    // console.log('pushed 1 >', fa[0])
    if(chk( subDate, sdate, t2[0], t2[1] )){
      splInd=3;
      var subDate2 = new Date(subDate);
      subDate2.setHours(t2[0]*1);
      subDate2.setMinutes(t2[1]*1);
      fa.push([subDate, subDate2]);
      // console.log('pushed !2 >', fa[0])//fa[1][0].getHours(),fa[1][1].getHours())
      fa.push([subDate2, sdate]);
      // console.log('pushed !3 >', fa[0])//fa[2][0].getHours(),fa[2][1].getHours())
    } else {
      fa.push([subDate, sdate]);
      // console.log('pushed 2 >', fa[0])//[1][0].getHours(),fa[1][1].getHours())

    }
    c = true;
  } else {
    if(chk(fdate,sdate,t2[0],t2[1])){
      splInd=2;
      subDate.setHours(t2[0]*1);
      subDate.setMinutes(t2[1]*1);
      fa.push([fdate, subDate])
      fa.push([subDate, sdate]);
      var lat = CompareDate(fdate, time[0], 'min');
      if(lat > 0 ) {
        lateMin = Math.abs(lat);
      }
      c = true;
    }
  }
  if(!c){
    fa.push([fdate,sdate])
    var lat = CompareDate(fdate, time[0], 'min');
    if(lat > 0 ) {
      if(CompareDate(sdate, time[1], 'min') < 0){
        // console.log('passed!')
        lateMin = Math.abs(lat);
      }
    }
  }
  // console.log(fa[0][0].getHours(),fa[0][1].getHours())
  return {
    late,
    lateMin,
    result: fa,
    splInd,
    splited: c
  };
}
function isDate(dt) {
  if(typeof(dt) === 'object'){
    return (typeof(dt.getMonth) === 'function')
  } else {
    return false;
  }
}
function splitDates(dArr, sTimes, returnBy) {
   var type = returnBy ? returnBy : 'minutes';

   //  var st = 0;
   var result = {
     lateMin:0,
     before:0,
     between:0,
     after:0
   };
   var tween = [];
   var n = false;
   var subd = [];
   var late = true;
   var pre = [];
   dArr.forEach(function (check, i) {
     if(!isDate(check[1])) {
      //  console.log(check)
       if(today(check[0])){
         check[1] = nd();
        //  console.log('setting now');
       } else {
        //  console.log('setting 23:59');
         check[1] = nd('23:59',check[0]);
       }
     }
     var spl = splitByTime(check[0], check[1], sTimes);
    //  console.log('spl - > ',spl)
     if(spl.splited) {
       switch (spl.splInd) {
         case 1:
        //  console.log('1 > ',spl)
         if(spl.late == false) late == false;
         result.before += CompareDate(spl.result[0][0],spl.result[0][1],'min',true)*1;
         result.between += CompareDate(spl.result[1][0],spl.result[1][1],'min',true)*1;
           break;
           case 2:
          //  console.log('2 > ',spl)
           if(spl.late){
             pre.push(spl.lateMin)
           }
           result.after += CompareDate(spl.result[1][0],spl.result[1][1],'min',true)*1;
           result.between += CompareDate(spl.result[0][0],spl.result[0][1],'min',true)*1;

             break;
             case 3:
            //  console.log(spl)
            //  console.log('3 > ',spl)
             result.before += CompareDate(spl.result[0][0],spl.result[0][1],'min',true)*1;
             result.between += CompareDate(spl.result[1][0],spl.result[1][1],'min',true)*1;
             result.after += CompareDate(spl.result[2][0],spl.result[2][1],'min',true)*1;
               break;
         default:
        //  console.log('default act')
       }
     } else {
       // если первая дата раньше чем вторая , то результат: "+"
      //  console.log('not splited',sTimes);
       var cmp = CompareDate(spl.result[0][0],sTimes[0])*1;
       var cmp2 =CompareDate(spl.result[0][1],sTimes[1])*1;
       if(spl.late){
         pre.push(spl.lateMin)
       }
      //  console.log('must be  > 0 ---',cmp,'must be < 0 --',cmp2)
       if(cmp > 0 && cmp2 < 0){
        //  console.log('><')
         result.between += CompareDate(spl.result[0][0],spl.result[0][1],'min',true)*1;
       } else {
        //  console.log('<>')
         if(cmp > 0 && cmp2 > 0) result.after += CompareDate(spl.result[0][0],spl.result[0][1],'min',true)*1;//e
         if(cmp < 0 && cmp2 < 0) result.before += CompareDate(spl.result[0][0],spl.result[0][1],'min',true)*1;//b
       }
     }
   })
   if(late){
     pre.reverse().forEach(function (l) {
       if(l>0){
         result.lateMin = l;
       }
     })
   }
  //  tween.forEach(function (t) {
  //    console.log(t[0].getHours()+':'+t[0].getMinutes(),t[1].getHours()+':'+t[1].getMinutes())
  //  })
  //  console.log(result)
   return result;
}
function getSummary(checkArray, type, notes, startTime) {
  var sum = 0;
  var result = {}
  checkArray.forEach(function (ch, i) {
    var chIn  = ch[0];
    var chOut = ch[1];
    if(!isDate(ch[1])) {
      if(today(ch[0])){
        chOut = nd();
      } else {
        chOut = nd('23:59',ch[0]);
      }
    }
    sum += CompareDate(new Date(chIn), new Date(chOut), 'min', true);
  })
  // result.
  return sum;
}

function comp(fd, sd, by){
  var fd = (typeof(fd) == 'string') ? nd(fd) : fd;
  var sd = (typeof(sd) == 'string') ? nd(sd) : sd;
  var compRes = CompareDate(fd, sd, (by||'ms'));
  var result = {
    gab : Math.abs(compRes),
    rawGab: compRes,
    result: (compRes == 0) ? '=' : ( (compRes < 0) ? '<' : '>' )
  }
  return result;
}
// console.log(comp(new Date(), nd('13:15'), 'min'));
module.exports.comp = comp;
module.exports.nd = nd;
module.exports.today = today;
module.exports.Ago = Ago;
module.exports.CompareDate = CompareDate;
module.exports.rawToDate = rawToDate;
module.exports.isDate = isDate;
module.exports.splitDates = splitDates;
module.exports.dateToArray = dateToArray;
// module.exports.incl = incl;
// module.exports.incl = incl;
// module.exports.incl = incl;
// module.exports.incl = incl;


module.exports.IndInObjArr = IndInObjArr;
module.exports.matchInObjArr = matchInObjArr;
module.exports.makeHash = makeHash;
module.exports.ValInObjArr = ValInObjArr;
module.exports.GetObjById = GetObjById;
module.exports.ch = ch;
module.exports.incl = incl;
module.exports.ExistId = ExistId;