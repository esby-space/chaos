import matplotlib.pyplot as plt

INTERVAL = (0.0, 4)
INCREMENT = 0.01
ITERATIONS = 100
INITIAL_X = 0.5
POINTS_PER_R = 10


def main():
    r = INTERVAL[0]
    fates: list[list[float]] = []

    while r < INTERVAL[1]:
        fate = orbit_fate(r)
        fates.append(fate)
        r += INCREMENT

    graph(fates)


def orbit_fate(r: float) -> list[float]:
    def f(x: float) -> float:
        return r * x * (1 - x)

    n = f(INITIAL_X)
    orbit = [n]

    for i in range(ITERATIONS):
        n = f(n)
        orbit.append(n)

    return orbit[-POINTS_PER_R:]


def graph(fates: list[list[float]]):
    x = []
    r = INTERVAL[0]
    while r < INTERVAL[1]:
        x += [r] * POINTS_PER_R
        r += INCREMENT

    y = [point for points in fates for point in points]

    plt.scatter(x, y, )
    plt.show()


if __name__ == '__main__':
    main()
