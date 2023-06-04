scene("lvl2", () => { 

    // Level
    add([
        sprite("Level2"),
        anchor("center"),
        pos((width() / 2), (height() / 2)),
    ])

    // Music
    const music = play("boss_music", {
        loop: true,
    })
    music.paused = false;
    volume(0.2)

    // Boss
    const BOSS_HEALTH = 250

    const boss = add([
        sprite("spider", { width: 300, height: 300 }),
        anchor("center"),
        pos((width() / 2), (height() / 2)),
        area({ shape: new Rect(vec2(0), 300, 300) }),
        body({ isStatic: true }),
        health(BOSS_HEALTH),
        state("idle", [ "idle", "attack"]),
        "enemy"
    ])

    boss.onStateEnter("idle", async () => {
        await wait(0.5)
        boss.enterState("attack")
    })
    
    boss.onStateEnter("attack", async () => {

        if (player.exists()) {
    
            const dir = player.pos.sub(boss.pos).unit()
    
            add([
                pos(boss.pos),
                move(dir, 800),
                rect(12, 12),
                area(),
                offscreen({ destroy: true }),
                anchor("center"),
                color(WHITE),
                "bullet",
            ])
    
        }
    
        await wait(1)
        boss.enterState("idle")
    
    })


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

    // Boss
    boss.onHurt(() => {
		healthbar.set(boss.hp())
	})

	boss.onDeath(() => {
		music.paused = true;
		go("win")
	})

    const healthbar = add([
		rect(width(), 24),
		pos(0, 0),
		color(107, 201, 108),
		fixed(),
		{
			max: BOSS_HEALTH,
			set(hp) {
				this.width = width() * hp / this.max
				this.flash = true
			},
		},
	])

	healthbar.onUpdate(() => {
		if (healthbar.flash) {
			healthbar.color = rgb(255, 255, 255)
			healthbar.flash = false
		} else {
			healthbar.color = rgb(139, 0, 0)
		}
	})

    onCollide("spell", "enemy",(spell, enemy) => {
        destroy(spell)
        enemy.hurt(1)
        addExplode(enemy.pos, 1, 24, 1)
    })

    // Border Colliders
    add([
        pos(0, 0),
        area({ shape: new Rect(vec2(0), 10, 600)}),
        body({ isStatic: true }),
    ])

    add([
        pos(0, 15),
        area({ shape: new Rect(vec2(0), 800, 10)}),
        body({ isStatic: true }),
    ])

    add([
        pos(795, 0),
        area({ shape: new Rect(vec2(0), 10, 600)}),
        body({ isStatic: true }),
    ])

    add([
        pos(0, 600),
        area({ shape: new Rect(vec2(0), 800, 10)}),
        body({ isStatic: true }),
    ])

    // 
    player.onCollideUpdate(
        "enemy", 
        () => {
            player.hurt(5)
            p_health.text = "Vida: " + player.hp();
            player.moveTo(player.pos.x - 10, player.pos.y - 10);
        }
    );
    
    player.onCollideUpdate(
        "bullet", 
        (bullet) => {
            player.hurt(2)
            p_health.text = "Vida: " + player.hp();
            player.moveTo(player.pos.x - 10, player.pos.y - 10);
            destroy(bullet)
        }
    );

    player.on("death", () => {
        destroy(player);
        music.paused = true;

        wait(2, () =>{
            go("menu");
        })
        
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

    // Health
    const p_health = add([
        text("Vida: " + player.hp(), {
            size: 24,
        }),
        pos(25, 570),
    ]);
})
