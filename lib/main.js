const { CompositeDisposable } = require("atom");

module.exports = {
  subscriptions: null,
  statusBar: null,
  imgTile: null,
  pdfTile: null,

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "invert-colors:toggle": () => this.toggle(),
        "invert-colors:img": () => this.imgToggle(),
        "invert-colors:pdf": () => this.pdfToggle(),
      })
    );

    this.subscriptions.add(
      atom.config.observe("invert-colors.img", (state) => {
        this.imgUpdate(state);
      }),
      atom.config.observe("invert-colors.pdf", (state) => {
        this.pdfUpdate(state);
      }),
      atom.config.onDidChange("invert-colors.statusBar", ({ newValue }) => {
        newValue ? this.activateStatusBar() : this.deactivateStatusBar();
      }),
    );
  },

  deactivate() {
    this.subscriptions.dispose();
    this.deactivateStatusBar();
  },

  toggle() {
    this.imgToggle();
    this.pdfToggle();
  },

  imgToggle() {
    const current = atom.config.get("invert-colors.img");
    atom.config.set("invert-colors.img", !current);
  },

  imgUpdate(state) {
    const workspace = atom.views.getView(atom.workspace);
    if (state) {
      workspace.classList.add("invert-colors-img");
    } else {
      workspace.classList.remove("invert-colors-img");
    }
    if (this.imgIcon) {
      this.imgIcon.classList.toggle("active", state);
    }
  },

  pdfToggle() {
    const current = atom.config.get("invert-colors.pdf");
    atom.config.set("invert-colors.pdf", !current);
  },

  pdfUpdate(state) {
    atom.config.set("pdf-viewer.invertMode", state);
    if (this.pdfIcon) {
      this.pdfIcon.classList.toggle("active", state);
    }
  },

  consumeStatusBar(statusBar) {
    this.statusBar = statusBar;
    if (atom.config.get("invert-colors.statusBar")) {
      this.activateStatusBar();
    }
  },

  activateStatusBar() {
    if (!this.statusBar || this.imgTile) {
      return;
    }

    // Image invert button
    const imgElement = document.createElement("div");
    imgElement.classList.add("invert-colors-status", "inline-block");
    this.imgIcon = document.createElement("span");
    this.imgIcon.classList.add("icon", "icon-file-media");
    if (atom.config.get("invert-colors.img")) {
      this.imgIcon.classList.add("active");
    }
    imgElement.appendChild(this.imgIcon);
    imgElement.addEventListener("click", () => this.imgToggle());
    this.imgTile = this.statusBar.addRightTile({ item: imgElement, priority: -80 });

    // PDF invert button
    const pdfElement = document.createElement("div");
    pdfElement.classList.add("invert-colors-status", "inline-block");
    this.pdfIcon = document.createElement("span");
    this.pdfIcon.classList.add("icon", "icon-file-pdf");
    if (atom.config.get("invert-colors.pdf")) {
      this.pdfIcon.classList.add("active");
    }
    pdfElement.appendChild(this.pdfIcon);
    pdfElement.addEventListener("click", () => this.pdfToggle());
    this.pdfTile = this.statusBar.addRightTile({ item: pdfElement, priority: -80 });
  },

  deactivateStatusBar() {
    if (this.imgTile) {
      this.imgTile.destroy();
      this.imgTile = null;
      this.imgIcon = null;
    }
    if (this.pdfTile) {
      this.pdfTile.destroy();
      this.pdfTile = null;
      this.pdfIcon = null;
    }
  },
};
