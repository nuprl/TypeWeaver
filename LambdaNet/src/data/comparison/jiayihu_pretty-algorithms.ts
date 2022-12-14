// All: 19+9 JSNice: 8+5 LambdaNet: 8+7

import baseRange from 'lodash/range';

function fill<T>(array: T[], valueFn: (index: number) => any): T[] {
    for (let i = 0; i < array.length; i++) array[i] = valueFn(i);

    return array;
}

function range(from: number, to: number): number[] {
    return baseRange(from, to + 1);
}
/**
 * The longest common subsequence (LCS) problem is the problem of finding the
 * longest subsequence common to two sequences.
 *
 * It differs from problems of finding common substrings since subsequences are
 * not required to occupy consecutive positions within the original sequences.
 *
 * The solution uses dynamic-programming.
 * @url https://en.wikipedia.org/wiki/Dynamic_programming
 */

/**
 * Return the table of common subsequences lengths. See the snapshot in
 * `__snapshots` to have a visual rappresentation.
 * Time complexity: O(seqA.length * seqB.length)
 * @param seqA First sequence
 * @param seqB Second sequence
 */
function lcsLengths(seqA: string, seqB: string): number[][] {
    const lengthA = seqA.length;
    const lengthB = seqB.length;

    const lengths: number[][] = new Array(lengthA + 1);
    fill(lengths, () => new Array(lengthB + 1));

    range(0, lengthA).forEach(i => (lengths[i][0] = 0));
    range(0, lengthB).forEach(i => (lengths[0][i] = 0));

    range(0, lengthA - 1).forEach(indexA => {
        range(0, lengthB - 1).forEach(indexB => {
            const charA = seqA[indexA];
            const charB = seqB[indexB];

            if (charA === charB) {
                lengths[indexA + 1][indexB + 1] = lengths[indexA][indexB] + 1;
            } else {
                const subSeqALength = lengths[indexA][indexB + 1];
                const subSeqBLength = lengths[indexA + 1][indexB];
                lengths[indexA + 1][indexB + 1] = Math.max(subSeqALength, subSeqBLength);
            }
        });
    });

    return lengths;
}

/**
 * Return the LCS of two sequences using the table of lengths
 * Time complexity: O(seqA.length + seqB.length)
 * @param lengths The table of common subsequences lengths returned by `lcsLengths`
 * @param seqA First sequence
 * @param seqB Second sequence
 * @param indexA seqA index in the reverse LCS walk
 * @param indexB seqB index in the reverse LCS walk
 */
function walkLCS(
    lengths: number[][],
    seqA: string,
    seqB: string,
    indexA: number,
    indexB: number
): string {
    if (indexA === 0 || indexB === 0) return '';

    if (seqA[indexA - 1] === seqB[indexB - 1]) {
        const subLCS = walkLCS(lengths, seqA, seqB, indexA - 1, indexB - 1);
        return subLCS + seqA[indexA - 1];
    } else if (lengths[indexA - 1][indexB] >= lengths[indexA][indexB - 1]) {
        return walkLCS(lengths, seqA, seqB, indexA - 1, indexB);
    } else {
        return walkLCS(lengths, seqA, seqB, indexA, indexB - 1);
    }
}

/**
 * Return the longest common subsequence (LCS)
 * Time complexity: O(seqA.length * seqB.length)
 * @param seqA First sequence
 * @param seqB Second sequence
 */
function findLCS(seqA: string, seqB: string): string {
    const lengths = lcsLengths(seqA, seqB);
    const lcs = walkLCS(lengths, seqA, seqB, seqA.length, seqB.length);

    return lcs;
}
//=======
import head from 'lodash/head';

function merge(input: number[], start: number, mid: number, end: number): number {
    const left = input.slice(start, mid);
    const right = input.slice(mid, end);

    left[left.length] = -Infinity;
    right[right.length] = -Infinity;

    let inversionCount = 0;

    range(start, end - 1).forEach(index => {
        if (head(left) > head(right)) {
            inversionCount += right.length - 1; // Do not include Infinity in the count
            input[index] = left.shift();
        } else {
            input[index] = right.shift();
        }
    });

    return inversionCount;
}

function countInversions(
    input: number[],
    start: number = 0,
    end: number = input.length
): number {
    if (end - start <= 1) return 0;

    const mid = Math.floor((start + end) / 2);
    const leftCount = countInversions(input, start, mid);
    const rightCount = countInversions(input, mid, end);

    return leftCount + rightCount + merge(input, start, mid, end);
}
