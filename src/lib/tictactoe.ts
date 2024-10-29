export enum Tile {
    Empty = " ",
    X = "X",
    O = "O"
}

export class Board {
    public tiles: Tile[]

    public constructor(tiles: Tile[] = Array(9).fill(Tile.Empty)) {
        this.tiles = tiles
    }

    public static from_hash(hash: number): Board {
        let result = new Board()

        for (let i = 0; i < 9; i++) {
            result.tiles[i] = Board.tile_from_hash(hash % 3)
            hash = Math.floor(hash / 3)

        }

        return result

    }

    public static hash_tile(tile: Tile) {
        switch (tile) {
            case Tile.Empty:
                return 0
            case Tile.X:
                return 1
            case Tile.O:
                return 2
        }
    }

    public static tile_from_hash(hash: number): Tile {
        switch (hash) {
            case 0:
                return Tile.Empty
            case 1:
                return Tile.X
            case 2:
                return Tile.O
        }

        return Tile.Empty
    }

    public hash(): number {
        let result = 0

        for (let i = 0; i < 9; i++) {
            result += Board.hash_tile(this.tiles[i]) * Math.pow(3, i)
        }

        return result
    }

    public invariant_hash(): number {
        const configurations = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8], // Rotations
            [2, 5, 8, 1, 4, 7, 0, 3, 6],
            [8, 7, 6, 5, 4, 3, 2, 1, 0],
            [6, 3, 0, 7, 4, 1, 8, 5, 2],
            [6, 7, 8, 3, 4, 5, 0, 1, 2], // Reflections
            [2, 1, 0, 5, 4, 3, 8, 7, 6],
            [8, 5, 2, 7, 4, 1, 6, 3, 0],
            [0, 3, 6, 1, 4, 7, 2, 5, 8]
        ]

        let hashes: number[] = []

        for (const configuration of configurations) {
            let result = 0;
            for (let i = 0; i < 9; i++) {
                result += Board.hash_tile(this.tiles[configuration[i]]) * Math.pow(3, i)
            }
            hashes.push(result);
        }

        return Math.min(...hashes);
    }

    public empty(): number[] {
        let result: number[] = []

        for (let i = 0; i < 9; i++) {
            if (this.tiles[i] == Tile.Empty) {
                result.push(i)
            }
        }

        return result
    }

    public winner(): Tile {
        if (this.empty().length > 5) {
            return Tile.Empty
        }

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let line of lines) {
            if (this.tiles[line[0]] == this.tiles[line[1]] &&
                this.tiles[line[1]] == this.tiles[line[2]] &&
                this.tiles[line[0]] != Tile.Empty) {
                return this.tiles[line[0]]
            }
        }

        return Tile.Empty;
    }

    public turn(): Tile {
        if (this.empty().length % 2 == 0) {
            return Tile.O
        } else {
            return Tile.X
        }
    }

    public act(index: number): Board {
        let tiles = [...this.tiles]
        tiles[index] = this.turn()
        return new Board(tiles)
    }

    public equals(obj: Board): boolean {
        for (let i = 0; i < 9; i++) {
            if (this.tiles[i] != obj.tiles[i]) {
                return false
            }
        }
        return true
    }

}

export class SolutionTable {
    static instance: SolutionTable
    valueTable: Record<number, number>

    private constructor() {
        this.valueTable = {}
    }

    public static getInstance(): SolutionTable {
        if (!SolutionTable.instance) {
            SolutionTable.instance = new SolutionTable()
            SolutionTable.instance.evaluateRecursive(new Board())
        }

        return SolutionTable.instance
    }

    public evaluateRecursive(board: Board): number {
        let hash = board.invariant_hash()

        if (hash in this.valueTable) {
            return this.valueTable[hash]
        }

        switch (board.winner()) {
            case Tile.X:
                this.valueTable[hash] = 1
                return 1
            case Tile.O:
                this.valueTable[hash] = -1
                return -1
            case Tile.Empty:
                if (board.empty().length == 0) {
                    this.valueTable[hash] = 0
                    return 0
                }
        }

        // Otherwise, evaluate children
        let childValues: number[] = []
        for (let x of board.empty()) {
            childValues.push(this.evaluateRecursive(board.act(x)))
        }

        if (board.turn() == Tile.X) {
            let result = Math.max(...childValues)
            this.valueTable[hash] = result
            return result
        } else {
            let result = Math.min(...childValues)
            this.valueTable[hash] = result
            return result
        }
    }

    public solve(board: Board): number {
        let candidates = board.empty()
        let value = this.evaluateRecursive(board)

        for (let candidate of candidates) {
            if (value == this.evaluateRecursive(board.act(candidate))) {
                return candidate
            }
        }
        return -1

    }

}
