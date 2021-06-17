export const INPUT_NUMBER = 'number';
export const INPUT_CHECKBOX = 'checkbox';
export const DEFAULT_NUMBER = 10;
export const MIN_NUMBER = 7;
export const MAX_NUMBER = 15;

export const GENERATE = ( passwordLength, upper, lower, number, symbol) => {
    let validTypeCount = upper + lower + number + symbol;

    if(validTypeCount > 0) {
        let rawPassword ="";
        const typeArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

        for(let i = 0; i < passwordLength; i += validTypeCount) {

            typeArr.forEach(type => {
                const typeName = Object.keys(type);
                rawPassword += GET_RANDOM_CHARS[typeName]();
            });
        }
        return rawPassword.slice(0, passwordLength);
    }
    return false;

    // const typeArr = [{upper}, {lower}, {number}, {symbol}]
    // .filter(item => {
    //     //this below returns a boolean wrappend in an array
    //     if(!Object.values(item)[0] ) {
    //         //[ true] ||[ false ]
    //         return false;
    //     } 
    //     return true;
    // });
}

export const COPY = password => {
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    document.execCommand('copy');
    textarea.remove();
    alert('password was copied to the clipboard!');
}

export const SHUFFLE = password => {
    let passwordToShuffle = [...password];
        if(password && password !== '') {
            for(let i = passwordToShuffle.length -1; i > 0; i --) {
                const randomizedPos = Math.floor(Math.random() * (i+1));
                // let's say i = 3(second iteration) randomizedPos = 2,,,, and password is 'apple'
                [passwordToShuffle[i], passwordToShuffle[randomizedPos]]=[passwordToShuffle[randomizedPos], passwordToShuffle[i]];
                //password[3] = password[2], password[2] = password[3]
                //aplpe
            }
            return passwordToShuffle.join("");

            //this below is not really a solution 
            // const shuffledPassword =  [...password].sort(() => Math.random() - .5).join('');
            // return shuffledPassword;
            //".sort( _ => Math.random() - .5)" or ".sort( _ => .5 - Math.random())" works to shuffle values in an array. 

            //what is this under-score for?
            //this means that there is nothing thrown into the parameter. So in an arrow function, it is the same as " () => ".

            //what does 'join' mean
            //concatenates all the string values in an array, and create one long string. 
        }
        return false;
    
}


const GET_RANDOM_UPPER = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const GET_RANDOM_LOWER = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const GET_RANDOM_NUM = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const GET_RANDOM_SYMBOL = () => {
    const symbols = '~`!@#$%^&*()_-+={[}]|:;">';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const GET_RANDOM_CHARS = {
    upper: GET_RANDOM_UPPER,
    lower: GET_RANDOM_LOWER,
    number: GET_RANDOM_NUM,
    symbol: GET_RANDOM_SYMBOL
};