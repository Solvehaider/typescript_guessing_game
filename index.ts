// import inquirer from "inquirer";
import inquirer from "inquirer";


let again = false;
var Goldnumber: number = 0;
const goldennumberselecter = (): number => {
  const min: number = 0;
  const max: number = 50;

  //    minimum and maximum number are included
  return Math.floor(Math.random() * (max - min + 1) + min);

};

function wellcome() {
  console.log("Wellcome to Number Guessing Game");
  Goldnumber = goldennumberselecter();
//   console.log("Golden number ", Goldnumber);
}

type Choice = { guess: number };


const checkanswer = (answer: number): boolean => {
  if (answer === Goldnumber) {
    console.log(`CONGRATS You Guessed the NUmber Right \n
         Your Guess ${answer} : Correct Answer ${Goldnumber} `);
    return true;
  } else if (answer < Goldnumber) {
    console.log("The Golden NUmber is Greater then yours TRY AGAIN");
    return false;
  } else {
    console.log("The Golden NUmber is lesser then yours TRY AGAIN");
    return false;
  }
};


const guessingNumberGame = async (): Promise<boolean> => {
  const choice: Choice = await inquirer.prompt([
    {
      name: "guess",
      message: "Enter your guess: ",
      type: "input",
      validate: function (number) {
        if (number < 0 || number > 50 || isNaN(number)) {
          return "PLease Enter a number in Range of 0 to 50";
        } else {
          return true;
        }
      },
    },
  ]);

  let playerguess: number = Number(choice.guess);

  let ans: boolean = checkanswer(playerguess);
  //   console.log("our number ", choice.guess);
  return ans;
};

const playagain = async (): Promise<boolean> => {
  const { confirm } = await inquirer.prompt([
    {
      name: "confirm",
      message: "You want to play Again",
      type: "confirm",
    },
  ]);
  again = confirm;
  console.log("\n\n");

  return again;
};

// main starts here

do {
  again = false;
  wellcome();

  console.log("Total Three Try Available at each play ");
  for (let i = 1; i <= 3; i++) {
    console.log(`No ${i} Try `);
    if (await guessingNumberGame()) {
      break;
    } else {
      continue;
    }
  }
  console.log("\nGolden number ", Goldnumber);

  console.log("Game Over");
} while (await playagain());
