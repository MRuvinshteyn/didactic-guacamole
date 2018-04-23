# didactic-guacamole

### Dataset: Trending YouTube Video Statistics and Comments 
https://www.kaggle.com/datasnaek/youtube-new

Provides data of the videos placed on YouTube's daily trending page. This includes the date of the video, the title, the channel name, the category, the tags placed on the video, the amount of views, likes, dislikes, and comments, the link to the thumbnail of the video, boolean values stating whether the comments or ratings have been disabled—as well as the video being taken down—and the description. The sub-dataset that will be used is the one specifically for US videos, as there are csv files for other countries, but we are more intersted in the file for our own. At the moment, the dataset is being constantly updated, so we might follow that directive and post the updated versions when they come out. 

### How to Use:

1. Install flask

2. run `python app.py` in a terminal

3. Open http://localhost:5000/ in a browser of your choice.

4. Enjoy!

### What is shown?

The user will be greeted with a simple map of the various video categories of YouTube. This map will be created such that it simulates the density of trending videos per category, where the more popular categories will be previewed in a larger form than those that are not as popular.

### What can the user do?

Upon hovering over one of the categories, the user will be presented with broad data regarding the category (i.e. the number of trending videos in said category, the percentage make-up of this category among all trending videos, etc.) If the user clicks on a category, they will be presented with a full list of all trending videos under the category chosen. Hovering over a video will preview the information mentioned above, and clicking on the video will open the information on the entire webpage. The user may hover over each piece of information to be given a detailed description of what each section means (tooltips).

### What will D3 do?

D3 will power the density map created on the main page, dictating the size of each circle and the tooltips that show up when the user hovers over a category. When looking at a category, D3 will create the divs that hold previews of the videos, as well as the tooltips that show up when the user hovers over a video. When displaying the information about a video, D3 will control the boxes that each hold a piece of information regarding the video. The transitions between every page will be smooth, where it will fade between the main map, the category catalog, and the video information page instead of simply loading a new page to ensure the cleanest-looking experience on the website. 

### What will it look like?

The main page will have the following style:

![main menu](https://github.com/MRuvinshteyn/didactic-guacamole/blob/master/images/main_menu.jpg)

Where each circle represents a category, and the size of the circle represents the relative amount of trending videos in the category.



The video information page will have a simplified version of the following style:

![video page](https://github.com/MRuvinshteyn/didactic-guacamole/blob/master/images/video_page.jpg)

Where each box represents a piece of information accessible by the user.
