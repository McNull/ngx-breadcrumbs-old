let seed = 1;

function random(): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function randomInt(min: number, max: number): number {
  return Math.round(random() * (max - min)) + min;
}

function randomItem<T>(array: Array<T>): T {
  return array[randomInt(0, array.length)];
}

function randomWords(count: number): string {
  let result = '';
  while(count-- > 0) {
    result += randomItem(lorem) + ' ';
  }
  return result.trim();
}

function guid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const lorem = ["at", "vero", "eos", "et", "accusamus", "et", "iusto", "odio", "dignissimos", "ducimus", "qui", "blanditiis", "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores", "et", "quas", "molestias", "excepturi", "sint", "occaecati", "cupiditate", "non", "provident", "similique", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollitia", "animi", "id", "est", "laborum", "et", "dolorum", "fuga", "et", "harum", "quidem", "rerum", "facilis", "est", "et", "expedita", "distinctio", "nam", "libero", "tempore", "cum", "soluta", "nobis", "est", "eligendi", "optio", "cumque", "nihil", "impedit", "quo", "minus", "id", "quod", "maxime", "placeat", "facere", "possimus", "omnis", "voluptas", "assumenda", "est", "omnis", "dolor", "repellendus", "temporibus", "autem", "quibusdam", "et", "aut", "officiis", "debitis", "aut", "rerum", "necessitatibus", "saepe", "eveniet", "ut", "et", "voluptates", "repudiandae", "sint", "et", "molestiae", "non", "recusandae", "itaque", "earum", "rerum", "hic", "tenetur", "a", "sapiente", "delectus", "ut", "aut", "reiciendis", "voluptatibus", "maiores", "alias", "consequatur", "aut", "perferendis", "doloribus", "asperiores", "repellat"];

const utils = {
  random: random,
  randomInt: randomInt,
  randomItem: randomItem,
  randomWords: randomWords,
  guid: guid
};

export { utils };
