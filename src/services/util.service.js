import fs from 'fs'

export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getFilterFromSearchParams,
    debounce,
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

//TODO feels like there is a bug in this function
function getFilterFromSearchParams(searchParams){
    const filterBy = {
        filterText: searchParams.size > 0 ?  searchParams.filterText : ''

    }
    return filterBy
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}