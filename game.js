kaboom({
  global: true,
  scale: 2,
  fullscreen: true,
  clearColor: [0, 1, 0.8, 1],
});
loadRoot("./sprites/");
loadSprite("block", "block.png");
loadSprite("mario", "mario.png");
loadSprite("coin", "coin.png");
loadSprite("mushroom", "mushroom.png");
loadSprite("surprise", "surprise.png");
loadSprite("dino", "dino.png");
loadSprite("pipe", "pipe_up.png");
loadSprite("bb", "block_blue.png");
loadSprite("mashe", "evil_mushroom.png");
loadSprite("unboxed", "unboxed.png");
loadSprite("z", "z.png");
loadSprite("princes", "princes.png");
loadSprite("spong", "spongebob.png");
loadSprite("star", "star.png");
loadSprite("surprize", "surprise.png");
loadSprite("heart", "heart.png");
loadSound("jump", "jumpSound.mp3");
loadSound("Music", "gameSound.mp3");
let score = 0;
let hearts = 3;
scene("level1", () => {
  play("Music");

  layers(["bg", "obj", "ui"], "obj");
  const map = [
    "                                                                                      ",
    "                                                                                      ",
    "                                                                                      ",
    "                                                                                      ",
    "                                                                                      ",
    "                                                                                      ",
    "                                                                                       ",
    "                                                                                                     ",
    "                                                                                                ",
    "                                                                                                ",
    "                                                                                                   ",
    "                                                                                                 ",
    "                                                                     cccccccccccccccccccccccccccccccccccccp              ",
    "                                                                     =====bb================bb============p ",
    "                                                                    =              =                        =            ",
    "                       c                     cccc                  =               =                       =                        ",
    "                      c=                    =====bb==      <      =                b                      =                               ",
    "                !    c==       <           ==       b            =|d              |=  ccc    cccc   cccc|=                 ",
    "             ccc cccc==|e                 |=|z      |=======bb============================================                               ",
    "             ========================================                                                                 ",
    "    !       ==                                                                        ",
    "=scc ccccc ===                                                                         ",
    "==============                                                                                    ",
  ];
  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "block"],
    "|": [sprite("block"), solid(), "wall"],
    d: [sprite("dino"), solid(), "dino", body()],
    d: [sprite("spong"), solid(), "spong", body()],
    c: [sprite("coin"), "coin"],
    m: [sprite("mushroom"), solid(), "mushroom"],
    e: [sprite("mashe"), solid(), "mashe", body()],
    "!": [sprite("surprise"), solid(), "surprize_coin"],
    "<": [sprite("surprise"), solid(), "surprize_star"],
    p: [sprite("pipe"), solid(), "pipe"],
    r: [sprite("princes"), solid(), "princes", body()],
    z: [sprite("z"), solid(), "z", body()],
    b: [sprite("bb"), "bb"],
    $: [sprite("coin"), "coin"],
    ">": [sprite("unboxed"), solid(), "unboxed"],
    t: [sprite("star"), body(), solid(), "star"],
  };
  const scoreLabel = add([text("score: 0")]);
  const level1 = add([text("You Are Level 1")]);
  const heartobj = add([sprite("heart"), text("    x3", 12), origin("center")]);
  const gameLevel = addLevel(map, mapSymbols);
  const player = add([
    sprite("mario"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);
  keyDown("d", () => {
    player.move(moveSpeed, 0);
  });
  keyDown("a", () => {
    player.move(-moveSpeed, 0);
  });

  keyDown("space", () => {
    // player.move(-0, -190);
    if (player.grounded()) {
      play("jump");
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
  const moveSpeed = 200;

  player.on("headbump", (obj) => {
    if (obj.is("surprize_coin")) {
      destroy(obj);
      gameLevel.spawn(">", obj.gridPos);
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprize_star")) {
      destroy(obj);
      gameLevel.spawn(">", obj.gridPos);
      gameLevel.spawn("t", obj.gridPos.sub(0, 1));
    }
  });
  player.action(() => {
    camPos(player.pos);
    scoreLabel.pos = player.pos.sub(400, 200);
    heartobj.pos = player.pos.sub(400, 170);
    heartobj.text = "    x" + hearts;
    scoreLabel.text = "score:  " + score;
    level1.pos = player.pos.sub(400, 250);
    level1.text = "You Are Level 1";
    if (player.pos.y > 700) {
      hearts--;
    }
    if (hearts <= 0) {
      go("lose");
    }
  });
  action("star", (obj) => {
    body();
    obj.move(20, 0);
  });
  player.collides("star", (obj) => {
    destroy(obj);
    player.biggify(5);
  });
  player.collides("coin", (obj) => {
    score += 10;
    destroy(obj);
  });
  let d_move = 30;
  action("dino", (obj) => {
    obj.move(d_move, -0);
  });
  collides("dino", "wall", () => {
    d_move *= -1;
  });
  let lastGrounded = true;
  player.collides("dino", (obj) => {
    if (lastGrounded) {
      hearts--;
    } else {
      destroy(obj);
    }
  });
  let e_move = 30;
  action("mashe", (obj) => {
    obj.move(e_move, -0);
    obj.collides("wall", () => {
      e_move *= -1;
    });
  });
  let Lastgrounded = true;
  player.collides("mashe", (obj) => {
    if (lastGrounded) {
      hearts--;
    } else {
      destroy(obj);
    }
  });
  let s_move = 30;
  action("spong", (obj) => {
    obj.move(s_move, -0);
  });
  collides("spong", "wall", () => {
    s_move *= -1;
  });

  let lastgrounded = true;
  player.collides("spong", (obj) => {
    if (lastGrounded) {
      hearts--;
    } else {
      destroy(obj);
    }
  });

  let z_move = 30;
  action("z", (obj) => {
    obj.move(z_move, -0);
  });

  collides("z", "wall", () => {
    z_move *= -1;
  });

  let LastGrounded = true;
  player.collides("z", (obj) => {
    if (lastGrounded) {
      hearts--;
    } else {
      destroy(obj);
    }
  });

  player.collides("pipe", (obj) => {
    keyDown("space", () => {
      go("level2");
    });
  });

  player.action(() => {
    lastGrounded = player.grounded();
  });
  //scene End!
});

scene("level2", () => {
  play("Music");

  layers(["bg", "obj", "ui"], "obj");
  const map = [
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "                                                                                                     ",
    "             !       !                   <                 !             !       <                   ",
    "                                                                                                     ",
    "           c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c c                                                            ",
    "          c= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =c                                                                                  ",
    "|r c c  c|=                                                                               =sc c c c |p ",
    "==========bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb=========== ",
  ];
  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "block"],
    d: [sprite("dino"), solid(), "dino", body()],
    s: [sprite("spong"), solid(), "spong", body()],
    z: [sprite("z"), solid(), "z", body()],
    c: [sprite("coin"), "coin"],
    r: [sprite("princes"), solid(), "princes", body()],
    m: [sprite("mushroom"), solid(), "mushroom"],
    "!": [sprite("surprise"), solid(), "surprize_coin"],
    "<": [sprite("surprise"), solid(), "surprize_star"],
    p: [sprite("pipe"), solid(), "pipe"],
    d: [sprite("dino"), solid(), "dino"],
    d: [sprite("dino"), solid(), "dino"],
    d: [sprite("dino"), solid(), "dino"],
    d: [sprite("dino"), solid(), "dino"],
    b: [sprite("bb"), "bb"],
    $: [sprite("coin"), "coin"],
    ">": [sprite("unboxed"), solid(), "unboxed"],
    t: [sprite("star"), body(), solid(), "star"],
  };
  const scoreLabel = add([text("score: 0")]);
  const heartobj = add([sprite("heart"), text("    x3", 12), origin("center")]);
  const level2 = add([text("You Are Level 2")]);
  const gameLevel = addLevel(map, mapSymbols);
  const player = add([
    sprite("mario"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);
  keyDown("d", () => {
    player.move(moveSpeed, 0);
  });
  keyDown("a", () => {
    player.move(-moveSpeed, 0);
  });
  keyDown("space", () => {
    // player.move(-0, -190);
    if (player.grounded()) {
      play("jump");
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
  const moveSpeed = 200;
  player.on("headbump", (obj) => {
    if (obj.is("surprize_coin")) {
      destroy(obj);
      gameLevel.spawn(">", obj.gridPos);
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprize_star")) {
      destroy(obj);
      gameLevel.spawn(">", obj.gridPos);
      gameLevel.spawn("t", obj.gridPos.sub(0, 1));
    }
  });
  player.action(() => {
    camPos(player.pos);
    scoreLabel.pos = player.pos.sub(400, 200);
    heartobj.text = "    x" + hearts;
    heartobj.pos = player.pos.sub(400, 170);
    level2.pos = player.pos.sub(400, 250);
    level2.text = "You Are Level 2";
    scoreLabel.text = "score:  " + score;
    if (player.pos.y > 700) {
      hearts--;
    }
    if (hearts <= 0) {
      go("lose");
    }
  });
  action("star", (obj) => {
    body();
    obj.move(20, 0);
  });
  player.collides("star", (obj) => {
    destroy(obj);
    player.biggify(5);
  });
  player.collides("coin", (obj) => {
    score += 10;
    destroy(obj);
  });

  action("dino", (obj) => {
    obj.move(30, -0);
  });
  let d_move = 30;
  action("dino", (obj) => {
    obj.move(d_move, -0);
  });
  collides("dino", "wall", () => {
    d_move *= -1;
  });
  let p_move = 30;
  action("princes", (obj) => {
    obj.move(p_move, -0);
  });
  collides("princes", "wall", () => {
    p_move *= -1;
  });

  let Lastgrounded = true;
  player.collides("princes", (obj) => {
    if (lastGrounded) {
      hearts--;
    } else {
      destroy(obj);
    }
  });

  let s_move = 30;
  action("spong", (obj) => {
    obj.move(s_move, -0);
  });
  collides("spong", "wall", () => {
    s_move *= -1;
  });

  let lastgrounded = true;
  player.collides("spong", (obj) => {
    if (lastGrounded) {
      hearts--;
    } else {
      destroy(obj);
    }
  });

  action("z", (obj) => {
    obj.move(30, -0);
  });

  let LastGrounded = true;
  player.collides("z", (obj) => {
    if (lastGrounded) {
      hearts--;
    } else {
      destroy(obj);
    }
  });

  player.collides("pipe", (obj) => {
    keyDown("space", () => {
      go("win");
    });
  });

  player.action(() => {
    lastGrounded = player.grounded();
  });
  //scene End!
});

scene("win", () => {
  add([
    text("You Win\n", 64),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);
});

scene("lose", () => {
  hearts = 3;
  add([
    text("Game over \n You Lost ;) \n Prees Space to Continue", 20),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);

  keyDown("space", () => {
    go("level1");
  });
});
start("level1");
