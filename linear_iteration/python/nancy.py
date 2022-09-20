# credit to Nancy Chen

slope = input(
    "What is the slope of your linear function? (That is, the value m in the function mx+b): "
)
operator = input("What is the operator you want to use?: ")
intercept = input(
    "What is the intercept of your linear function? That is, the value b in the function mx+b): "
)
seed = input("What is your seed?: ")
orbit = input("What is your orbit?: ")
if operator == "+":
    answer = (
        (float(slope) ** float(orbit)) * (float(seed))
        + float(intercept)
        - (float(slope) ** (float(orbit) + 1)) * (float(seed))
    )
    print(answer)
if operator == "-":
    answer = (
        (float(slope) ** float(orbit)) * (float(seed))
        - float(intercept)
        - (float(slope) ** (float(orbit) + 1)) * (float(seed))
    )
    print(answer)
else:
    print('Error: operator must be "+" or "-"')
