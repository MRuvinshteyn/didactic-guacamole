
def parse_csv():
    f = open("USvideos.csv", "r")
    contents = f.read().split("\n")

    info = []
    for i in range(0, len(contents)):
        info.append(contents[i].split(","))
        if len(info[i]) > 3:    
            info[i][4] = info[i][4].split("|")
        
    return info

d = parse_csv()
print d[0]
print d[1]
