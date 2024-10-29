import { expect, test } from 'vitest'
import { Tile, Board, SolutionTable } from '$lib/tictactoe'

test("Board initialization", () => {
    let x = new Board()
    for (let t of x.tiles) {
        expect(t).toEqual(Tile.Empty)
    }
    expect(x.tiles.length).toEqual(9)
})

test("Tile hashing", () => {
    expect(Board.hash_tile(Tile.Empty)).toEqual(0)
    expect(Board.hash_tile(Tile.X)).toEqual(1)
    expect(Board.hash_tile(Tile.O)).toEqual(2)
})

test("Board hashing", () => {
    expect(new Board().hash()).toEqual(0)
    expect(new Board([Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).hash()).toEqual(1)
    expect(new Board([Tile.O, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).hash()).toEqual(2)
    expect(new Board([Tile.Empty, Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).hash()).toEqual(3)
    expect(new Board([Tile.X, Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).hash()).toEqual(4)
    expect(new Board([Tile.O, Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).hash()).toEqual(5)
})

test("Board invariant hashing", () => {
    let x = new Board([Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty])
    let y = new Board([Tile.Empty, Tile.Empty, Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty])
    let z = new Board([Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.X])
    let v = new Board([Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.X, Tile.Empty, Tile.Empty])

    expect(x.invariant_hash()).toEqual(1)
    expect(x.invariant_hash()).toEqual(y.invariant_hash())
    expect(y.invariant_hash()).toEqual(z.invariant_hash())
    expect(z.invariant_hash()).toEqual(v.invariant_hash())

})

test("Board recovery from hash", () => {
    let boards = [
        new Board(),
        new Board([Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]),
        new Board([Tile.O, Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]),
        new Board([Tile.Empty, Tile.X, Tile.X, Tile.O, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]),
        new Board([Tile.O, Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.X])
    ]

    for (let x of boards) {
        let y = Board.from_hash(x.hash())
        expect(x).toEqual(y)
    }

})

test("Evaluate turn", () => {
    expect(new Board([Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).turn()).toEqual(Tile.O)
    expect(new Board([Tile.X, Tile.O, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).turn()).toEqual(Tile.X)
    expect(new Board([Tile.X, Tile.O, Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).turn()).toEqual(Tile.O)
})

test("Evaluate winner", () => {
    expect(new Board([Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).winner()).toEqual(Tile.Empty)
    expect(new Board([Tile.X, Tile.X, Tile.X, Tile.O, Tile.O, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).winner()).toEqual(Tile.X)
})

test("Empty tiles", () => {
    expect(new Board([Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).empty()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expect(new Board([Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).empty()).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    expect(new Board([Tile.X, Tile.O, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]).empty()).toEqual([2, 3, 4, 5, 6, 7, 8])
})

test("Apply action", () => {
    let x = new Board()
    let y = x.act(0)
    let z = y.act(1)

    expect(y).toEqual(new Board([Tile.X, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]))
    expect(z).toEqual(new Board([Tile.X, Tile.O, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty, Tile.Empty]))
})

test("Solve", () => {
    let x = SolutionTable.getInstance()
    expect(Object.keys(x.valueTable).length).toEqual(765)
    expect(x.solve(new Board())).toEqual(0)
    expect(x.solve(new Board().act(0))).toEqual(4)
})
