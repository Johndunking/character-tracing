const letterContainer = document.getElementById('letter-container');
const trace = document.getElementById('trace');
const letterDisplay = document.getElementById('letter');
const refreshButton = document.getElementById('refreshButton');

refreshButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Replace 'index.html' with your homepage URL
});

const characters = {
    'uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'lowercase': 'abcdefghijklmnopqrstuvwxyz',
    'numbers': [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
        '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
        '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'
    ]
};

let currentIndex = 0;
let isPointerPressed = false;
const characterType = new URLSearchParams(window.location.search).get('type');

function speakCharacter() {
    const currentCharacter = characters[characterType][currentIndex];
    const utterance = new SpeechSynthesisUtterance(currentCharacter);
    window.speechSynthesis.speak(utterance);
}

function updateCharacter() {
    const currentCharacter = characters[characterType][currentIndex];
    letterDisplay.textContent = currentCharacter;
    trace.innerHTML = ''; // Clear any existing tracing
}

function nextCharacter() {
    if (currentIndex < characters[characterType].length - 1) {
        currentIndex++;
        updateCharacter();
        speakCharacter();
    }
}

letterContainer.addEventListener('mousedown', () => {
    isPointerPressed = true;
});

letterContainer.addEventListener('mouseup', () => {
    isPointerPressed = false;
    nextCharacter();
});

document.addEventListener('mousemove', (e) => {
    if (isPointerPressed) {
        handleMove(e.clientX, e.clientY);
    }
});


// Touch events
letterContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isPointerPressed = true;
    trace.style.opacity = 1;
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
});

letterContainer.addEventListener('touchend', () => {
    isPointerPressed = false;
    nextCharacter();
});

letterContainer.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
});
function handleMove(x, y) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    trace.appendChild(dot);

    const traceRect = trace.getBoundingClientRect();
    dot.style.left = `${x - traceRect.left}px`;
    dot.style.top = `${y - traceRect.top}px`;
}




// Initial setup
// Choose the character type: 'uppercase', 'lowercase', or 'numbers'
updateCharacter();
speakCharacter(); // Speak the first character initially



