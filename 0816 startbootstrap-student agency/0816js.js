var count; 
var count=0;
console. log(count);
count = count + 1;
console. log(count);

var a = 3;
var b = a++;
console. log(b);
var a = 3;
var c= ++a;
console. log(c);

console. log(3 === "3");
console. log(3 == "3");
console. log(3 !== "3");
console. log((3 < 4) || (5 > 6));
console. log((3 < 4) && (5 > 6));
(3>4) ? console. log("yes"):console. log("no");
console. log((500%3>5) && (44/11===8));
console. log((9%6>=2) || (26*2%8<7));
((99*7/4===0)?28:32)!==104 ? console. log("true"):console. log(false);

var i = true;
var j=!i;
var k=!j;
console. log(i);
console. log(j);
console. log(k);

var count = 4;
console. log("我買" + count + "個橘子去,你就在此處不要走動。");

var add = function(a,b){
          return a+b;
};

var add = function(a,b){
return a+b;
};

console. log(add(6,9))
console. log(add(4,8))


var pi = 3.14;
var area = function(r){
  return pi*r*r;
};
console. log(area(2))