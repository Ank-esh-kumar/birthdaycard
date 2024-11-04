// Function to create and display balloons
function createBalloons() {
    const balloonContainer = document.createElement("div");
    document.body.appendChild(balloonContainer);

    // List of balloon image URLs
    const balloonImages = [
        "https://pics.clipartpng.com/midle/Red_Balloon_PNG_Clip_Art-1549.png",
        "https://pics.clipartpng.com/midle/Dark_Blue_Balloon_PNG_Clip_Art-1548.png"
    ];

    const balloons = []; // Store balloons for later animation

    for (let i = 0; i < 30; i++) {
        const balloon = document.createElement("img");
        balloon.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];
        balloon.classList.add("balloon");

        // Randomize the left position and initial bottom position
        balloon.style.left = `${Math.random() * 100}vw`; // Random left position (0% to 100% of viewport width)
        balloon.style.bottom = `-100px`; // Start below the visible area

        balloonContainer.appendChild(balloon);
        balloons.push(balloon); // Save balloon for animation later
    }

    return balloons; // Return the array of balloons
}

// Store balloons when creating them
let balloons;

// Function to start balloon animations
function animateBalloons() {
    balloons.forEach(balloon => {
        // Randomize duration for each balloon's upward movement
        const randomDuration = 10 + Math.random() * 10; // Random duration between 10s and 20s
        balloon.style.animation = `floatUp ${randomDuration}s linear infinite`; // Start the animation
    });
}

function triggerFireworks() {
    document.getElementById("card").style.display = "none";
    document.getElementById("fireworksCanvas").style.display = "block";
    document.getElementById("birthdayMessage").style.display = "block";

    // Create balloons and then animate them
    balloons = createBalloons();
    animateBalloons(); // Start balloon movement
    startFireworks();
    startFirecrackers(); // Add firecrackers on both top corners
}

function startFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#F22222", "#FCF004", "#5DE2E7", "#68F731", "#FE9900"]; // Romantic colors

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() * 2 - 1) * 3;
        this.speedY = (Math.random() * 2 - 1) * 3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    Particle.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.98;
    };

    Particle.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };

    function explode() {
        const x = Math.random() * canvas.width; // Random x position for variety
        const y = Math.random() * canvas.height; // Random y position for variety
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(x, y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.size < 0.3) {
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(animate);
    }

    setInterval(explode, 1000); // Explode every second for continuous fireworks
    animate();
}

// Function to start firecrackers effect on both top corners
function startFirecrackers() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    const firecrackerParticles = [];

    function FirecrackerParticle(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() * 2 - 1) * 2;
        this.speedY = (Math.random() * 2 - 1) * 2;
        this.color = "orange";
    }

    FirecrackerParticle.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.98;
    };

    FirecrackerParticle.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };

    function burstFirecrackers() {
        // Explode on the top-left corner
        for (let i = 0; i < 50; i++) {
            firecrackerParticles.push(new FirecrackerParticle(100, 100)); // Adjust the x, y coordinates if needed
        }
        
        // Explode on the top-right corner
        for (let i = 0; i < 50; i++) {
            firecrackerParticles.push(new FirecrackerParticle(canvas.width - 100, 100)); // Adjust the x, y coordinates if needed
        }
    }

    function animateFirecrackers() {
        firecrackerParticles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.size < 0.3) {
                firecrackerParticles.splice(index, 1);
            }
        });
        requestAnimationFrame(animateFirecrackers);
    }

    burstFirecrackers();
    animateFirecrackers();
}
