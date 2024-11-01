use std::collections::HashSet;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_sudoku(mut board: Vec<String>) -> Option<Vec<String>> {
    let mut rows: Vec<HashSet<String>> = vec![(1..=9).map(|x| x.to_string()).collect(); 9];
    let mut cols: Vec<HashSet<String>> = vec![(1..=9).map(|x| x.to_string()).collect(); 9];
    let mut cells: Vec<HashSet<String>> = vec![(1..=9).map(|x| x.to_string()).collect(); 9];
    let mut empty: HashSet<usize> = HashSet::new();

    for (index, value) in board.iter().enumerate() {
        let row = index / 9;
        let col = index % 9;
        let cell = row / 3 * 3 + col / 3;

        match value.as_str() {
            "" => {
                empty.insert(index);
            }
            _ => {
                if !(rows[row].remove(value)
                    && cols[col].remove(value)
                    && cells[cell].remove(value))
                {
                    return None;
                }
            }
        }
    }

    while !empty.is_empty() {
        let mut candidate: Option<(usize, Vec<String>)> = None;
        let mut removed: bool = false;

        for index in empty.clone() {
            let row = index / 9;
            let col = index % 9;
            let cell = row / 3 * 3 + col / 3;

            let candidates: Vec<String> = (1..=9)
                .map(|x| x.to_string())
                .filter(|x| {
                    rows[row].contains(x) && cols[col].contains(x) && cells[cell].contains(x)
                })
                .collect();

            match candidates.len() {
                0 => return None,
                1 => {
                    rows[row].remove(candidates.first()?);
                    cols[col].remove(candidates.first()?);
                    cells[cell].remove(candidates.first()?);
                    empty.remove(&index);
                    board[index] = candidates.into_iter().next()?;
                    removed = true;
                }
                _ => {
                    if candidate.is_none()
                        || candidate
                            .as_ref()
                            .map(|(_, current_candidate)| current_candidate.len())
                            .unwrap()
                            > candidates.len()
                    {
                        candidate = Some((index, candidates));
                    }
                }
            };
        }

        if !removed {
            let (index, candidates) = candidate.unwrap();
            for candidate in candidates {
                let mut board_copy = board.clone();
                board_copy[index] = candidate;

                let result = solve_sudoku(board_copy);

                if result.is_some() {
                    return result;
                }
            }
            return None;
        }
    }

    Some(board)
}

#[cfg(test)]
mod tests {
    use std::string;

    use super::*;

    #[test]
    fn test_trivial() {
        let values: Vec<String> = (1..=9).map(|x| x.to_string()).collect();
        assert_eq!(values, vec!["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    }

    #[test]
    fn test_solve() {
        let board: Vec<String> = vec![
            "5", "3", "", "", "7", "", "", "", "", "6", "", "", "1", "9", "5", "", "", "", "", "9",
            "8", "", "", "", "", "6", "", "8", "", "", "", "6", "", "", "", "3", "4", "", "", "8",
            "", "3", "", "", "1", "7", "", "", "", "2", "", "", "", "6", "", "6", "", "", "", "",
            "2", "8", "", "", "", "", "4", "1", "9", "", "", "5", "", "", "", "", "8", "", "", "7",
            "9",
        ]
        .into_iter()
        .map(String::from)
        .collect();

        let result = solve_sudoku(board);

        assert_eq!(
            result,
            Some(
                vec![
                    "5", "3", "4", "6", "7", "8", "9", "1", "2", "6", "7", "2", "1", "9", "5", "3",
                    "4", "8", "1", "9", "8", "3", "4", "2", "5", "6", "7", "8", "5", "9", "7", "6",
                    "1", "4", "2", "3", "4", "2", "6", "8", "5", "3", "7", "9", "1", "7", "1", "3",
                    "9", "2", "4", "8", "5", "6", "9", "6", "1", "5", "3", "7", "2", "8", "4", "2",
                    "8", "7", "4", "1", "9", "6", "3", "5", "3", "4", "5", "2", "8", "6", "1", "7",
                    "9"
                ]
                .into_iter()
                .map(String::from)
                .collect()
            )
        );

        let board: Vec<String> = vec![
            "", "", "9", "7", "4", "8", "", "", "", "7", "", "", "", "", "", "", "", "", "", "2",
            "", "1", "", "9", "", "", "", "", "", "7", "", "", "", "2", "4", "", "", "6", "4", "",
            "1", "", "5", "9", "", "", "9", "8", "", "", "", "3", "", "", "", "", "", "8", "", "3",
            "", "2", "", "", "", "", "", "", "", "", "", "6", "", "", "", "2", "7", "5", "9", "",
            "",
        ]
        .into_iter()
        .map(String::from)
        .collect();

        let result = solve_sudoku(board);

        assert_eq!(
            result,
            Some(
                vec![
                    "5", "1", "9", "7", "4", "8", "6", "3", "2", "7", "8", "3", "6", "5", "2", "4",
                    "1", "9", "4", "2", "6", "1", "3", "9", "8", "7", "5", "3", "5", "7", "9", "8",
                    "6", "2", "4", "1", "2", "6", "4", "3", "1", "7", "5", "9", "8", "1", "9", "8",
                    "5", "2", "4", "3", "6", "7", "9", "7", "5", "8", "6", "3", "1", "2", "4", "8",
                    "3", "2", "4", "9", "1", "7", "5", "6", "6", "4", "1", "2", "7", "5", "9", "8",
                    "3"
                ]
                .into_iter()
                .map(String::from)
                .collect()
            )
        );
    }

    #[test]
    fn test_solve_empty() {
        let board: Vec<String> = (0..81).into_iter().map(|_| String::from("")).collect();
        let result = solve_sudoku(board.clone());
        assert!(result.is_some());
    }
}
