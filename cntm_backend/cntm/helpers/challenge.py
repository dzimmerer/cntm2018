import math
import datetime
import pytz

from django.db.models import Q

import cntm.helpers.tele as tele
from cntm.models import Challenge, User, CAnswer, GNTMModel, News, Log

tz = pytz.timezone("Europe/Berlin")
urgent_delta = datetime.timedelta(hours=1)


def get_selected_challenges(open=0, ctype=None, uname=None, order_by_str=""):
    challenges = Challenge.objects.all()

    if isinstance(open, int):
        challenges = challenges.filter(open=open)
    elif isinstance(open, (list, tuple)):
        q = Q(open=open[0])
        for o in open[1:]:
            q = q | Q(open=o)
        challenges = challenges.filter(q)

    if ctype is not None and isinstance(ctype, int):
        challenges = challenges.filter(type=ctype)
    elif ctype is not None and isinstance(ctype, (list, tuple)):
        q = Q(type=ctype[0])
        for c in ctype[1:]:
            q = q | Q(type=c)
        challenges = challenges.filter(q)

    if uname is not None:
        challenges = challenges.filter(creator=uname)

    c_list = []

    if order_by_str:
        challenges = challenges.order_by(order_by_str)

    for c in challenges:

        urgent_str = ""

        if c.etime != "":
            right_now = datetime.datetime.now(tz=tz).replace(tzinfo=tz)
            etime = datetime.datetime.strptime(c.etime, "%H:%M %Y-%m-%d").replace(tzinfo=tz)

            if c.open <= 0 and etime - right_now < urgent_delta:
                urgent_str = c.etime.strip().split(" ")[0]

        is_out = False
        if open == 0:
            is_out = close_challenge_if_to_old(c.id)
        if not is_out:
            c_list.append(dict(id=c.id, name=c.name, descr=c.descr, img_url=c.img_url, open=c.open, creator=c.creator,
                               type=c.type, etime=c.etime, points=c.points, urgendstr=urgent_str))
    c_list.sort(key=lambda x: x["urgendstr"] + "z")

    return c_list


def get_all_challenges():
    community_c = get_selected_challenges(open=0, ctype=(1, 2), order_by_str="-points")
    special_c = get_selected_challenges(open=0, ctype=0)

    closed_c = get_selected_challenges(open=(1, 2), order_by_str="-id")

    closed_c = closed_c

    return {"community": community_c, "special": special_c, "closed": closed_c}


def get_user_challenges(username):
    user_c = get_selected_challenges(open=(0, 1, 2), uname=username, order_by_str="-id")

    return {"challenges": user_c}


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
    close_challenge_if_to_old(cid)
    calc_new_challenge_points(cid)

    c = Challenge.objects.get(id=cid)

    choices = []
    has_choice = 0
    if "&" in c.choice:
        choices = c.choice.split("&")
        has_choice = 2
    elif "|" in c.choice:
        choices = c.choice.split("|")
        has_choice = 1

    choices = [x_el.strip() for x_el in choices]

    return dict(id=c.id,
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
                etime=c.etime,
                label=c.label)


def is_challenge_creator(cid, username):
    try:
        c = Challenge.objects.get(id=cid)
        if c.creator == username and c.type >= 1:
            return True
        else:
            return False
    except:
        return False



def should_send_notification(c, key, val):
    if c.open == -1 and key == "open" and val == '0':
        ctype = c.type
        creator = c.creator
        name = c.name
        descr = c. descr

        tele.send_new_challenge_notification(name, descr, creator, ctype)


def update_challenge(cid, key, val):
    c = Challenge.objects.get(id=cid)
    should_send_notification(c, key, val)
    setattr(c, key, val)
    c.save()


def add_challenge(name, desc="", img_url="", choice="", open=-1, creator="", ctype=1):
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


def add_challenge_answer(username, cid, answer=None, points=None):
    u = User.objects.get(username=username)
    c = Challenge.objects.get(id=cid)

    if c.open != 0:
        return None

    cas = CAnswer.objects.filter(cid=cid, uname=username)

    if answer is not None:
        answer = answer.strip()

    if len(cas) > 0:
        a = cas.first()
        a.text = answer
        if points is not None:
            a.points = points
        a.save()
        return a
    else:
        if points is None:
            points = 0
        a = CAnswer(uname=username,
                    cid=c.id,
                    text=answer,
                    img_url=u.img_url,
                    points=points)
        a.save()
        return a


def update_challenge_answer_points(username, cid, points=0):
    try:

        c = Challenge.objects.get(id=cid)
        if c.open != 0:
            return False

        cas = CAnswer.objects.filter(cid=cid, uname=username)

        if len(cas) == 0:
            ca = add_challenge_answer(username, cid, answer="", points=0)
        else:
            ca = cas.first()
        ca.points = ca.points + points
        ca.save()

        calc_new_challenge_points(cid)

        return True

    except:
        return False


def delete_challenge_answer(username, cid):
    try:

        c = Challenge.objects.get(id=cid)
        if c.open != 0:
            return False

        cas = CAnswer.objects.filter(cid=cid, uname=username)

        if len(cas) == 0:
            return False

        ca = cas.first()
        ca.delete()

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

    c = Challenge.objects.get(id=cid)
    cas = CAnswer.objects.filter(cid=cid).filter(~Q(uname=c.creator))

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
        cname = ""
        ctype = 0
        try:
            c = Challenge.objects.get(id=a.cid)
            cname = c.name
            ctype = c.type
        except:
            pass
        a_dct = dict(cid=a.cid,
                     cname=cname,
                     username=a.uname,
                     text=a.text,
                     img_url=a.img_url,
                     points=a.points,
                     ctype=ctype)

        ret_list.append(a_dct)

    return {"answers": ret_list}



def get_gntm_models(names=False):
    ret_list = []
    if not names:
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
    else:
        mods = GNTMModel.objects.filter(out=0).order_by("name")
        for m in mods:
            ret_list.append(m.name)

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

        calc_new_challenge_points(cid)
        c = Challenge.objects.get(id=cid)

        tot_points = c.points
        solution = c.answer
        creator_name = c.creator

        if c.type == 0:

            # Use as pot of points
            if solution.startswith("$") and solution.endswith("$"):
                solution = solution[1:-1]

                is_in = False
                if "&" in solution:
                    is_in = True
                    solution = solution.split("&")
                    solution = [x_el.strip() for x_el in solution]

                if not is_in:
                    cas_right = CAnswer.objects.filter(cid=cid, text=solution).filter(~Q(uname=creator_name))

                    point_incr = 0
                    if len(cas_right) > 0:
                        point_incr = round(tot_points / len(cas_right))

                    for ca in cas_right:
                        try:
                            u = User.objects.get(username=ca.uname)
                            u.score += point_incr
                            u.save()
                            add_log(username=u.username, cid=cid, aid=ca.id, points=point_incr, ctype=c.type,
                                    ccreator=c.creator,
                                    label=c.label, answer=ca.text, solution=solution)
                            ca.active = 1
                            ca.save()
                        except:
                            pass
                else:
                    count_dict = dict()
                    point_dict = dict()
                    for sol in solution:
                        count_dict[sol] = 0
                        point_dict[sol] = tot_points

                    cas = CAnswer.objects.filter(cid=cid).filter(~Q(uname=creator_name))
                    for ca in cas:
                        if ca.text in count_dict:
                            count_dict[ca.text] += 1

                    for sol in solution:
                        point_dict[sol] = round(point_dict[sol] / count_dict[sol])

                    for ca in cas:
                        if ca.text in point_dict:
                            try:
                                u = User.objects.get(username=ca.uname)
                                u.score += point_dict[ca.text]
                                u.save()
                                add_log(username=u.username, cid=cid, aid=ca.id, points=point_dict[ca.text],
                                        ctype=c.type, ccreator=c.creator,
                                        label=c.label, answer=ca.text, solution=solution)
                                ca.active = 1
                                ca.save()
                            except:
                                pass

            # Do not use a pot of points
            else:

                is_in = False
                if "&" in solution:
                    is_in = True
                    solution = solution.split("&")
                    solution = [x_el.strip() for x_el in solution]

                cas = CAnswer.objects.filter(cid=cid).filter(~Q(uname=creator_name))
                for ca in cas:
                    try:
                        u = User.objects.get(username=ca.uname)

                        test_bool = (ca.text == solution)
                        if is_in:
                            test_bool = (ca.text in solution)

                        if test_bool:
                            u.score += tot_points
                            u.save()
                            add_log(username=u.username, cid=cid, aid=ca.id, points=tot_points, ctype=c.type,
                                    ccreator=c.creator,
                                    label=c.label, answer=ca.text, solution=solution)
                            ca.active = 1
                            ca.save()
                    except:
                        pass

        if c.type == 1:

            cas = CAnswer.objects.filter(cid=cid).filter(~Q(uname=creator_name))
            cas_right = CAnswer.objects.filter(cid=cid, text=solution).filter(~Q(uname=creator_name))

            right_points = 0
            for ca in cas_right:
                right_points += ca.points

            if tot_points > 10 and right_points != tot_points:
                try:
                    cre_points = int(tot_points * 0.1)
                    # tot_points -= cre_points
                    creator = User.objects.get(username=c.creator)
                    creator.score += cre_points
                    creator.save()

                    add_log(username=creator.username, cid=cid, aid=0, points=cre_points, ctype=c.type,
                            ccreator=c.creator,
                            label=c.label, answer="creator", solution=solution)
                    ca.active = 1
                    ca.save()

                except:
                    pass

                for ca in cas:
                    try:
                        u = User.objects.get(username=ca.uname)
                        p_diff = 0
                        p_diff -= ca.points

                        if ca.text == solution:
                            if right_points != 0:
                                right_percent = ca.points / right_points
                                p_diff += round(tot_points * right_percent)

                        u.score += p_diff
                        u.save()

                        add_log(username=u.username, cid=cid, aid=ca.id, points=p_diff, ctype=c.type,
                                ccreator=c.creator,
                                label=c.label, answer=ca.text, solution=solution)
                        ca.active = 1
                        ca.save()

                    except:
                        pass

        if c.type == 2:

            cas = CAnswer.objects.filter(cid=cid).filter(~Q(uname=creator_name))

            if len(cas) > 0:

                if c.answer == '0':
                    try:
                        u = User.objects.get(username=c.creator)
                        p_diff = tot_points * len(cas)
                        u.score += p_diff
                        u.save()
                        add_log(username=u.username, cid=cid, aid=0, points=p_diff, ctype=c.type, ccreator=c.creator,
                                label=c.label, answer='0', solution='0')

                    except:
                        pass
                    for ca in cas:
                        try:
                            u = User.objects.get(username=ca.uname)
                            p_diff = -tot_points
                            u.score += p_diff
                            u.save()
                            add_log(username=u.username, cid=cid, aid=ca.id, points=p_diff, ctype=c.type,
                                    ccreator=c.creator,
                                    label=c.label, answer='0', solution='1')
                            ca.active = 1
                            ca.save()
                        except:
                            pass
                elif c.answer == '1':
                    point_incr = max(1, round(tot_points / len(cas)))
                    try:
                        u = User.objects.get(username=c.creator)
                        p_diff = -tot_points
                        u.score += p_diff
                        u.save()
                        add_log(username=u.username, cid=cid, aid=0, points=p_diff, ctype=c.type, ccreator=c.creator,
                                label=c.label, answer='1', solution='0')
                    except:
                        pass
                    for ca in cas:
                        try:
                            u = User.objects.get(username=ca.uname)
                            p_diff = point_incr
                            u.score += p_diff
                            u.save()
                            add_log(username=u.username, cid=cid, aid=ca.id, points=p_diff, ctype=c.type,
                                    ccreator=c.creator, label=c.label, answer='1', solution='1')
                            ca.active = 1
                            ca.save()
                        except:
                            pass

        return True
    except:
        return False


def add_log(username, cid, aid, points, ctype, ccreator="", label="", answer="", solution=""):
    try:
        time_str = datetime.datetime.strftime(datetime.datetime.now(tz=tz).replace(tzinfo=tz), "%b %d %Y %H:%M:%S")
        l = Log(username=username,
                cid=cid,
                aid=aid,
                points=points,
                ctype=ctype,
                ccreator=ccreator,
                label=label,
                canswer=answer,
                csolution=solution,
                time=time_str)
        l.save()
    except:
        pass


def get_user_log(username):
    u_log = []

    try:
        for l in Log.objects.filter(username=username):

            cname = ""
            cdesc = ""
            try:
                c = Challenge.objects.get(id=l.cid)
                cname = c.name
                cdesc = c.descr
            except:
                pass

            type_ = l.ctype
            if l.ccreator == l.username:
                type_ = -1

            u_log.append(dict(username=l.username,
                              cid=l.cid,
                              aid=l.aid,
                              points=l.points,
                              ctype=l.ctype,
                              ccreator=l.ccreator,
                              canswer=l.canswer,
                              csolution=l.csolution,
                              time=l.time,
                              cname=cname,
                              cdesc=cdesc,
                              type=type_
            ))
    except:
        pass

    return {"logs" : u_log}


def get_elem_count_for_label(c_label):
    ret_dict = {}
    try:

        c = Challenge.objects.filter(label=c_label).last()
        cas = CAnswer.objects.filter(cid=c.id)

        for ca in cas:
            answer = ca.text
            if answer in ret_dict:
                ret_dict[answer] += 1
            else:
                ret_dict[answer] = 1

    except:
        pass

    return {"elem_count": ret_dict}
