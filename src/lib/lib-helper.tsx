/* eslint-disable @typescript-eslint/no-explicit-any */
export const strSplit = (str: string, splitLength: number): string[] => {
  if (splitLength < 1) return [];
  str = str || '';
  const chunks: string[] = [];
  let pos = 0;
  while (pos < str.length) {
    chunks.push(str.slice(pos, (pos += splitLength)));
  }
  return chunks;
};

export const strRev = (str: string): string => {
  return str.split('').reverse().join('');
};

export const strAtoB = (str: string, length: number): string => {
  return strSplit(strRev(str), length).map(strRev).join('');
};

export const strBtoA = (str: string, length: number): string => {
  return strRev(strSplit(str, length).map(strRev).join(''));
};

export const adrEnc = (kalimat: string): string => {
  let k = kalimat;
  k = strAtoB(k, 7);
  k = strAtoB(k, 5);
  k = strAtoB(k, 3);

  const myArray = [3, 4, 5, 6, 7, 8, 9];
  const j = myArray[Math.floor(Math.random() * myArray.length)];

  const kata = strSplit(k, j);
  const encodedChunks = kata.map((element) => {
    let b = btoa(element);
    b = strAtoB(b, 3);
    b = strAtoB(b, 2);
    return b;
  });

  return encodedChunks.map((chunk) => `Data=${encodeURIComponent(chunk)}`).join('&');
};

export const adrEncFe = (kalimat: string): string => {
  let k = kalimat;
  k = strAtoB(k, 6);
  k = strAtoB(k, 4);
  k = strAtoB(k, 2);

  const myArray = [3, 4, 5, 6, 7, 8, 9];
  const j = myArray[Math.floor(Math.random() * myArray.length)];

  const kata = strSplit(k, j);
  const encodedChunks = kata.map((element) => {
    let b = btoa(element);
    b = strAtoB(b, 3);
    b = strAtoB(b, 2);
    return b;
  });

  return encodedChunks.map((chunk) => `Data=${encodeURIComponent(chunk)}`).join('&');
};

export const adrDec = (arr: string[]): any => {
  let decryptedChunks;

  try {
    decryptedChunks = arr.map((chunk) => {
      let b = strBtoA(chunk, 2);
      b = strBtoA(b, 3);
      const decodedBytes = atob(b);
      return decodeURIComponent(escape(decodedBytes));
    });
  } catch (e: unknown) {
    // console.error("Decryption error: ", e);
    return null;
  }

  let result = decryptedChunks.join('');
  result = strBtoA(result, 2);
  result = strBtoA(result, 4);
  result = strBtoA(result, 6);

  let decodeData;
  try {
    decodeData = JSON.parse(result);
  } catch (e) {
    console.error('JSON parsing error: ', e);
    return { data: 'Parsing Error' };
  }

  if (Array.isArray(decodeData)) {
    return { data: decodeData };
  }

  if (typeof decodeData === 'string' || decodeData == null) {
    return { data: 'Invalid Data' };
  }

  return decodeData;
};
