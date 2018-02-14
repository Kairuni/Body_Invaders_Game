import tkinter as tk;
import PIL.Image;
import PIL.ImageTk;



class App(tk.Frame):
    def __init__(self, master=None):
        tk.Frame.__init__(self, master);
        self.grid();

        self.columnconfigure(0, weight = 1);
        self.rowconfigure(0, weight = 1);
        self.rowconfigure(1, weight = 1);
        
        self.createWidgets();

    def createWidgets(self):
        self.quitButton = tk.Button(self, text='Quit', command=self.quit);
        self.quitButton.grid(row = 0, column = 0);
        im = PIL.Image.open("Level_1.png");
        photo = PIL.ImageTk.PhotoImage(im);

        label = tk.Label(self, anchor="center", image = photo);
        label.image = photo;
        label.grid(row = 1, column = 0, sticky = "NSEW");


app = App();
app.master.title("Wat Wat");
app.mainloop();
