import json
import random
from django.core import serializers

from cntm.helpers.passwd import md5_hash, hash_password, verify_passwd
from cntm.models import User


hair_list = ["Rot", "Blond", "Schwarz", "Braun"]
eye_list = ["Grün", "Blau", "Blau-Grau", "Braun", "Blau-Grün"]
desc_list=["Meinen Freund kennt man als Juicy Gay!",
           "Ich färbe meine Haare gerne in bunten Farben.",
           "Meine Lippen sind gemacht!",
           "Ich wurde fast vom LKW überfahren!",
           "Ich trage immer eine Perücke",
           "Wenn ich den Raum betrete, falle ich auf!",
           "Nach Miss Universe jetzt Topmodel?"]
hobbi_list = ["Singen", "Modeln", "Fernsehen", "GNTM", "Tanzen", "Laufen", "Shoppen"]
img_list = ["https://images-na.ssl-images-amazon.com/images/M/MV5BMTEyNTg3Njc1OTdeQTJeQWpwZ15BbWU3MDI5Mjg3MzM@._V1_UY317_CR20,0,214,317_AL_.jpg",
            "http://www1.pictures.zimbio.com/gi/21st+Annual+Elton+John+AIDS+Foundation+Academy+ysTBYk7WzUJx.jpg",
            "https://intouch.wunderweib.de/assets/styles/696/public/field/image/heidi-klum-mode-lidl.jpg?itok=3TJWngMz",
            "http://www.speakerscorner.me/wp-content/uploads/2015/10/heidi1.jpg",
            "https://image.afcdn.com/story/20140116/heidi-klum-steht-zu-ihren-falten-161877_w767h767c1cx761cy1100.jpg",
            "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2F1477665999%2F102816-heidi-klum-lead.jpg",
            "http://cdn.jolie.de/194800-2839016-1/image768w/heidi-klum-kinder.jpg"]


def create_new_user(email, username, passwd):

    if not does_user_exist(username):
        u_token = md5_hash(email)
        pass_hash = hash_password(passwd)

        new_user = User(token=u_token,
                        email=email,
                        username=username,
                        passwd=pass_hash,
                        score=0,
                        real_name="Echter Name",
                        img_url=random.choice(img_list),
                        age=random.randint(16,33),
                        hair=random.choice(hair_list),
                        eye=random.choice(eye_list),
                        descr=random.choice(desc_list),
                        hobbies=random.choice(hobbi_list)
                        )

        new_user.save()

    else:
        u_token = ""

    return u_token



def check_user_passwd(username, passwd):

    if not does_user_exist(username):
        return False

    try:

        u = User.objects.get(username=username)
        pass_hash = u.passwd

        return verify_passwd(passwd=passwd, hash=pass_hash)
    except:
        return False


def get_user_token(username):

    try:
        u = User.objects.get(username=username)
        u_token = u.token

        return u_token

    except:
        return ""


def verify_user(username, token):

    if not does_user_exist(username):
        return False

    try:
        u = User.objects.get(username=username)
        u_token = u.token

        return u_token == token

    except:
        return False


def does_user_exist(username):
    u = User.objects.filter(username=username)

    if len(u) == 1:
        return True
    else:
        return False


def get_user_json(username, token):

    if not verify_user(username, token):
        return {}

    u = User.objects.get(username=username)

    json_str = serializers.serialize('json', [u], ensure_ascii=False)
    json_str = json_str[1:-1]

    json_dict = json.loads(json_str)

    json_dict = json_dict["fields"]
    json_dict["passwd"] = ""

    return json_dict


def update_user(username, key, val):

    u = User.objects.get(username=username)
    setattr(u, key, val)
    u.save()

def get_user_ranking():

    users = User.objects.all()
    user_toplist = []

    for u in users:
        user_toplist.append((u.score, dict(username=u.username, score=u.score, img_url=u.img_url, descr=u.descr)))

    ret_list = []
    for _, u in sorted(user_toplist, reverse=True, key=lambda x:x[0]):
        ret_list.append(u)

    return {"ranking": ret_list}