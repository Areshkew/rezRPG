scene("win", () => { 
    add([
        text("! Victoria ¡ Liberaste al castillo de la araña.", {
            size: 24,
        }),
        anchor("center"),
        pos(width() / 2, height() / 2),
    ]);

    add([
        text("Juego realizado por:", {
            size: 24,
        }),
        anchor("center"),
        pos(width() / 2, height() / 2 + 50),
    ]);


    add([
        text("Miguel Osorio", {
            size: 24,
        }),
        anchor("center"),
        pos(width() / 2, height() / 2 + 75),
    ]);

    add([
        text("Gustavo Ramirez", {
            size: 24,
        }),
        anchor("center"),
        pos(width() / 2, height() / 2 + 100),
    ]);


    const btn_back = add([
		text("< Volver al Menu", {
            size: 36,
        }),
		pos(width() / 2, height() / 2 + 200),
		area({ cursor: "pointer", }),
		scale(1),
		anchor("center"),
	]);

    btn_back.onClick(() => go("menu"));
    btn_back.onUpdate( () => onHover(btn_back) );

})