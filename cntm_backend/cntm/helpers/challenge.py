from cntm.models import Challenge


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