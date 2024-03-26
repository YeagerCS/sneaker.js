// strings
export const capitalize = (str) => {
    return str[0].toUpperCase() + str.substring(1);
}

// arrays

// Flatten a nested array structure into a single-level array
export const flatten = (arr) => {
    const flattened = []

    arr.forEach(elem => {
        if(Array.isArray(elem)){
            [flattened, ...flatten(elem)]
        } else{
            [flattened, ...elem]
        }
    })

    return flattened;
}


// dates
export const formatDate = (date, format) => {
    const year = date.getFullYear();
    const month = String((date.getMonth() + 1)).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    const formatOptions = {
        "yyyy": year,
        "mm": month,
        "dd": day,
        "hh": hours,
        "ii": minutes,
        "ss": seconds
    }

    return format.replace(/yyyy|mm|dd|hh|ii|ss/g, match => formatOptions[match])
}


// numbers
export const formatCurrency = (number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", { style: 'currency', currency }).format(number);
}

export const roundDecimals = (number, decimal) => {
    const multiplier = Math.pow(10, decimal)
    return Math.round(number * multiplier) / multiplier;
}


// objects
const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

const mergeObjects = (obj1, obj2) => {
    const merged = {};
    Object.assign(merged, obj1);

    for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            merged[key] = obj2[key];
        }
    }

    return merged;
}
