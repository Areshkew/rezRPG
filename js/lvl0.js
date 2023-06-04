const SPEED = 120;

scene("lvl0", () => {
    
    // Level
    add([
        sprite("Level0"),
        anchor("center"),
        pos((width() / 2), (height() / 2)),
    ])

    // PJ
    const player = add([
        pos(376, 327),
        sprite("player", { anim: "idle", width: 45, height: 100 }),
        area({ shape: new Rect(vec2(0), 40, 50), offset: vec2(0, 16)}),
        body({ isStatic: true }),
        anchor("center"),
        body()
    ]);
    
    const gnome = add([
        pos(440, 200),
        sprite("gnome", { width: 45, height: 100 }),
        area({ shape: new Rect(vec2(0), 40, 50)}),
        body({ isStatic: true }),
        anchor("center"),
        "gnome"
    ]);

    const staff = add([
        pos(),
        sprite("staff", {  width: 32, height: 55 }),
        anchor("bot"),
        rotate(0),
        follow(player, vec2(-8, 28)),
    ]);

    add([
        pos(330, 130),
        area({ shape: new Rect(vec2(0), 80, 30)}),
        "nextScene"
    ]);

    // Level Colliders
    add([
        pos(159, 150),
        area({ shape: new Rect(vec2(0), 15, 250)}),
        body({ isStatic: true }),
    ])

    add([
        pos(180, 399),
        area({ shape: new Rect(vec2(0), 470, 10)}),
        body({ isStatic: true }),
    ])

    add([
        pos(660, 150),
        area({ shape: new Rect(vec2(0), 15, 250)}),
        body({ isStatic: true }),
    ])

    add([
        pos(180, 164),
        area({ shape: new Rect(vec2(0), 150, 10)}),
        body({ isStatic: true }),
    ])

    add([
        pos(403, 164),
        area({ shape: new Rect(vec2(0), 300, 10)}),
        body({ isStatic: true }),
    ])

    add([
        pos(460, 183),
        area({ shape: new Rect(vec2(0), 40, 30)}),
        body({ isStatic: true }),
    ])

    // PJ Collider
    const dialog = addDialog();
    gnome.flipX = true;

    player.onCollide("gnome", (ch) => {
		dialog.say("¡ Ayuda ! La araña mutante está atacando, salvanos, esta en el último corredor del castillo.")
	})

    player.onCollide("nextScene", () => {
        go("lvl1")
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
        staff.follow.offset = vec2(-8, 28)
    });
    
    onKeyDown("a", () => {
        player.flipX = true;
        staff.flipX = true;
        player.move(-SPEED, 0)
        staff.follow.offset = vec2(8, 28)
    });
    
    onKeyDown("w", () => {
        player.move(0, -SPEED)
    });
    
    onKeyDown("s", () => {
        player.move(0, SPEED)
    });

})



