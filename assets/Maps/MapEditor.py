import tkinter as tk;
import PIL.Image as Image;
import PIL.ImageTk as ImageTk;

filename = input("Enter map filename: ");
image = Image.open(filename);
print("Building map array.");
w, h = image.size;
print("Map is",w, "by",h,"dimensions.");

mapArray = [[0 for x in range(w)] for y in range(h)];

pathHints = [];

## 0 - Nothing (rgb 255)
## 1/2 Wall (skips 2 as 2 will be 'wall, undrawn') (rgb 0)
## 3 - Bacteriophage (r 255 gb 0)
## 4 - Mosaic Virus (g 255 rb 0)
## 5 - Sputnik (rg 255, b 0)
## 6 - Blobber (rb 255, g 0)
## 7 - Random power up (r 0 bg 255)
## 8 - Blood path marker to make life easier (rbg 100)
## 9 - Sputnik Boss (rg 255, b 200)
## 10 - Blobber Boss (rb 255, g 200)
## 11 - Bacteriophage Boss (r 255, b 100, g 0)
entityTypes = {
    '255255255': 0,
    '000': 1,
    '25500': 3,
    '02550': 4,
    '2552550': 5,
    '2550255': 6,
    '0255255': 7,
    '100100100': 8,
    '255255200': 9,
    '255200255': 10,
    '2550100': 11,
};
def getEntityType(r, g, b):
    return entityTypes[str(r)+str(g)+str(b)];

def testAdjacent(x, y):
    testLocs = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
    for loc in testLocs:
        loc[0] += x;
        loc[1] += y;
        if (loc[0] >= 0 and loc[0] < w and loc[1] >= 0 and loc[1] < h):
            r, g, b = image.getpixel((loc[0], loc[1]));
            if (getEntityType(r, g, b) != 1):
                return True;
    return False;
        

for y in range(h):
    for x in range(w):
        r, g, b = image.getpixel((x, y));
        etype = getEntityType(r, g, b)
        if (etype == 1):
            ## Test adjacent
            if (not testAdjacent(x, y)):
                etype = 2;
        elif (etype == 8):
            ## Just a marker:
            etype = 0;
            pathHints.append((x,y));
            
        ##print(etype, end = "");
    ##print();

print("Map array built.");
x = -1;
y = -1;

print("Detected blood path markers (you still have to actually enter these manually: ", end = "");

for hint in pathHints:
    print(hint[0],hint[1], end = ", ");
    
print();

x, y = input("Enter an x and y value to form a blood path, or -1 as either for none (x space y):").split();
x = int(x);
y = int(y);

print("Test",x,y);


##
##
##
##class App(tk.Frame):
##    def __init__(self, master=None):
##        tk.Frame.__init__(self, master);
##        self.grid();
##
##        self.columnconfigure(0, weight = 1);
##        self.rowconfigure(0, weight = 1);
##        self.rowconfigure(1, weight = 1);
##        
##        self.createWidgets();
##
##    def createWidgets(self):
##        self.quitButton = tk.Button(self, text='Quit', command=self.quit);
##        self.quitButton.grid(row = 0, column = 0);
##        im = PIL.Image.open("Level_1.png");
##        photo = PIL.ImageTk.PhotoImage(im);
##
##        label = tk.Label(self, anchor="center", image = photo);
##        label.image = photo;
##        label.grid(row = 1, column = 0, sticky = "NSEW");
##
##
##app = App();
##app.master.title("Wat Wat");
##app.mainloop();
