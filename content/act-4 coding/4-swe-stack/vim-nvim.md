
That stack overflow post about VIM


##### What is `vim`? 

> [!check] `vim
> - Vim is the most pure text and code editor. It's useful for two things: 
> 	- Looking like a **badass**,
> 	- Mouse independence (you can do everything with commands, your hands never need to leave the keyboard)
> - It comes by default on most UNIX systems. 
> - Its full name is "Vi IMproved." 
> - Vim operates in several modes:
> 	- normal
> 	- insert
> 	- visual
> 	- etc.


<br>

---

##### Why use `vim` in the command line when Visual Studio and other IDE's exist? 

Using `vim` in the command line is advantageous for several reasons. 

1. Firstly, it is lightweight and fast, making it suitable for remote editing over SSH or on systems with limited resources. 
2. Secondly, Vim is highly customizable, allowing users to tailor their editing environment precisely. 
3. Thirdly, Vim's keyboard-centric approach reduces the need for mouse usage, potentially enhancing editing speed and efficiency. 
4. Lastly, Vim is ubiquitous, being available on almost all Unix-like systems, and it's valuable for users who work across different environments to have a consistent editing experience.

<br>

---

##### How do you exit `vim`?

> [!check]
> - `:q` quit vim. 
> - `:q!` to force quit with unsaved changes
> - `:wq` writes and quits
> - `:wq!` forces this action
> - `:x` or `:exit` saves and quits (safest)

☞ If you got this, congratulations! [One in every 20,000 stack overflow questions is 'how do I exit vim'](https://stackoverflow.blog/2017/05/23/stack-overflow-helping-one-million-developers-exit-vim/)

<br>

---
##### How do you enter Normal mode in `vim`?

> [!check] Esc or Ctrl-[ 
> - In Vim, Normal mode is the default mode in which you can execute commands. To return to Normal mode from any other mode (like Insert or Visual mode), press `Esc` or `Ctrl-[`. This will stop text editing or visual selection and allow you to execute Vim commands.

---

##### How do you enter Insert mode in `vim`?

> [!check] i, a, o, and other commands
> - To enter Insert mode in Vim (where you can insert text), press `i` while in Normal mode to start inserting text at the cursor position. Alternatively, press `a` to start inserting after the cursor, `o` to open a new line below the current line, or `O` to open a new line above. There are other variations like `I` for inserting at the beginning of the line and `A` for appending at the end of the line.

---

##### How do you enter Visual mode in `vim`?

> [!check] v, V, Ctrl-v
> - To enter Visual mode in Vim (where you can select text), press `v` in Normal mode. This allows you to start selecting text character by character. To select whole lines, press `V`. For block (column) selection, use `Ctrl-v`. You can then extend the selection using movement keys.

<br>

---
##### How do you undo in `vim`?

> [!check] u
> - The way to undo in VIM is 'u', in normal mode.

---

##### How do you save a file in `vim`?

> [!check] :w
> - To save changes to your file in Vim, press `Esc` to ensure you're in normal mode, then type `:w` and press `Enter`. This writes the changes to the current file. If you want to save the file with a different name, type `:w filename` and press `Enter`.

---

##### How do you exit `vim`?

> [!check] :q
> - To exit Vim, press `Esc` to go to normal mode, then type `:q` and press `Enter`. If you have unsaved changes, Vim will warn you. To exit without saving changes, use `:q!`.

---

##### How do you select lines in `vim`?

> [!check] V
> - To select an entire line in Vim, press `V` in normal mode. This puts Vim in visual line mode, selecting the current line. You can then use the arrow keys or `j` and `k` to extend the selection to additional lines. To select a block of text, use `v` in normal mode and move the cursor to cover the desired text.

---

##### How do you copy and paste in `vim`?

> [!check] y and p
> - To copy (or "yank" in Vim terminology) the selected text, press `y` in visual mode. To paste the yanked text, navigate to where you want to paste and press `p` in normal mode to paste after the cursor, or `P` to paste before the cursor.

---

##### How do you find and replace text in `vim`?

> [!check] :%s/old/new/g
> - To find and replace text in Vim, use the command `:%s/old/new/g` in normal mode. This replaces all occurrences of 'old' with 'new' in the file. To confirm each replacement, add `c` at the end, like `:%s/old/new/gc`.

---

##### How do you move efficiently in `vim`?

> [!check] Various navigation commands
> - Vim offers numerous navigation commands. For instance, `h`, `j`, `k`, `l` for left, down, up, right; `w`, `b` to move by words; `0`, `$` to move to the start/end of a line; `gg`, `G` to move to the start/end of the file. Vim's navigation is designed to minimize keystrokes for efficiency.

