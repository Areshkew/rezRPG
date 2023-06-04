
scene("lvl1", () => {
    let DIFFICULT = 1;
    let enemies_killed = 0;
    
    // Level
    add([
        sprite("Level1"),
        anchor("center"),
        pos((width() / 2), (height() / 2)),
    ])

    // PJ
    const player = add([
        pos(392, 575),
        sprite("player", { anim: "idle"}),
        area({ shape: new Rect(vec2(0), 10, 20) }),
        body({ isStatic: true }),
        anchor("center"),
        health(5),
        body()
    ]);
    
    const staff = add([
        pos(),
        sprite("staff"),
        anchor("bot"),
        rotate(0),
        follow(player, vec2(8, 18)),
    ]);

    // Level Colliders
    add([
        pos(7, 270),
        area({ shape: new Rect(vec2(0), 86, 35)}),
        body({ isStatic: true }),
    ])

    add([
        pos(140, 51),
        area({ shape: new Rect(vec2(0), 10, 250)}),
        body({ isStatic: true }),
    ])

    add([
        pos(0, 0),
        area({ shape: new Rect(vec2(0), 10, 600)}),
        body({ isStatic: true }),
    ])

    add([
        pos(0, 60),
        area({ shape: new Rect(vec2(0), 800, 10)}),
        body({ isStatic: true }),
    ])

    add([
        pos(795, 60),
        area({ shape: new Rect(vec2(0), 10, 600)}),
        body({ isStatic: true }),
    ])

    add([
        pos(0, 600),
        area({ shape: new Rect(vec2(0), 800, 10)}),
        body({ isStatic: true }),
    ])

    add([
        pos(390, 80),
        area({ shape: new Rect(vec2(0), 25, 25)}),
        "nextScene"
    ]);

    player.onCollide("nextScene", () => {
        if(enemies_killed >= 50) go("lvl2");
    })

    // Controls
    onKeyPress(["a", "d", "w", "s"], () => {
        player.play("run");
    });

    onKeyRelease(["a", "d", "w", "s"], () => {
        if (
            !isKeyDown("a")
            && !isKeyDown("d")
            && !isKeyDown("w")
            && !isKeyDown("s")
        ) {
            player.play("idle");
        }
    });

    onKeyDown("d", () => {
        player.flipX = false;
        staff.flipX = false;
        player.move(SPEED, 0)
        staff.follow.offset = vec2(-8, 18)
    });
    
    onKeyDown("a", () => {
        player.flipX = true;
        staff.flipX = true;
        player.move(-SPEED, 0)
        staff.follow.offset = vec2(8, 18)
    });
    
    onKeyDown("w", () => {
        player.move(0, -SPEED)
    });
    
    onKeyDown("s", () => {
        player.move(0, SPEED)
    });

    onClick(() => {
        spawnSpell(player.pos.sub(16, 0), mousePos())
    })

    player.onCollideUpdate(
        "enemy", 
        () => {
            player.hurt(1)
            p_health.text = "Vida: " + player.hp();
            player.moveTo(player.pos.x - 10, player.pos.y - 10);
        }
    );

    player.on("death", () => {
        destroy(player);

        wait(2, () =>{
            go("menu");
        })
        
    })

    // Box Collide with spell
    onCollide("spell", "box",(spell) => {
        destroy(spell)
    })
    
    // Box Collide with enemy
    onCollide("spell", "enemy",(spell, enemy) => {
        destroy(spell)
        enemy.hurt(1)
    })

    // Follow Player
    onUpdate("enemy", (enemy) => {
        enemy.moveTo(player.pos.x, player.pos.y, 25);

        if(enemy.hp() == 0){
            destroy(enemy);
            enemies_killed++;
            p_kills.text = "Kills: " + enemies_killed + " / 50";

            if(enemies_killed == 50) addKey();
        }
    })

    // Spawn Random Boxes
    for(let i = 0; i < 50; i++){
        spawnBox();
    }

    // Spawn Enemies
    loop(15, () => {
        spawnEnemies(DIFFICULT);
        DIFFICULT = DIFFICULT + rand(1, 3);
    })
    
    // Health
    const p_health = add([
        text("Vida: " + player.hp(), {
            size: 24,
        }),
        pos(25, 570),
    ]);
    
    const p_kills = add([
        text("Kills: " + enemies_killed + " / 50", {
            size: 24,
        }),
        pos(150, 570),
    ]);
})

// go("lvl1");