from cntm.models import Challenge, User, CAnswer


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

    return dict(id = c.id,
                name=c.name,
                descr=c.descr,
                choice=choices,
                has_choice=has_choice,
                img_url=c.img_url,
                open=c.open)

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
