const typeOf = (input) => {
  const rawObject = Object.prototype.toString.call(input).toLowerCase();
  const typeOfRegex = /\[object (.*)]/g;
  const type = typeOfRegex.exec(rawObject)[1];
  return type;
};

export class Compare {
  static shallowCompare(source, target): boolean {
    if (typeOf(source) !== typeOf(target)) {
      return false;
    }

    if (typeOf(source) === 'array') {
      if (source.length !== target.length) {
        return false;
      }
      return source.every((el, index) => el === target[index]);
    } else if (typeOf(source) === 'object') {
      return Object.keys(source).every((key) => source[key] === target[key]);
    } else if (typeOf(source) === 'date') {
      return source.getTime() === target.getTime();
    }

    return source === target;
  }
}
