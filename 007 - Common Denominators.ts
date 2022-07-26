interface IFactorized {
    [key: number]: number;
}

export const convertFrac = (lst: [number, number][]): string => {
    if (lst.length == 0)
        return "";
    const getPrimes = function (maxNum: number) {
        const candidates: boolean[] = Array.from({length: maxNum}, i => true);
        const maxi = Math.floor(Math.sqrt(maxNum));
        for (let i = 2; i <= maxi; i++) {
            if (candidates[i]) {
                const sqi = i * i;
                for (let k = 0; ; k++) {
                    const j = sqi + i * k;
                    if (j > maxNum) break;
                    candidates[j] = false;
                }
            }
        }
        const primes: number[] = [];
        for (let i = 2; i < candidates.length; i++) {
            if (candidates[i]) {
                primes.push(i);
            }
        }
        return primes;
    };
    const max_denom = lst.map(i => i[1]).reduce((carry, item) => {
        if (carry < item) return item;
        return carry;
    });
    // console.log(`Max denominator: ${max_denom}`);
    const primes = getPrimes(max_denom + 1);
    // console.log(`Primes: ${primes}`);
    const factorize = function(num: number) {
        const res: IFactorized = {};
        primes.forEach(prime => {
            let cnt = 0;
            while (num > 1) {
                if ((num % prime) === 0) {
                    num = Math.floor(num / prime);
                    cnt++;
                } else {
                    break;
                }
            }
            if (cnt > 0)
                res[prime] = cnt;
        });
        return res;
    };
    const simplified_lst = lst.map(item => {
        const fnum = factorize(item[0]);
        const fdenom = factorize(item[1]);
        const cfactors: IFactorized = {};
        Object.keys(fnum).forEach(prime => {
           if (fdenom[parseInt(prime)]) {
               cfactors[parseInt(prime)] = (fnum[parseInt(prime)] <= fdenom[parseInt(prime)]) ? fnum[parseInt(prime)] : fdenom[parseInt(prime)];
           }
        });
        const div = Object.keys(cfactors).reduce((carry, prime) => {
            return carry * Math.pow(parseInt(prime), cfactors[parseInt(prime)])
        }, 1);
        return [Math.floor(item[0] / div), Math.floor(item[1]) / div];
    });
    // console.log(`Simplified List: ${JSON.stringify(simplified_lst)}`);
    const fdenoms: IFactorized[] = simplified_lst.map(item => {
        return factorize(item[1]);
    });
    // console.log(`Factorized denominators: ${JSON.stringify(fdenoms)}`);
    const lcm_factors: IFactorized = {};
    for (const factors of fdenoms) {
        for (const prime in factors) {
            if (lcm_factors[parseInt(prime)]) {
                if (factors[parseInt(prime)] > lcm_factors[parseInt(prime)])
                    lcm_factors[parseInt(prime)] = factors[parseInt(prime)];
            } else {
                lcm_factors[parseInt(prime)] = factors[parseInt(prime)];
            }
        }
    }
    // console.log(`LCM factors: ${JSON.stringify(lcm_factors)}`);
    const lcd = Object.keys(lcm_factors).reduce((carry, prime) => {
        return carry * Math.pow(parseInt(prime), lcm_factors[parseInt(prime)]);
    }, 1);
    // console.log(`LCD: ${lcd}`);
    return  simplified_lst.map(item => {
        const num = Math.floor(item[0] * lcd / item[1]);
        return `(${num},${lcd})`;
    }).join('');
}
