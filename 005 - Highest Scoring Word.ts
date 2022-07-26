export interface IHash {
    [details: string]: number;
};

export const high = (str: string): string => {
    const words = str.split(' ');
    const scores: IHash = {};
    words.forEach(word => {
        let wscore = 0;
        for (let i = 0; i < word.length; i++) {
            if (!(/^\w$/i.test(word[i]))) continue;
            wscore += word[i].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        }
        scores[word] = wscore;
    });
    //console.log($scores);
    return words.reduce((highScored: string, word: string) => {
        if (highScored === '') {
            return word;
        } else if (scores[word] > scores[highScored]) {
            return word;
        } else {
            return highScored;
        }
    }, '');
};
