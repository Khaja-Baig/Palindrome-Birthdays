function reverseStr(str){
    
    return str.split('').reverse().join('');
}
function isPalindrome(str){
    var reverse = reverseStr(str);

    if (str === reverse){
        return true;
    }
    return false;
}

function convertDateToStr(date){
    var dateStr = {day: '',month: '',year: ''};

    if (date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if (date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr
}

function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day; 

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeFromAllDataFormats(date){
    var listOfAllFormats = getAllDateFormats(date);

    var variable = false;

    for (var i=0; i<listOfAllFormats.length; i++){
        if(isPalindrome(listOfAllFormats[i])){
            variable =  true;
            break;
        }
    }
    return variable
}
//From now we are going  through the programme to find of further palindrome date
function isLeapYear(year){
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if (month === 2){
        if (isLeapYear(year)){
            if (day > 29){
                day = 1
                month++;
            }
        }
        else {
            if (day > 28){
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }
    if (month > 12){
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}
function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);

    while(1){
        counter++;
        var isPalindrome = checkPalindromeFromAllDataFormats(nextDate);
        
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter,nextDate];
}


var dateInput = document.querySelector("#input");
var showBTN = document.querySelector("#showBtn");
var ouput = document.querySelector("#output");


function clickHandler(e) {
    var dInput = dateInput.value;

    if (dInput !== ''){
        var listOfDate = dInput.split('-');
    
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        
        var isPalindrome = checkPalindromeFromAllDataFormats(date);
        

        if (isPalindrome){
            ouput.innerText = "yay your birthday is a palindrome🥳🥳";

        }
        else {
            var [counter,nextDate] = getNextPalindromeDate(date);
            ouput.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days! 😔`;

            console.log(counter,nextDate);
        }
    }
}



showBTN.addEventListener("click",clickHandler);




// date = {
//     day: 31,
//     month: 12,
//     year: 2021
// }

