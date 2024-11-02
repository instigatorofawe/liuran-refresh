import { expect, test } from 'vitest'
import { load_matchups, load_equities, solve_push_fold } from '$lib/pkg/wasm_modules'

test("Load matchups", () => {
    let matchups = load_matchups()
    expect(matchups.length == 169 * 169)

    let sum = matchups.reduce((sum, current) => sum + current, 0)
    expect(sum == 52 * 51 * 50 * 49 / 4)

    // 22 vs 22
    expect(matchups[0] == 6)
    // 22 vs 33
    expect(matchups[14] == 36)
    // 22 vs AA
    expect(matchups[168] == 36)
    // 33 vs 33
    expect(matchups[14 * 169 + 14] == 6)
})

test("Load equities", () => {
    let equities = load_equities()
    expect(equities.length == 169 * 169)

    // Symmetric matrix
    for (let i = 0; i < 169; i++) {
        for (let j = 0; j < 169; j++) {
            expect(equities[i * 169 + j] == 1 - equities[j * 169 + i])
        }
    }
})

test("Solve push fold", () => {
    let solution = solve_push_fold(5, 0.5, .125, 100);

    let strategy_bu = 0;
    let strategy_bb = 0;
    for (let index = 0; index < 169; index++) {
        let i = Math.floor(index / 13);
        let j = index % 13;

        let combos;
        if (i == j) {
            combos = 6;
        } else if (i < j) {
            combos = 4;
        } else {
            combos = 12;
        }

        strategy_bu += solution[index] * combos / 1326;
        strategy_bb += solution[index + 169] * combos / 1326;
    }

    console.log(`BU: ${strategy_bu}`);
    console.log(`BB: ${strategy_bb}`);
})
