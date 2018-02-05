from cntm.models import Challenge, User, CAnswer, GNTMModel, News


def get_open_challenges(open=True):

    challenges = Challenge.objects.filter(open=open)
    c_list = []

    for c in challenges:
        c_list.append(dict(id=c.id, name=c.name, descr=c.descr, img_url=c.img_url, open=c.open))

    return c_list

def get_all_challenges():

    open_c = get_open_challenges(open=True)
    closed_c = get_open_challenges(open=False)

    return {"open": open_c, "closed": closed_c}


def get_challenge_data(cid):
    c = Challenge.objects.get(id=cid)

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
                choice=choices,
                has_choice=has_choice,
                img_url=c.img_url,
                open=c.open)

def update_challenge(cid, key, val):
    c = Challenge.objects.get(id=cid)
    setattr(c, key, val)
    c.save()

def add_challenge(name, desc="", img_url="", choice="", open=0):
    c = Challenge(name=name,
                 descr=desc,
                 img_url=img_url,
                 choice=choice,
                 open=open)
    c.save()

def delete_challenge(cid):
    try:
        Challenge.objects.get(id=cid).delete()
        cas = CAnswer.objects.filter(cid=cid)
        for c in cas:
            c.delete()
        return True
    except:
        return False

def add_challenge_answer(username, cid, answer):
    u = User.objects.get(username=username)
    c = Challenge.objects.get(id=cid)

    cas = CAnswer.objects.filter(cid=cid, uname=username)

    if len(cas) > 0:
        a = cas.first()
        a.text = answer
        a.save()
    else:
        a = CAnswer(uname=username,
                    cid=c.id,
                    text=answer,
                    img_url=u.img_url)
        a.save()

def get_anwsers_for_challenge(cid, username=""):

    ret_dict = {}
    ret_list = []

    cas = CAnswer.objects.filter(cid=cid)

    for a in cas:

        a_dct = dict(cid=a.cid,
                     username=a.uname,
                     text=a.text,
                     img_url=a.img_url)

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

