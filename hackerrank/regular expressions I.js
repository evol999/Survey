
function regexVar(s) {
    /*
     * Declare a RegExp object variable named 're'
     * It must match a string that starts and ends with the same vowel (i.e., {a, e, i, o, u})
     */
    const re = /^a\w+a$|^e\w+e$|^i\w+i$|^o\w+o$|^u\w+u$/;
    
    /*
     * Do not remove the return statement
     */
    return re.test(s);
}
console.log(regexVar('ubcdu'));