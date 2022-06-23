const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelectorAll('#solution')
const squares = 81
const submission = []

for (let i =0; i<squares; i++){
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    puzzleBoard.appendChild(inputElement)

}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
        submission.push('.')
        }
    })
    console.log(submission)
} //join all the sudoku values into a straight line

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach((input,i) => {
            input.value = solution[i]
        })
        solutionDisplay.innerHTML = "THis is the answer0, LESS GO"
    }else{
        solutionDisplay.innerHTML = "This is not solvable"
    }
} 

const solve = () => {//api here
    joinValues()
    const data = submission.join('')
    console.log('data', data)
    const options = {
    method: 'POST',
    url: 'https://solve-sudoku.p.rapidapi.com/',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
    },
    data: {
        puzzle: data 
    }
};

axios.request(options).then((response) => {
	console.log(response.data);
    populateValues(response.data.solvable, response.data.solution);
}).catch((error) => {
	console.error(error);
});
}

solveButton.addEventListener('click', solve)