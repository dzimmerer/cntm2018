import math
import datetime
import pytz

from cntm.models import Challenge, User, CAnswer, GNTMModel, News

tz = pytz.timezone("Europe/Berlin")


def get_open_challenges(open=0, ctype=None):

    challenges = Challenge.objects.filter(open=open)
    if ctype is not None:
        challenges = challenges.filter(type=ctype)
    c_list = []

    for c in challenges:
        is_out = False
        if open == 0:
            is_out = close_challenge_if_to_old(c.id)
        if not is_out:
            c_list.append(dict(id=c.id, name=c.name, descr=c.descr, img_url=c.img_url, open=c.open, creator=c.creator))

    return c_list

def get_all_challenges():

    community_c = get_open_challenges(open=0, ctype=1)
    special_c = get_open_challenges(open=0, ctype=0)

    closed_c1 = get_open_challenges(open=1)
    closed_c2 = get_open_challenges(open=2)

    closed_c = closed_c1 + closed_c2


    return {"community": community_c, "special": special_c, "closed": closed_c}


def close_challenge_if_to_old(cid):
    try:
        c = Challenge.objects.get(id=cid)
        etime_str = c.etime

        if c.open == 0 and etime_str != "":
            right_now = datetime.datetime.now(tz=tz).replace(tzinfo=tz)
            etime = datetime.datetime.strptime(etime_str, "%H:%M %Y-%m-%d").replace(tzinfo=tz)

            if right_now > etime:
                c.open = 1
                c.save()
                return True

        return False
    except:
        return False



def get_challenge_data(cid):
    c = Challenge.objects.get(id=cid)

    close_challenge_if_to_old(cid)

    choices = []
    has_choice = 0
    if ";" in c.choice:
        choices = c.choice.split(";")
        has_choice = 1
    elif "|" in c.choice:
        choices = c.choice.split("|")
        has_choice = 2

    return dict(id = c.id,
                name=c.name,
                descr=c.descr,
                choice=c.choice,
                choice_list=choices,
                has_choice=has_choice,
                img_url=c.img_url,
                open=c.open,
                type=c.type,
                creator=c.creator,
                answer=c.answer,
                points=c.points,
                etime=c.etime)

def is_challenge_creator(cid, username):
    try:
        c = Challenge.objects.get(id=cid)
        if c.creator == username and c.type == 1:
            return True
        else:
            return False
    except:
        return False

def update_challenge(cid, key, val):
    c = Challenge.objects.get(id=cid)
    setattr(c, key, val)
    c.save()

def add_challenge(name, desc="", img_url="", choice="", open=0, creator="", ctype=1):

    if desc == "":
        desc = name

    c = Challenge(name=name,
                 descr=desc,
                 img_url=img_url,
                 choice=choice,
                 open=open,
                 creator=creator,
                 type=ctype)
    c.save()

    return c.id

def delete_challenge(cid):
    try:
        Challenge.objects.get(id=cid).delete()
        cas = CAnswer.objects.filter(cid=cid)
        for c in cas:
            c.delete()
        return True
    except:
        return False

def add_challenge_answer(username, cid, answer=None, points=0):
    u = User.objects.get(username=username)
    c = Challenge.objects.get(id=cid)

    cas = CAnswer.objects.filter(cid=cid, uname=username)

    if len(cas) > 0:
        a = cas.first()
        a.text = answer
        a.points = points
        a.save()
    else:
        a = CAnswer(uname=username,
                    cid=c.id,
                    text=answer,
                    img_url=u.img_url,
                    points=points)
        a.save()


def update_challenge_answer_points(username, cid, points=0):
    try:
        cas = CAnswer.objects.get(cid=cid, uname=username)
        cas.points = cas.points + points
        cas.save()

        calc_new_challenge_points(cid)

        return True

    except:
        return False


def calc_new_challenge_points(cid):
    try:

        c = Challenge.objects.get(id=cid)

        if c.type == 1:

            points = 0

            cas = CAnswer.objects.filter(cid=cid)
            for ca in cas:
               points += ca.points

            c.points = points
            c.save()

    except:
        return False

def get_anwsers_for_challenge(cid, username=""):

    ret_dict = {}
    ret_list = []

    cas = CAnswer.objects.filter(cid=cid)

    for a in cas:

        a_dct = dict(cid=a.cid,
                     username=a.uname,
                     text=a.text,
                     img_url=a.img_url,
                     points=a.points)

        if a.uname == username:
            ret_dict["own"] = a_dct
        else:
            ret_list.append(a_dct)

    ret_dict["other"] = ret_list

    return ret_dict

def get_anwsers_for_user(username):

    ret_list = []

    cas = CAnswer.objects.filter(uname=username)
    for a in cas:

        a_dct = dict(cid=a.cid,
                     username=a.uname,
                     text=a.text,
                     img_url=a.img_url)

        ret_list.append(a_dct)

    return {"answers": ret_list}



def get_gntm_models():

    ret_list = []

    mods = GNTMModel.objects.all().order_by("out", "name")

    for m in mods:

        ret_list.append(dict(id=m.id,
                             name=m.name,
                             descr=m.descr,
                             img_url=m.img_url,
                             age=m.age,
                             out=m.out,
                             link=m.link
                             ))


    return {"models": ret_list}

def update_gntm_models(mid, key, val):
    gm = GNTMModel.objects.get(id=mid)
    setattr(gm, key, val)
    gm.save()



def add_m_news(name, desc="", date=""):
    n = News(name=name,
             descr=desc,
             date=date)
    n.save()


def get_m_news():
    ret_list = []
    mods = News.objects.all().order_by("-id")

    for m in mods:

        ret_list.append(dict(name=m.name,
                             descr=m.descr,
                             id=m.id,
                             date=m.date,
                             ))

    return {"news": ret_list}

def update_m_news(nid, key, val):
    n = News.objects.get(id=nid)
    setattr(n, key, val)
    n.save()

def delete_m_news(nid):
    try:
        News.objects.get(id=nid).delete()
        return True
    except:
        return False


def eval_challenge(cid):
    try:

        c = Challenge.objects.get(id=cid)
        calc_new_challenge_points(cid)

        tot_points = c.points
        solution = c.answer

        if c.type == 0:

            cas = CAnswer.objects.filter(cid=cid, text=solution)

            for ca in cas:
                try:
                    right_user = User.objects.get(username=ca.uname)
                    right_user.score += tot_points
                    right_user.save()
                except:
                    pass

        if c.type == 1:

            cas_right = CAnswer.objects.filter(cid=cid, text=solution)
            right_points = 0

            for ca in cas_right:
                right_points += ca.points

            cas = CAnswer.objects.filter(cid=cid)
            for ca in cas:
                try:
                    u = User.objects.get(username=ca.uname)
                    u.score -= ca.points

                    if ca.text == solution:
                        right_percent = ca.points / right_points
                        u.score += round( tot_points * right_percent )

                    u.save()
                except:
                    pass



        return True
    except:
        return False

