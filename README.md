# Suguru with Images

A React app for playing suguru puzzles with images.

It uses [React *DnD*](https://react-dnd.github.io/react-dnd/about) for drag and drop functionality.

Drag and drop pieces from the picker to the open puzzle board cells. Drag non-fixed pieces from the puzzle board to the trash can to delete them.

![](https://github.com/mikebe11/suguru-with-images/blob/master/screenshot.png?raw=true)

Another build is available for mobile devices. It does not support drag and drop but instead uses just touch events.

**place a piece:** Press a piece in the picker to highlight it. Press one or more empty puzzle cells to place pieces there.

**delete a piece:** Press the trash can to highlight it. Press one or more non-fixed pieces on the the puzzle to delete them.

## Requirements

**Node**

**Composer** - For the Mobile Detect library.

**PHP** - For loading puzzles from the database.

## Configuration

In the project's root folder

    composer install

    npm install

In a browser open *index.php*
