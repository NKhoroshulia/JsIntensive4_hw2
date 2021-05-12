function makeObjectDeepCopy(obj) {
    let cloneObj = {};

    for (let key in obj) {
        if((typeof obj[key]) == 'object' && obj[key] != null) {
            cloneObj[key] = makeObjectDeepCopy(obj[key]);
        }  
        
        if (obj[key] instanceof Array) {
            cloneObj[key] = [...obj[key]];
        } 

        if (obj[key] instanceof Function) {
            continue;
        }
            cloneObj[key] = obj[key];
    }

    return cloneObj;
}

function selectFromInterval(arr, a, b) {
    if (!Array.isArray(arr)) {
        throw new Error('Первым параметром передан не массив');
    }

    if (arr.every(elem => typeof elem !== 'number' || isNaN(elem))) {
        throw new Error('Массив содержит не только числа');
    }

    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
        throw new Error('Ошибка: задано невалидное значение интервала');
    } 
    
    let result = [];
    let firstValue;
    let secondValue;

    if (a > b) {
        firstValue = b;
        secondValue = a;
    } else {
        firstValue = a;
        secondValue = b;
    }

    arr.filter(elem => {
        if (elem >= firstValue && secondValue >= elem) {
            result.push(elem);
        }
    }); 
        return result;
}

const myIterable = {
    from: 1,
    to: 5,
};

myIterable[Symbol.iterator] = function() {
    if (!this.from || !this.to) {
        throw new Error('Значения не указаны !');
    } else if (typeof this.from !== 'number' || typeof this.to !== 'number' || isNaN(this.from) || isNaN(this.to)) {
        throw new Error('Значения указаны не верно!');
    } else if (this.from > this.to) {
        throw new Error('Начальное значение больше конечного!');
    } else {
        return {
            current: this.from,
            last: this.to,
            next() {
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            },
        };
    }
};
