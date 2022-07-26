// to help with debugging
export function unbleach (n: string): string {
    if (n) return n.replace(/ /g, 's').replace(/\t/g, 't').replace(/\n/g, 'n');
    return '';
}

interface InstructionMetadata {
    parameter: 'label' | 'number' | null;
    isLabel: boolean;
    involve: (n: any, m: Machine) => void;
}

class Instruction {
    public constructor(
        public signature: string,
        public parameter: number | string | null,
        protected meta: InstructionMetadata
    ) {}
    public do(machine: Machine) {
        this.meta.involve(this.parameter, machine);
    }
}

interface IHeap {
    [index: string]: number;
}

class Machine {
    public input: string = "";
    public output: string[] = [];
    public stack: number[] = [];
    public heap: IHeap = {};
    private call_stack: number[] = [];
    private labelMapping = new Map<string, number>();
    private pp: number = 0;
    private preparedCode: string[];
    private ip: number = 0;
    private instructions: Instruction[] = [];
    private instructionsInfoMapping = new Map<string, InstructionMetadata>([
        // ***********************************
        // IMP [space] - Stack Manipulation
        // ***********************************
        ['ss', {parameter: 'number', isLabel: false, involve: (value: number, machine) => {
                // Push n onto the stack.
                machine.stack.push(value);
            }}],
        ['sts', {parameter: 'number', isLabel: false, involve: (value: number, machine) => {
                // Duplicate the nth value from the top of the stack and push onto the stack.
                const tmp = machine.stack[machine.stack.length - value - 1];
                if (tmp === undefined) throw new Error("STS: Invalid stack access");
                machine.stack.push(tmp);
            }}],
        ['stn', {parameter: 'number', isLabel: false, involve: (value: number, machine) => {
                // Discard the top n values below the top of the stack from the stack. (For n<0 or n>=stack.length, remove everything but the top value.)
                const top = machine.stack.slice(-1);
                if (value < 0 || value >= machine.stack.length) machine.stack = top;
                else machine.stack = machine.stack.slice(0, machine.stack.length - value - 1).concat(top);
            }}],
        ['sns', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Duplicate the top value on the stack.
                const tmp = machine.stack.pop();
                if (tmp === undefined) throw new Error("SNS: Empty stack");
                machine.stack.push(tmp);
                machine.stack.push(tmp);
            }}],
        ['snt', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Swap the top two value on the stack
                const tmp1 = machine.stack.pop(), tmp2 = machine.stack.pop();
                if (tmp1 === undefined || tmp2 === undefined) throw new Error("SNT: Not enough values in the stack");
                machine.stack.push(tmp1);
                machine.stack.push(tmp2);
            }}],
        ['snn', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Discard the top value on the stack.
                const tmp = machine.stack.pop();
                if (tmp === undefined) throw new Error("SNN: Empty stack");
            }}],
        // *******************************
        // IMP [tab][space] - Arithmetic
        // *******************************
        ['tsss', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Pop a and b, then push b+a.
                const a = machine.stack.pop(), b = machine.stack.pop();
                if (a === undefined || b === undefined) throw new Error("TSSS: Empty stack");
                machine.stack.push(a + b);
            }}],
        ['tsst', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Pop a and b, then push b-a.
                const a = machine.stack.pop(), b = machine.stack.pop();
                if (a === undefined || b === undefined) throw new Error("TSST: Empty stack");
                machine.stack.push(b - a);
            }}],
        ['tssn', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Pop a and b, then push b*a.
                const a = machine.stack.pop(), b = machine.stack.pop();
                if (a === undefined || b === undefined) throw new Error("TSSN: Empty stack");
                machine.stack.push(a * b);
            }}],
        ['tsts', {parameter: null, isLabel: false, involve: (_:null, machine) => {
                // Pop a and b, then push b/a*. If a is zero, throw an error. Note that the result is defined as the floor of the quotient.
                const a = machine.stack.pop(), b = machine.stack.pop();
                if (a === undefined || b === undefined) throw new Error("TSTS: Empty stack");
                if (a === 0) throw new Error("TSTS: Division by zero");
                machine.stack.push(Math.floor(b / a));
            }}],
        ['tstt', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Pop a and b, then push b%a*. If a is zero, throw an error. Note that the result is defined as the remainder after division and sign (+/-) of the divisor (a).
                const a = machine.stack.pop(), b = machine.stack.pop();
                if (a === undefined || b === undefined) throw new Error("TSTT: Empty stack");
                if (a === 0) throw new Error("TSTT: Modulo by zero");
                const res = b - a * Math.floor(b / a);
                machine.stack.push((a < 0 ? -1 : 1) * Math.abs(res));
            }}],
        // *******************************
        // IMP [tab][tab] - Heap Access
        // *******************************
        ['tts', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Pop a and b, then store a at heap address b.
                const a = machine.stack.pop(), b = machine.stack.pop();
                if (a === undefined || b === undefined) throw new Error("TTS: Empty stack");
                machine.heap[b] = a;
            }}],
        ['ttt', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Pop a and then push the value at heap address a onto the stack.
                const a = machine.stack.pop();
                if (a === undefined) throw new Error("TTT: Empty stack");
                const tmp = machine.heap[a];
                if (tmp === undefined) throw new Error("TTT: Invalid address");
                machine.stack.push(tmp);
            }}],
        // *************************************
        // IMP [tab][line-feed] - Input/Output
        // *************************************
        ['tnss', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Pop a value off the stack and output it as a character.
                const tmp = machine.stack.pop();
                if (tmp === undefined) throw new Error("TNSS: Empty stack");
                machine.output.push(String.fromCharCode(tmp));
            }}],
        ['tnst', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Pop a value off the stack and output it as a number.
                const tmp = machine.stack.pop();
                if (tmp === undefined) throw new Error("TNST: Empty stack");
                machine.output.push(tmp.toString(10));
            }}],
        ['tnts', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Read a character from input, a, Pop a value off the stack, b, then store the ASCII value of a at heap address b.
                const c = machine.getInputChar(), b = machine.stack.pop();
                if (b === undefined) throw new Error("TNTS: Empty stack");
                machine.heap[b] = c.charCodeAt(0);
            }}],
        ['tntt', {parameter: null, isLabel: false, involve: (_: null, machine) => {
                // Read a number from input, a, Pop a value off the stack, b, then store a at heap address b.
                const a = machine.getInputNumber(), b = machine.stack.pop();
                if (b === undefined) throw new Error("TNTT: Empty stack");
                machine.heap[b.toString(10)] = a;
            }}],
        // *********************************
        // IMP [line-feed] - Flow Control
        // *********************************
        ['nss', {parameter: 'label', isLabel: true, involve: (_: null, machine) => {
                // Mark a location in the program with label n.
            }}],
        ['nst', {parameter: 'label', isLabel: false, involve: (label: string, machine) => {
                // Call a subroutine with the location specified by label n.
                machine.call_stack.push(machine.ip);
                let tmp_ip: number | undefined;
                if ((tmp_ip = machine.labelMapping.get(label)) === undefined) {
                    throw new Error("NST: nvalid label");
                }
                machine.ip = tmp_ip;
            }}],
        ['nsn', {parameter: 'label', isLabel: false, involve: (label: string, machine) => {
                // Jump unconditionally to the position specified by label n.
                let tmp_ip: number | undefined;
                if ((tmp_ip = machine.labelMapping.get(label)) === undefined) {
                    throw new Error("NSN: Invalid label");
                }
                machine.ip = tmp_ip;
            }}],
        ['nts', {parameter: 'label', isLabel: false, involve: (label: string, machine) => {
                // Pop a value off the stack and jump to the label specified by n if the value is zero.
                const tmp = machine.stack.pop();
                if (tmp === undefined) {
                    throw new Error("NTS: Empty stack");
                }
                if (tmp === 0) {
                    let tmp_ip: number | undefined;
                    if ((tmp_ip = machine.labelMapping.get(label)) === undefined) {
                        throw new Error("NTS: Invalid label");
                    }
                    //console.log('tmp_ip', tmp_ip);
                    machine.ip = tmp_ip;
                }
            }}],
        ['ntt', {parameter: 'label', isLabel: false, involve: (label: string, machine) => {
                // Pop a value off the stack and jump to the label specified by n if the value is less than zero.
                const tmp = machine.stack.pop();
                if (tmp === undefined) {
                    throw new Error("NTT: Empty stack");
                }
                if (tmp < 0) {
                    let tmp_ip: number | undefined;
                    if ((tmp_ip = machine.labelMapping.get(label)) === undefined) {
                        throw new Error("NTT: Invalid label");
                    }
                    //console.log('tmp_ip', tmp_ip);
                    machine.ip = tmp_ip;
                }
            }}],
        ['ntn', {parameter: null, isLabel: false, involve: (_: null, machine: Machine) => {
                // Exit a subroutine and return control to the location from which the subroutine was called.
                const tmp = machine.call_stack.pop();
                if (tmp === undefined) {
                    throw new Error('NTN: Call stack is empty');
                }
                machine.ip = tmp;
            }}],
        ['nnn', {parameter: null, isLabel: false, involve: (_: null, machine: Machine) => {
                // Exit the program.
                machine.ip = -1;
            }}],
    ]);

    public constructor(code: string) {
        this.preparedCode = unbleach(code.replace(/[^\t\s\n]/g, '')).split('');
    }

    public getNext(): string {
        if (this.pp >= this.preparedCode.length) {
            throw new Error('Unexpected end of code');
        }
        return this.preparedCode[this.pp++];
    }

    public getInputChar(): string {
        if (this.input.length === 0 ) throw new Error("getInputChar@Machine: Empty input");
        const c = this.input.charAt(0);
        this.input = this.input.slice(1);
        return c;
    }

    public getInputNumber(): number {
        const tmp = this.input.split("\n");
        this.input = tmp.slice(1).join("\n");
        if (tmp[0].length === 0) throw new Error("getInputNumber@Machine: Empty input");
        let match: RegExpMatchArray | null = null;
        if (!!(match = tmp[0].match(/^0x([0-9a-f]+)/))) {
            return parseInt(match[1], 16);
        } else if (!!(match = tmp[0].match(/^0b([01]+)/))) {
            return parseInt(match[1], 2);
        } else if (!!(match = tmp[0].match(/^0([0-7]+)/))) {
            return parseInt(match[1], 8);
        }
        return parseInt(tmp[0]);
    }

    public parseNumber(): number {
        let sign: string | number = this.getNext();
        switch (sign) {
            case 't':
                sign = -1;
                break;
            case 's':
                sign = 1;
                break;
            default:
                throw new Error('parseNumber@machine: Invalid sign in number');
        }
        const digits = [];
        for(let char = this.getNext(); char !== "n"; char = this.getNext()) {
            digits.push(char === "s" ? 0 : 1);
        }
        return sign * digits.reduce((val, digit, i, digits) =>
            val + digit * Math.pow(2, digits.length - i - 1),
            0);
    }

    public parseLabel() {
        let label = "", next = this.getNext();
        while (next !== "n") label += next, next = this.getNext();
        return label + "n";
    }

    public compile(): void {
        let meta: InstructionMetadata | undefined = undefined;
        let fExit = false;
        let i = 0;
        while (true) {
            if (this.pp >= this.preparedCode.length) {
                if (!fExit) {
                    throw new Error('Program exit not found');
                }
                break;
            }

            let imp = this.getNext() + this.getNext();
            meta = this.instructionsInfoMapping.get(imp);
            if (!meta) {
                imp += this.getNext();
                meta = this.instructionsInfoMapping.get(imp);
                if (!meta) {
                    imp += this.getNext();
                    meta = this.instructionsInfoMapping.get(imp);
                    if (!meta) {
                        throw new Error(`Cannot parse instruction "${imp}"`);
                    }
                }
            }
            if (imp === 'nnn') {
                fExit = true;
            }
            let parameter: number | string | null = null;
            if (meta.parameter === 'label') {
                parameter = this.parseLabel();
                if (meta.isLabel) {
                    if (this.labelMapping.has(parameter)) {
                        throw new Error(`Label duplicated "${parameter}"`);
                    }
                    this.labelMapping.set(parameter, i);
                }
            } else if (meta.parameter === 'number') {
                parameter = this.parseNumber();
            }
            this.instructions[i++] = new Instruction(imp, parameter, meta);
        }
    }

    public run(input?: string): void {
        if (!input) {
            this.input = '';
        } else {
            this.input = input;
        }
        //console.log(this.preparedCode.join(''));
        do {
            const instruction = this.instructions[this.ip++];
            instruction.do(this);
        } while (this.ip >= 0);
    }

    public getOutput() {
        return this.output.join('');
    }
}

// solution
export function whitespace(code: string, input?: string): string {
    // let output = '';
    const machine = new Machine(code);
    machine.compile();
    machine.run(input);
    return machine.getOutput();
};
