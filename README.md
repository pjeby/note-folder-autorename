# Note Folder Autorename for Obsidian

Ever wished you could make an Obsidian note be a folder, or make a folder have its own note?

This plugin gives you a new command,  "Make this note a folder note".  When you use it, it creates a new folder alongside the note with the same name as the note, and then moves that note *inside* of it.

Then, from then on, any time you move or rename the note, the folder will go along with it.

### Why is this useful?

Well, let's say you start writing a note on `Topic A`.  At some point, the note becomes too big, and you want some other notes on that topic.  So you set out to make a folder called `Topic A`, and move your `Topic A` note inside of it.  Now, if you have Obsidian configured to "create new files in the same folder", any time you visit `Topic A` and create a new note, it'll go to the same folder.

So far, that's all things you could do with Obsidian already.

But suppose that now, you decide that `Topic A` really needs to be a subtopic of `Topic B`, and you want to move the notes and folder under Topic B.

If `Topic A` were just a note, you could move it with the "move file to another folder" command really quickly.  But now, that won't work...

Unless you have this plugin.

When this plugin is active, any rename or movement of a "folder note" like `Topic A` will also rename or move the folder to follow.  So if you move the `Topic A` note to folder `Topic B`, then you will end up with the note in `Topic B/Topic A/Topic A.md`, and all the other notes from the `Topic A` folder alongside it.  (And any links that referenced the moved notes updated as well, if they were relative or absolute links.)

### So how do I make a folder note for an existing folder?

Create a note inside the folder with the same name.  It'll be auto-renamed from then on.

### What if I don't want a note to be a folder note any more?

Rename its *folder* so it no longer matches the name of the note, then move the note out of the folder.  After that you can rename the folder back if you desire, or delete it if it's no longer needed.

### How is this different from the "Folder Note" plugin?

The [Folder Note](https://github.com/xpgo/obsidian-folder-note-plugin) plugin changes the UI of the file manager to hide folder notes and pretend that the folder is itself a note.  It also has some other features relating to the *content* of folder notes.  With the correct settings, it is compatible with this plugin and en

In contrast, this plugin doesn't do any special styling or change the file manager in any way.  Indeed, it has no UI at all except for the "Make this note a folder note" command.  It just quietly monitors the vault activity and steps in to keep your paths and filenames consistent.

### Can I use both?

Yes!  This plugin lets you do most of the management of folder notes via the keyboard, but the Folder Note plugin can both hide your folder notes in the file manager (to reduce visual clutter/duplication) and offers some additional tools.

If you want to use the Folder Note plugin in combination with this one, you can.  Just set the following settings in that plugin:

* Note File Method: "Folder Name Inside"
* Auto Rename: OFF

The Folder Note plugin's auto-rename feature is not compatible with this plugin and enabling both may result in rename loops, broken links, or worse

