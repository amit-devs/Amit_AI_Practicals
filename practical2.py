from collections import deque
print("Amit")
def water_jug(a, b, target):
    visited = set()
    queue = deque()
    queue.append((0, 0))

    while queue:
        x, y = queue.popleft()

        if (x, y) in visited:
            continue

        visited.add((x, y))
        print(f"Jug A: {x}, Jug B: {y}")

        if x == target or y == target:
            print("Target reached!")
            return

        states = [
            (a, y),
            (x, b),
            (0, y),
            (x, 0),
            (x - min(x, b - y), y + min(x, b - y)),
            (x + min(y, a - x), y - min(y, a - x))
        ]

        for state in states:
            if state not in visited:
                queue.append(state)

    print("Target cannot be reached.")

a = int(input("Enter capacity of Jug A: "))
b = int(input("Enter capacity of Jug B: "))
target = int(input("Enter target amount: "))


water_jug(a, b, target)
