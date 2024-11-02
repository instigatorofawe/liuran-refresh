import { expect, test } from 'vitest'
import { load_matchups, load_equities } from '$lib/pkg/wasm_modules'

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
    let equities = load_matchups()
    expect(equities.length == 169 * 169)

    // Symmetric matrix
    for (let i = 0; i < 169; i++) {
        for (let j = 0; j < 169; j++) {
            expect(equities[i * 169 + j] == 1 - equities[j * 169 + i])
        }
    }
})
