def generate_magic_square(n):
    # Initialize a grid filled with zeros
    magic_square = [[0 for _ in range(n)] for _ in range(n)]

    # Starting position: middle of the first row
    i, j = 0, n // 2
    num = 1

    while num <= n * n:
        magic_square[i][j] = num
        num += 1
        # Try moving up one row and right one column
        new_i, new_j = (i - 1) % n, (j + 1) % n
        
        # If the cell is already filled, move down one row instead
        if magic_square[new_i][new_j]:
            i = (i + 1) % n
        else:
            i, j = new_i, new_j

    return magic_square

# Test with n=3
n = 3
square = generate_magic_square(n)
for row in square:
    print(row)
