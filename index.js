import platform from './assets/platform.png'
console.log(platform)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 220
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        // Applying gravity till the end of window
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Object creation
const player = new Player()
const platforms = [new Platform({ x: 400, y: 400 }), new Platform({ x: 700, y: 500 })]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }

}
// variable to store length
let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })

    // Player moving left or right
    if (keys.right.pressed && player.position.x < (canvas.width / 2)) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        // Scrolling the view
        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }
    // Hitting and staying on platform
    platforms.forEach((platform) => {
        if ((player.position.y + player.height <= platform.position.y) && (player.position.y + player.height + player.velocity.y >= platform.position.y) && (player.position.x + player.width >= platform.position.x) && (player.position.x < platform.position.x + platform.width)) {
            //STOPS
            player.velocity.y = 0
        }
    })
    if (scrollOffset > 2000) {
        console.log("You win!!")
    }
}
animate()


// Event Listeners
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 39:
            console.log("Move Right")
            keys.right.pressed = true
            break;
        case 37:
            console.log("Move Left")
            keys.left.pressed = true
            break;
        case 32:
            // JUMP CODE
            console.log("Jump")
            if (player.velocity.y == 0) {
                player.velocity.y = -15
            }
            break;
        case 40:
            console.log("Down")
            break;
        default:
            break;
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 39:
            console.log("Move Right")
            keys.right.pressed = false
            break;
        case 37:
            console.log("Move Left")
            keys.left.pressed = false
            break;
        case 32:
            console.log("No Jump")
            break;
        case 40:
            console.log("Down")
            break;
        default:
            break;
    }
})