document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    let totalKeystrokes = 0;
    let correctKeystrokes = 0;
    let errors = 0;
    let startTime = null;
    let timerInterval = null;
    let designIndex = 0;
    const keyboardDesigns = ["style-1", "style-2", "style-3", "style-4", "style-5"];

    const textToTypeElement = document.getElementById("text-to-type");
    const currentKeyElement = document.getElementById("current-key");
    const speedElement = document.getElementById("speed");
    const accuracyElement = document.getElementById("accuracy");
    const scoreElement = document.getElementById("score");

    // Sample Sentences (3-4 Lines)
    const texts = [
        "the quick brown fox jumps over the lazy dog near the river. learning to type faster can be a great skill for everyone.",
        "a strong typing skill is needed for many professional jobs. good habits build strong character and success in life.",
        "the world is a beautiful place with many wonders. visiting new places opens up new possibilities.",
        "eating nutritious food and exercising daily keeps the body strong. the sun rises in the east and sets in the west.",
        "reading books expands the mind and improves knowledge. writing stories and poetry is a great way to express oneself.",
        "education is the key to a successful life. the world is a stage and we are all actors.",
        "the pen is mightier than the sword. learning to read and write is a powerful skill.",
        "thinking positively can achieve great things. the best way to learn is by doing.",
        "patience is a virtue and helps build character. taking the time to practice is important.",
        "every day is a new opportunity. the first step to success is to start.",
        "the world is a big place with many things to learn. exploring new things is a great adventure.",
        "enjoy the journey and you will reach your destination. the best way to learn is to find a buddy.",
        "the best way to get better is to practice with a purpose. setting goals helps you reach them.",
        "the best way to learn is to practice with a friend.",
        "having someone to hold you accountable helps you stay on track. the best way to get better is to practice with a mentor.",
        "the best way to learn is to practice with a schedule. setting a schedule helps you stay on track.",
        "having a plan helps you reach your goal. the journey is as important as the destination."
    ];

    

    let currentText = "";

    function initializeText() {
        currentText = texts[Math.floor(Math.random() * texts.length)];
        textToTypeElement.innerHTML = "";
        currentIndex = 0;

        currentText.split("").forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.dataset.index = index;
            if (index === 0) span.classList.add("current");
            textToTypeElement.appendChild(span);
        });

        updateCurrentKeyDisplay();
        resetMetrics();
    }

    function handleKeyPress(event) {
        if (!startTime) {
            startTime = new Date();
            timerInterval = setInterval(updateMetrics, 1000);
        }
    
        const key = event.key;
        const isShiftPressed = event.shiftKey;
        const isCapsLockOn = event.getModifierState("CapsLock");
    
        const currentChar = currentText[currentIndex];
    
        highlightPressedKey(key.toLowerCase());
    
        // Ignore Shift key press alone
        if (key === "Shift") {
            return; 
        }
    
        totalKeystrokes++;
    
        let expectedKey = currentChar;
    
        // Handle uppercase letters
        if (expectedKey.match(/[A-Z]/)) { // If expected key is an uppercase letter
            if (isShiftPressed || isCapsLockOn) {
                expectedKey = expectedKey.toLowerCase(); // Allow typing it as lowercase if Shift/Caps is used
            }
        }
    
        if (key.toLowerCase() === expectedKey.toLowerCase()) {
            correctKeystrokes++;
    
            textToTypeElement.children[currentIndex].classList.add("typed");
            textToTypeElement.children[currentIndex].classList.remove("current");
    
            currentIndex++;
    
            if (currentIndex < currentText.length) {
                textToTypeElement.children[currentIndex].classList.add("current");
                updateCurrentKeyDisplay();
            } else {
                completeTyping();
            }
        } else {
            errors++;
            textToTypeElement.children[currentIndex].classList.add("error");
        }
    
        updateMetrics();
    }
    

    function updateCurrentKeyDisplay() {
        const currentChar = currentText[currentIndex] || "";
        currentKeyElement.textContent = currentChar === " " ? "Space" : currentChar.toUpperCase();
    }

    function resetMetrics() {
        totalKeystrokes = 0;
        correctKeystrokes = 0;
        errors = 0;
        startTime = null;
        clearInterval(timerInterval);
        updateMetrics();
    }

    function updateMetrics() {
        const elapsedTime = startTime ? (new Date() - startTime) / 60000 : 0;
        const wpm = elapsedTime > 0 ? Math.round((correctKeystrokes / 5) / elapsedTime) : 0;
        const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;
        const score = Math.max(correctKeystrokes - errors, 0);

        speedElement.textContent = `${wpm} WPM`;
        accuracyElement.textContent = `${accuracy}%`;
        scoreElement.textContent = `${score}`;
    }

    function handleKeyPress(event) {
        if (!startTime) {
            startTime = new Date();
            timerInterval = setInterval(updateMetrics, 1000);
        }

        const key = event.key;
        const currentChar = currentText[currentIndex];

        highlightPressedKey(key.toLowerCase());

        totalKeystrokes++;

        if (key === currentChar) {
            correctKeystrokes++;

            textToTypeElement.children[currentIndex].classList.add("typed");
            textToTypeElement.children[currentIndex].classList.remove("current");

            currentIndex++;

            if (currentIndex < currentText.length) {
                textToTypeElement.children[currentIndex].classList.add("current");
                updateCurrentKeyDisplay();
            } else {
                completeTyping();
            }
        } else {
            errors++;
            textToTypeElement.children[currentIndex].classList.add("error");
        }

        updateMetrics();
    }

    function completeTyping() {
        clearInterval(timerInterval);
        setTimeout(initializeText, 1000);
    }

    function initializeKeyboard() {
        const keyboardLayout = [
            ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",  ],
            ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",  ],
            ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L",";" ],
            ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".","/"],
            
        ];

        const keyboardElement = document.getElementById("keyboard");
        keyboardElement.innerHTML = "";

        keyboardLayout.forEach(row => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "keyboard-row";

            row.forEach(key => {
                const keyDiv = document.createElement("div");
                keyDiv.className = "keyboard-key";
                keyDiv.textContent = key;
                keyDiv.dataset.key = key.toLowerCase();

                rowDiv.appendChild(keyDiv);
            });

            keyboardElement.appendChild(rowDiv);
        });
    }

    function highlightPressedKey(key) {
        const keyElement = document.querySelector(`.keyboard-key[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.add("active");
            setTimeout(() => keyElement.classList.remove("active"), 200);
        }
    }

    document.getElementById("change-design-btn").addEventListener("click", function () {
        const keyboard = document.getElementById("keyboard");
        keyboard.classList.remove(...keyboardDesigns);
        designIndex = (designIndex + 1) % keyboardDesigns.length;
        keyboard.classList.add(keyboardDesigns[designIndex]);
    });

    document.addEventListener("keydown", handleKeyPress);

    initializeText();
    initializeKeyboard();
});


document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.getElementById("navbar");

    // Toggle Menu
    menuIcon.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
            navbar.classList.remove("active");
        }
    });
});




