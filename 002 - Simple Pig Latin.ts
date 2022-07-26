export const pigIt = (a : string) : string =>  {
    let result = '';
    const prefix = (a.length > 0 && a[0] === ' ') ? ' ' : '';
    // console.log('input:', a);
    // console.log('splited:', a.split(' '));
    a.split(' ').forEach(word => {
        if (result.length > 0) result += ' ';
        if (/^\w+$/.test(word)) {
            result += word.substr(1) + word[0] + 'ay';
        } else {
            // console.log(`word: ${word}; not a word; result: ${result}`)
            result += word;
        }
    });
    return prefix + result;
}
