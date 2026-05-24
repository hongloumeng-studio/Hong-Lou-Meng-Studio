# This Python when executed will back up and refresh the "versionChapterMenu.json"
# according to each [version]/[chapter json file] stored in the "/versions" folder

import datetime
import os
import json

dict={}
menuFile= "src/assets/js/versionChapterMenu.json" 
folder_path="src/assets/versions"
versions = os.listdir(folder_path)
print(versions)

for version in versions:
    files = os.listdir(folder_path+"/"+version)
    chapter_list=[]
    for f in files:
        sourceFile = folder_path+"/"+version+"/"+f
        f = open(sourceFile, mode='r', encoding="utf-8")
        j=json.load(f)
        # print(j["id"], j["title"]["text"])
        chapter_list.append({"id": j["id"], "title": j["title"]["text"]}  )
        f.close()

    print(chapter_list)
    ## Add verion chapter list to the dictinoary
    dict[version] =  chapter_list

## Rename the existing versionChapterMenu.json
if os.path.exists(menuFile):
    current_time = datetime.datetime.now()
    print("Current time:", current_time)

    # Get timestamp
    timestamp = current_time.timestamp()
    os.rename(menuFile, menuFile.replace(".", str(timestamp)+"."))

    #Create the new menu file
    with open(menuFile, 'w', encoding='utf-8') as tf:
        json.dump(dict, tf, indent=4, ensure_ascii=False)
    print("New menu file has been created: "+ menuFile)
