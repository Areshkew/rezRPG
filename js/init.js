// Init with some options (check out #KaboomOpt for full options list)
kaboom({
    width: 800,
    height: 600,
    canvas: document.querySelector("#rezrpg"),
    background: [0, 0, 0]
});


// Player
loadSpriteAtlas("images/dungeon.png", {
	"player": {
		"x": 128,
		"y": 166,
		"width": 144,
		"height": 28,
		"sliceX": 9,
		"anims": {
			"idle": {
				"from": 0,
				"to": 3,
				"speed": 3,
				"loop": true
			},
			"run": {
				"from": 4,
				"to": 7,
				"speed": 10,
				"loop": true
			},
			"hit": 8
		}
	},
    "staff": {
		"x": 322,
		"y": 129,
		"width": 12,
		"height": 30
	},
    "gnome": {
        "x": 128,
        "y": 300,
        "width": 144,
        "height": 28,
        "sliceX": 9
    },
    "box": {
        "x": 287,
        "y": 410,
        "width": 144,
        "height": 28,
        "sliceX": 9
    },
    "enemy": {
        "x": 370,
        "y": 320,
        "width": 135,
        "height": 28,
        "sliceX": 9,
        "anims": {
			"idle": {
				"from": 0,
				"to": 3,
				"speed": 3,
				"loop": true
			},
			"run": {
				"from": 4,
				"to": 7,
				"speed": 10,
				"loop": true
			},
			"hit": 8
		}
    },
});

// Load Data:
loadSprite("background", "images/background.png")
loadSprite("key", "images/key.png")
loadSprite("spider", "images/spider.png")
loadSound("menu_music", "sounds/init_song.mp3")
loadSound("boss_music", "sounds/boss_music.mp3")

// MAP
loadSprite("Level0", "images/Level_0.png");
loadSprite("Level1", "images/Level_1.png");
loadSprite("Level2", "images/Level_2.png");

// Create a new scene called "menu".
scene("menu", () => {
    // Text
    add([
        sprite("background"),
        anchor("center"),
        pos((width() / 2), (height() / 2)),
    ])

    add([
        text("RezRPG", {
            size: 64,
        }),
        pos((width() / 2) - 128, 0),
    ]);

    add([
        text("v0.0.1", {
            size: 24,
        }),
        pos(680, 575),
    ]);

    // Music
    const music = play("menu_music", {
        loop: true,
    })
    volume(0.2)

    // Buttons
    const btn_p = add([
		text("New Game", {
            size: 36,
        }),
		pos((width() / 2), 200),
		area({ cursor: "pointer", }),
		scale(1),
		anchor("center"),
	]);
    
    const btn_c = add([
		text("Credits", {
            size: 36,
        }),
		pos((width() / 2), 250),
		area({ cursor: "pointer", }),
		scale(1),
		anchor("center"),
	]);
    
    btn_c.onClick(() => debug.log("Gustavo Ramirez - Miguel Osorio"));
    btn_c.onUpdate( () => onHover(btn_c) );

    btn_p.onUpdate( () => onHover(btn_p) );
    btn_p.onClick(() => { 
        go("lvl0");
        music.paused = true;
    });
});

// Main Execution
// debug.inspect = true
go("menu");