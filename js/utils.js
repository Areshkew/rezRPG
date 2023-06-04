// Dialog
function addDialog() {
    const h = 160
    const pad = 16
    const bg = add([
        pos(0, height() - h),
        rect(width(), h),
        color(0, 0, 0),
        z(100),
    ])
    const txt = add([
        text("", {
            width: width(),
        }),
        pos(0 + pad, height() - h + pad),
        z(100),
    ])
    bg.hidden = true
    txt.hidden = true
    return {
        say(t) {
            txt.text = t
            bg.hidden = false
            txt.hidden = false
        },
        dismiss() {
            if (!this.active()) {
                return
            }
            txt.text = ""
            bg.hidden = true
            txt.hidden = true
        },
        active() {
            return !bg.hidden
        },
        destroy() {
            bg.destroy()
            txt.destroy()
        },
    }
}

// 
function spawnSpell(playerPos, enemyPos) {
    add([
        circle(4),
        area(),
        pos(playerPos),
        anchor("center"),
        color(127, 127, 255),
        outline(4),
        move(180 + playerPos.angle(enemyPos), 800),
        offscreen({ destroy: true }),
        // strings here means a tag
        "spell",
    ])
}

//
function spawnBox() {
    add([
        sprite("box"),
        area({ shape: new Rect(vec2(0), 10, 20) }),
        pos(rand(160, width() - 50), rand(70, height() - 50)),
        anchor("center"),
        body(),
        "box"
    ]);
}

//
function spawnEnemy(){
    add([
        pos(rand(160, width() - 50), rand(70, height() - 50)),
        sprite("enemy", { anim: "idle"}),
        area({ shape: new Rect(vec2(0), 10, 20) }),
        body({ isStatic: true }),
        anchor("center"),
        health(5),
        body(),
        "enemy"
    ]);
}

function spawnEnemies(q){
    for(let i = 0; i < q; i++){
        spawnEnemy();
    }
}

//
function onHover(b){
    if (b.isHovering()) {
        const t = time() * 10;
        b.color = rgb(
            71,
            91,
            223,
        );
    } else {
        b.color = rgb();
    }
}

// 
function addKey(){
    add([
        sprite("key", { width: 40, height: 50 }),
        anchor("center"),
        pos(350, 580),
    ])
}

//
function addExplode(p, n, rad, size) {
    for (let i = 0; i < n; i++) {
        wait(rand(n * 0.1), () => {
            for (let i = 0; i < 2; i++) {
                add([
                    pos(p.add(rand(vec2(-rad), vec2(rad)))),
                    rect(4, 4),
                    scale(1 * size, 1 * size),
                    lifespan(0.1),
                    grow(rand(48, 72) * size),
                    anchor("center"),
                ])
            }
        })
    }
}

//
function grow(rate) {
    return {
        update() {
            const n = rate * dt()
            this.scale.x += n
            this.scale.y += n
        },
    }
}