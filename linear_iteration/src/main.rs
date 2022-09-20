use std::io::{stdin, stdout, Write};
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    println!("iterating linear functions\n");
    println!("input linear function in the form of y = ax + b");

    let a: f32 = input("a = ").parse()?;
    let b: f32 = input("b = ").parse()?;
    let seed: f32 = input("seed = ").parse()?;

    println!("\nfunction: f(x) = {a}x + {b}");
    println!("seed: {seed}\n");

    let iterations: i32 = input("iterations = ").parse()?;
    let f = |x: f32| a * x + b;

    let mut n = f(seed);

    println!("0: {n}");
    for i in 0..iterations {
        n = f(n);
        println!("{}: {n}", i + 1);
    }

    Ok(())
}

fn input(message: &str) -> String {
    print!("{message}"); 
    let mut input = String::new();

    stdout().flush().expect("failed to flush stdout x_x");
    stdin().read_line(&mut input).expect("failed to read line x_x");

    input.pop();
    input
}

