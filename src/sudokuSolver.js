//checks if input board is valid or not
function isInitialBoardValid(matrix) {
    for (let i = 0; i < 81; i++) {
        const val = matrix[i];
        if (!val || val === "0") continue;
        const row = Math.floor(i / 9);
        const col = i % 9;
        // Temporarily remove the value to check for duplicates
        matrix[i] = null;
        for (let j = 0; j < 9; j++) {
            if (matrix[row * 9 + j] === val) return false; // Row
            if (matrix[j * 9 + col] === val) return false; // Col
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(j / 3);
            const boxCol = 3 * Math.floor(col / 3) + (j % 3);
            if (matrix[boxRow * 9 + boxCol] === val) return false;
        }
        matrix[i] = val;
    }
    return true;
}
export function solveSudoku(matrix) {
    // Helper to check if placing num at (row, col) is valid
    function isValid(matrix, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (matrix[row * 9 + i] === num) return false; // Row
            if (matrix[i * 9 + col] === num) return false; // Col
            // 3x3 box
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (matrix[boxRow * 9 + boxCol] === num) return false;
        }
        return true;
    }

    // Recursive backtracking solver
    function solve(matrix) {
        for (let i = 0; i < 81; i++) {
            if (!matrix[i] || matrix[i] === "0") {
                const row = Math.floor(i / 9);
                const col = i % 9;
                for (let n = 1; n <= 9; n++) {
                    const num = n.toString();
                    if (isValid(matrix, row, col, num)) {
                        matrix[i] = num;
                        if (solve(matrix)) return true;
                        matrix[i] = null;
                    }
                }
                return false; // No valid number found
            }
        }
        return true; // Solved
    }
    if (!isInitialBoardValid(matrix)) {
        return null; // Unsolvable due to invalid input
    }
    if (solve(matrix)) {
        return matrix;
    } else {
        return null; // Unsolvable
    }
}