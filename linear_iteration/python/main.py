import matplotlib.pyplot as plt
import sys


def main():
    print("\niterating linear functions")
    print("input linear function in the form of y = ax + b")

    a = float(sys.argv[1] if len(sys.argv) > 1 else input("a = "))
    b = float(sys.argv[2] if len(sys.argv) > 2 else input("b = "))
    seed = float(sys.argv[3] if len(sys.argv) > 3 else input("seed = "))
    iterations = int(sys.argv[4] if len(sys.argv) > 4 else input("iterations = "))

    print(f"\nfunction f(x) = {a}x + {b}")
    print(f"seed: {seed}, iterations: {iterations}\n")

    orbit = iterate(a, b, seed, iterations)
    print(f"orbit: {orbit}\n")
    graph(orbit)


def iterate(a: float, b: float, seed: float, iterations: int) -> list[float]:
    def f(x: float) -> float:
        return a * x + b
    
    n = f(seed)
    orbit = [n]

    for _ in range(iterations):
        n = f(n)
        orbit.append(n)
    
    return orbit


def graph(orbit: list[float]):
    plt.plot([i for i, _ in enumerate(orbit)], orbit)
    plt.show()


if __name__ == "__main__":
    main()
