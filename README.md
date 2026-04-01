# invert-colors

Invert view colors for images, editor, and PDF viewer. Useful for dark themes or reducing eye strain.

## Features

- **Workspace inversion**: Invert colors of the entire workspace.
- **Editor inversion**: Invert colors of text editors only.
- **Image inversion**: Invert colors of `<img>` and `<canvas>` elements.
- **PDF support**: Invert pdf-viewer via `pdf-viewer.invertMode` config.
- **Status bar icons**: Optional per-mode toggle buttons in the status bar.

## Installation

To install `invert-colors` search for [invert-colors](https://web.pulsar-edit.dev/packages/invert-colors) in the Install pane of the Pulsar settings or run `ppm install invert-colors`. Alternatively, you can run `ppm install asiloisad/pulsar-invert-colors` to install a package directly from the GitHub repository.

## Commands

Commands available in `atom-workspace`:

- `invert-colors:workspace`: toggle workspace inversion,
- `invert-colors:editor`: toggle editor inversion,
- `invert-colors:image`: toggle image inversion,
- `invert-colors:pdfviewer`: toggle PDF viewer inversion.

## Configuration

All inversions are off by default. Each mode has two independent settings: `<mode>State` and `<mode>StatusIcon`. For example:

- `workspaceState` / `workspaceStatusIcon`
- `editorState` / `editorStatusIcon`
- `imageState` / `imageStatusIcon`
- `pdfviewerState` / `pdfviewerStatusIcon`

Note: enabling multiple overlapping modes (e.g. workspace and editor) will double-invert the overlapping elements, canceling out to normal colors.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
