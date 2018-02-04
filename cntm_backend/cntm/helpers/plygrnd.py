import urllib.request
import parse

ds = []

with open("/home/david/Documents/ws/ws/cntm2018/cntm_backend/cntm/helpers/outp.txt", "r") as f_in:
    lines = f_in.readlines()

    for line in lines:
        line = line.strip()

        m = line.split(";")

        desc = m[1]
        ds.append(desc)


print("|".join(ds))



model_pre = "https://topmodel2018.prosieben.de/tv/germanys-next-topmodel/models-2018/"
img_pre = "https://topmodel2018.prosieben.de/tv/germanys-next-topmodel/models-2018/images/"

def f_in_m(strng, sta, sto):
    return strng.split(sta)[1].split(sto)[0]

with open("inpt", "r") as f_in:
    names = f_in.readlines()


with open("outp.txt", "w") as f_out:

    for name in names:

        name = name.strip()

        real_name = name.title().replace("_", " ")

        u = model_pre + name

        page = urllib.request.urlopen(u)
        content = page.read()
        content = str(content)

        img_url = f_in_m(content, img_pre, ".jpg")
        img_url = img_pre + img_url + ".jpg"

        infos = f_in_m(content, 'div class="shooting__desc">', "</div>")

        try:
            desc = f_in_m(infos, '<strong> "', '" </strong>')
        except:
            desc = f_in_m(infos, '<strong> ', ' </strong>')
        age = f_in_m(infos, "Alter: ", "\\n")
        hair = f_in_m(infos, "Haarfarbe: ", "\\n")
        eye = f_in_m(infos, "Augenfarbe: ", "</p>")

        print(real_name)

        f_out.write(";".join([name, real_name, u, img_url, desc, age, hair, eye]) + "\n")

# with open("/home/david/Documents/ws/ws/cntm2018/cntm_backend/cntm/helpers/outp.txt", "r") as f_in:
#     lines = f_in.readlines()
#
#     for line in lines:
#         line = line.strip()
#
#         m = line.split(";")
#
#         mo = GNTMModel(name=m[1],
#                        descr=m[4],
#                        age=m[5],
#                        img_url=m[3],
#                        link=m[2],
#                        out=0)
#         mo.save()

