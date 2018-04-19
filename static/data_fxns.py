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

        #in case of commas in entries
        if len(curr) > 16:
            j = 0
            while j < len(curr) and len(curr) > 16:
                if curr[j][0:1] == '"' and curr[j][len(curr[j])-1:] != '"':
                    store = ''
                    while j < len(curr):
                        store += curr[j]
                        if curr[j][len(curr[j])-1:] == '"':
                            del curr[j]
                            break
                        del curr[j]
                    curr.insert(j, store)
                j+=1
        #in case of newlines or other nonvalid cases
        if len(curr) > 6:
            info.append(curr)

            #the tags are separated with |
            #if i != 0:
            info[i][6] = info[i][6].split("|")

    return info

def list_to_dict(li):
    dic = {}
    for item in li:
        #based on video_id:
        temp = {}
        i = 0
        while i < len(item):
            temp[i] = item[0]
            i+=1
        dic[item[0]] = temp
    return dic
    
def search_category(cat):
    d = parse_csv()
    results = []
    for i in range(0, len(d)):
        if(d[i][4] == str(cat)):
            results.append(d[i])
    return results


def list_to_json(filename, li):
    f = open(filename, 'w')
    json.dump(li, f)
    f.close()

def check_json(filename):
    f = open(filename, 'r')
    data = json.load(f)
    print data

li = parse_csv()
d = list_to_dict(li)
print d
#list_to_json('csv_to_json.json', li)
#check_json('csv_to_json.json')
    
def parse_json():
    data = json.load(open('US_category_id.json'))['items']
    categories = []
    for i in range(0, len(data)):
        idd = data[i]['id']
        title = data[i]['snippet']['title']
        temp = [idd, title]
        categories.append(temp)

    return categories

