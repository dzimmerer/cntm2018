import json
import random
from django.core import serializers
from django.db.models.functions import Lower


from cntm.helpers.passwd import md5_hash, hash_password, verify_passwd
from cntm.models import User, CAnswer, Challenge, Log

hair_list = ["Rot", "Blond", "Schwarz", "Braun"]
eye_list = ["Grün", "Blau", "Blau-Grau", "Braun", "Blau-Grün"]
desc_list = ["Mein Freund ist für mich nach New York gezogen!", "Ich esse immer Schnitzel mit Spaghetti!",
             "Meinen Freund kennt man als Juicy Gay!", "Mein Mann war beim Schweizer Bachelor!",
             "Ich habe nicht die klassischen Modelmaße.", "Ich bin überhaupt nicht oberflächlich!",
             "Ich habe mich für meine Hautfarbe geschämt!", "Wenn ich den Raum betrete, falle ich auf!",
             "Ich wurde als Junge geboren.", "Ich führe ein gutes Leben in Starnberg!", "Gott ist für mich alles!",
             "Ich bin High Fashion und das weiß ich!", "Es hat noch keine gewonnen, die so aussieht wie ich!",
             "Mein Papa ist der Geschäftsführer von Chanel!", "Ich habe meinen Freund im Club kennengelernt!",
             "Ich fühle mich nicht sehr wohl.", "Ich habe die Schule abgebrochen!", "Ich trage immer eine Perücke",
             "Ich färbe meine Haare gerne in bunten Farben.", "Mein Freund ist von Kopf bis Fuß tätowiert!",
             "Nach Miss Universe jetzt Topmodel?", "Meinen Freund habe ich mit 13 kennengelernt.",
             "Ich habe mir meine Brüste machen lassen.", "Ich wurde fast vom LKW überfahren!",
             "Mit dem Richtigen ist das Alter egal.", "Victoria's Secret ist ein Traum von mir!",
             "Ich verstehe nicht, wie man sich übers Umstyling aufregen kann!",
             "Ich habe mich nicht wohl in meinem Körper gefühlt.", "Singen ist meine Leidenschaft!",
             "Man weiß ja, dass man relativ hübsch ist.", "Mein Freundeskreis ist älter als ich.",
             "Ich lasse meine Augenbrauen sprießen!", "Meine Lippen sind gemacht!",
             "Ich habe noch keine Erfahrungen im Modeln!"]
hobbi_list = ["Singen", "Modeln", "Fernsehen", "GNTM", "Tanzen", "Laufen", "Shoppen", "Essen"]
img_list = [
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTEyNTg3Njc1OTdeQTJeQWpwZ15BbWU3MDI5Mjg3MzM@._V1_UY317_CR20,0,214,317_AL_.jpg",
    "http://www1.pictures.zimbio.com/gi/21st+Annual+Elton+John+AIDS+Foundation+Academy+ysTBYk7WzUJx.jpg",
    "https://intouch.wunderweib.de/assets/styles/696/public/field/image/heidi-klum-mode-lidl.jpg?itok=3TJWngMz",
    "http://www.speakerscorner.me/wp-content/uploads/2015/10/heidi1.jpg",
    "https://image.afcdn.com/story/20140116/heidi-klum-steht-zu-ihren-falten-161877_w767h767c1cx761cy1100.jpg",
    "https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2F1477665999%2F102816-heidi-klum-lead.jpg",
    "http://cdn.jolie.de/194800-2839016-1/image768w/heidi-klum-kinder.jpg",
    "https://image.gala.de/20514732/large1x1-460-460/9ab73961ac248825d910b025723f227f/GS/heidi-klum--6271749-.jpg",
    "https://image.gala.de/v1/cms/jr/heidi-klum_4839621-ORIGINAL-original.jpg",
    "https://image.gala.de/20557304/large1x1-460-460/abe13021ec72d77b76fbdac2364a95be/ay/thomashayo--9485564-.jpg",
    "http://cdn.jolie.de/11834-137283-1/image768w/thomas-hayo-2039724.jpg",
    "https://cdn.okmag.de/s/article_main/public/media/gallery/49a9843046f4ec27ee522e84384a4261.jpg",
    "https://www.stylebook.de/data/uploads/2017/06/14220692_f03c6c1017.jpg",
    "https://cdn.okmag.de/s/foto_des_tages/public/themen/bilder/thomas-hayo.jpg",
    "https://intouch.wunderweib.de/assets/styles/600x600/public/intouch/media/redaktionell/wunderweib/intouch_2/stars/starnews/2014_21/Thomas_Hayo_GNTM_h.jpg",
    "https://cdn.okmag.de/s/foto_des_tages/public/themen/bilder/thomas-hayo.jpg",
    "https://image.gala.de/20907544/large1x1-460-460/5a0f75efc3e525773b35913127b2d6f9/Rs/michael-michalsky-ge--11091091-.jpg",
    "https://content1.promiflash.de/article-images/square600/michael-michalsky-mit-ohrringen.jpg",
    "https://intouch.wunderweib.de/assets/styles/600x600/public/field/image/gntm-juror-michael-michalsky-gewinnerin.jpg",
    "http://media.klatsch-tratsch.de/615x/2017/11/michael-michalsky.jpg",
    "http://www.textilwirtschaft.de/news/media/6/Michael-Michalsky-58618-detail.jpeg",
    "https://i0.gmx.at/image/636/31761636,pd=2/michael-michalsky.jpg",
    "http://www.confashion.com/ss2010/michalsky7-2009b.jpg"]


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
                        age=random.randint(16, 33),
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


def get_user_json(username, empty=("passwd",)):
    u = User.objects.get(username=username)

    json_str = serializers.serialize('json', [u], ensure_ascii=False)
    json_str = json_str[1:-1]

    json_dict = json.loads(json_str)

    json_dict = json_dict["fields"]

    for e in empty:
        json_dict[e] = ""

    return json_dict


def update_user(username, key, val):
    u = User.objects.get(username=username)
    setattr(u, key, val)
    u.save()


def get_user_ranking():
    users = User.objects.filter(admin=0).order_by("-score", Lower("username"))
    user_toplist = []

    for u in users:
        user_toplist.append(dict(username=u.username, score=u.score, img_url=u.img_url, descr=u.descr))

    return {"ranking": user_toplist}


def is_admin(username):
    try:
        if not does_user_exist(username):
            return False

        u = User.objects.get(username=username)

        return u.admin == 1

    except:
        return False



def delete_user(username):
    try:
        if not does_user_exist(username):
            return False
        User.objects.get(username=username).delete()
        cas = CAnswer.objects.filter(uname=username)
        for c in cas:
            c.delete()
        return True
    except:
        return False


def get_spent_user_points(username):
    try:

        u_sum = 0

        cas = CAnswer.objects.filter(uname=username)
        for c in cas:
            try:
                if c.active == 0:
                    u_sum += c.points
            except:
                pass

        cs = Challenge.objects.filter(creator=username, type=2, open=0)
        for c in cs:
            u_sum += c.points

        return u_sum
    except:
        return 0

def get_effectiv_user_points(username):
    try:
        u = User.objects.get(username=username)

        points = u.score
        spent_points = get_spent_user_points(username)

        return points-spent_points
    except:
        return 0

def can_user_spend_points(username, points=0):
    try:
        if get_effectiv_user_points(username) >= points:
            return True
        else:
            return False
    except:
        return False


def get_score_origin(username):

    bet_score = 0
    honey_score = 0
    trump_score = 0

    try:

        u = User.objects.get(username=username)

        logs = Log.objects.filter(username=username)

        for l in logs:
            if l.ctype == 1 or l.ctype == 2:
                bet_score += l.points
            elif l.label.lower() == "honey":
                honey_score += l.points
            elif l.label.lower() == "trump":
                trump_score += l.points

    except:
        pass

    return {"scores": {"bet": bet_score, "honey": honey_score, "trump": trump_score}}


def change_user_passwd(username, passwd):
    pass_hash = hash_password(passwd)

    try:
        u = User.objects.get(username=username)
        u.passwd = pass_hash
        u.save()

        return 1

    except:
        print("Could not change password for user ", username)
        return 0