import json

#============================================================================================================
#we dont really need this sad reaccs
#parameters are what type of inputs you're putting in
#typee: what type of input you're putting in
#input0: the input of the specified type
#input1: only applicable if your input has numbers: specify if you want to return the videos with less than, more than, or equal to the specified value (input0)
#  not applicable for id's
#  views, likes, dislikes, comment total, date
#  1 for greater than, 0 for equals to, -1 for less than

#if you're not using those inputs, just put -1
#returns a list of all that fit the description

#['video_id', 'title', 'channel_title', 'category_id', ['tags'], 'views', 'likes', 'dislikes', 'comment_total', 'thumbnail_link', 'date\r']
#date: day, month

'''
def search(typee, input0, input1):
    d = parse_csv()
    results = []

    #args should this, unless it has been updatedupdated

    #['video_id', 'trending_date', 'title', 'channel_title', ['category_id'], 'publish_time', 'tags', 'views', 'likes', 'dislikes', 'comment_count', 'thumbnail_link', 'comments_disabled', 'ratings_disabled', 'video_error_or_removed', 'description\r']
    args = d[0]

    for i in range(0, len(args)):
        if(args[i] == typee):
            index = i

    #non-numerical searches
    if(index < 4 or index == 9):
        for i in range(0, len(d)):
            if(d[i][index] == input0):
                results.append(d[i])

    #tags
    if(index == 4):
        print "no"

    #numerical 
    if(index > 4 and index < 9):
        for i in range(0, len(d)):
            if(input1 == -1):
                if(d[i][index] <= input0):
                    results.append(d[i])
            if(input1 == 0):
                if(d[i][index] == input0):
                    results.append(d[i])
            if(input1 == 1):
                if(d[i][index] >= input0):
                    results.append(d[i])

    return results
  '''  
#============================================================================================================

def parse_csv():
    f = open("USvideos.csv", "r")
    contents = f.read().split("\n")

    info = []
    for i in range(0, len(contents)):
        curr = contents[i].split(",")
        #in case of newlines or other nonvalid cases
        if len(curr) > 6:
            info.append(curr)
            #the tags are separated with |
            info[i][6] = info[i][6].split("|")
        
    return info

def search_category(cat):
    d = parse_csv()
    results = []
    for i in range(0, len(d)):
        if(d[i][4] == str(cat)):
            results.append(d[i])
    return results
        
#d = parse_csv()
#print d[0]
#print d[1]

#print search_category(24)
#print search_category(30)




def parse_json():
    data = json.load(open('US_category_id.json'))['items']
    categories = []
    for i in range(0, len(data)):
        idd = data[i]['id']
        title = data[i]['snippet']['title']
        temp = [idd, title]
        categories.append(temp)

    return categories
    
    
d = parse_json()

#for i in range(0, len(d)):
#    print d[i]
