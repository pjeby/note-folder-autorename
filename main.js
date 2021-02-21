

'use strict';

var obsidian = require('obsidian');

class NotesAsFolders extends obsidian.Plugin {

    onload() {
        this.addCommand(
            {id: "make-folder-note", name: "Make this note a folder note", checkCallback: this.noteToFolder.bind(this)}
        );
        this.registerEvent(this.app.vault.on("rename", this.onRenameFile.bind(this)));
    }

    noteToFolder(check) {
        const note = this.app.workspace.getActiveFile();
        if ( !note || note.extension !== "md" || isFolderNote(note.path)) return false;
        if (check) return true;
        return (async () => {
            const destination = dirname(note.path) + "/" + note.basename;
            const existing = this.app.vault.getAbstractFileByPath(destination);
            if ( !existing ) {
                await this.app.vault.createFolder(destination);
            } else {
                return new obsidian.Notice(`A file or folder named ${note.basename} is in the way; can't create folder`);
            }
            // Move the note into the folder
            await this.safeRename(note, destination + "/" + note.name);
        })()
    }

    async safeRename(file, newName) {
        return await this.app.fileManager.renameFile(file, newName);
    }

    async onRenameFile(file, oldName) {
        // We only care about notes that were already folder notes
        if (file.extension !== "md" || !isFolderNote(oldName)) return;

        const
            oldDir = folderBasename(oldName),
            oldPath = dirname(oldName),
            newPath = dirname(file.path),
            oldFolder = this.app.vault.getAbstractFileByPath(oldPath)
        ;

        // If a folder note was renamed inside its folder, rename the folder to match
        if (oldPath === newPath) {
            const destination = dirname(oldPath) + "/" + file.basename;
            await this.safeRename(oldFolder, destination);
        }

        // If a folder note was moved to a new folder,
        else if (file.basename === oldDir) {
            const destination = newPath + "/" + oldDir;

            // Move the folder alongside the note,
            await this.safeRename(oldFolder, destination);

            // Then move the note back into the folder
            await this.safeRename(file, destination + "/" + file.name);
            return;
        }

    }
}


function folderBasename(path) { return path.split("/").slice(-2, -1).pop(); }
function basename(path)       { return path.split("/").pop(); }
function dirname(path)        { return path.split("/").slice(0, -1).join("/"); }
function isFolderNote(path)   { return basename(path) === folderBasename(path) + ".md"; }

module.exports = NotesAsFolders;
