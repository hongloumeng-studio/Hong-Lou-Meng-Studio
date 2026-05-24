## The following Python code can re-index the verses in each chapter
import os
import re 
folder_path="src/assets/versions"
versions=["脂硯重評并癸酉後二十八回校注本"]  ##108回  or "精緻乙版" 120回

chapterNum=108

for version in versions:
    for num in range(1, chapterNum+1):
        n = ('00'+str(num))[-3:]
        inFile= folder_path+"/"+version+"/"+version+"chapter"+n+".json"
        print(inFile)
        reindex = 0

        file = open(inFile, mode='r+', encoding="utf-8")
        text = file.readlines()
        file.close()

        for i, line in enumerate(text):
            # # modify title block
            # if re.search(r',"title"', line):
            #     modified_title=re.split(r':', line)
            #     text[i]=':{"text":'.join(modified_title)+'\t\n\t\n\t}\n'

            # re-index content ID
            if re.search(r'\s,?{"id"', line):
                reindex += 1
                text[i]=re.sub(r'"?\d{1,3}"?', '"'+str(reindex)+'"', line)

        #  print(text)
        file = open(inFile, mode='w+', encoding="utf-8")
        file.writelines(text)
        file.close()
