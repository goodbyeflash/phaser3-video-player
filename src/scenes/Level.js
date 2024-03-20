// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
  constructor() {
    super('Level');

    /* START-USER-CTR-CODE */
    // Write your code here.
    this.img;
    this.video;
    this.isDown = false;
    this.seekLine;
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    this.events.emit('scene-awake');
  }

  /* START-USER-CODE */

  // Write more your code here

  create() {
    this.editorCreate();

    this.video = this.add.video(1280 / 2, 720 / 2, 'BigBuckBunny');
    this.video.play();

    this.img = this.add.rectangle(100, 300, 20, 20, 0xffffff).setDepth(1);
    this.img.slider = this.plugins.get('rexsliderplugin').add(this.img, {
      endPoints: [
        {
          x: 1280 / 4,
          y: 650,
        },
        {
          x: 1280 / 2 + 1280 / 4,
          y: 650,
        },
      ],
      value: 0,
    });

    this.add
      .graphics()
      .lineStyle(3, 0xff0000, 1)
      .strokePoints(this.img.slider.endPoints);

    this.seekLine = this.add
      .graphics()
      .lineStyle(3, 0xff00ee, 1)
      .strokePoints([
        {
          x: 1280 / 4,
          y: 650,
        },
        {
          x: 1280 / 4,
          y: 650,
        },
      ]);

    this.img.setInteractive({ cursor: 'pointer' }).on('pointerdown', (e) => {
      this.isDown = true;
    });

    this.img.setInteractive({ cursor: 'pointer' }).on('pointerup', (e) => {
      this.video.seekTo(this.img.slider.value);
      this.isDown = false;
    });

    this.input.on('pointerup', (e) => {
      if (this.isDown) {
        this.video.seekTo(this.img.slider.value);
        this.isDown = false;
      }
    });
  }

  update() {
    if (!this.isDown) {
      this.img.slider.value = this.video.getProgress();
      this.seekLine.width = 200;
    } else {
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
