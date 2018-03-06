from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from cntm.helpers.challenge import get_all_challenges, get_challenge_data, get_anwsers_for_challenge, \
    add_challenge_answer, get_gntm_models, get_m_news, update_m_news, add_m_news, delete_m_news, add_challenge, \
    update_challenge, delete_challenge, update_gntm_models, is_challenge_creator, \
    update_challenge_answer_points, eval_challenge, get_elem_count_for_label, delete_challenge_answer, \
    get_user_challenges, get_anwsers_for_user, get_user_log
from cntm.helpers.user import create_new_user, check_user_passwd, get_user_token, get_user_json, verify_user, \
    update_user, get_user_ranking, is_admin, delete_user, can_user_spend_points, get_score_origin, change_user_passwd
from cntm.models import GNTMModel



@csrf_exempt
def user_login_req(request):
    if request.method == "POST":
        try:

            username = request.POST.get("username", "")
            passwd = request.POST.get("password", "")

            valid = check_user_passwd(username, passwd)

            if valid:
                token = get_user_token(username)
                is_ad = int(is_admin(username))

                return JsonResponse({"username": username, "token": token, "success": 1, "admin": is_ad})
            else:
                return JsonResponse({"success": 0})
        except:
            return JsonResponse({"msg": "Error: Invalid request"})
    else:
        return HttpResponse("-.-")


@csrf_exempt
def register_req(request):
    if request.method == "POST":
        try:

            email = request.POST.get("email", "")
            username = request.POST.get("username", "")
            passwd = request.POST.get("password", "")

            token = create_new_user(email, username, passwd)

            if token:
                return JsonResponse({"username": username, "token": token, "success": 1})
            else:
                return JsonResponse({"success": 0})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return HttpResponse("-.-")



def get_user_data_req(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            ret_json = get_user_json(username)

            return JsonResponse(ret_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return HttpResponse("-.-")


def update_user_data_req(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            for key, val in request.GET.items():
                if key in ("username", "passwd", "token"):
                    continue

                update_user(username, key, val)

            return JsonResponse({})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def user_ranking_req(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            rank_json = get_user_ranking()

            return JsonResponse(rank_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})

def user_details_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            other = request.GET.get("other", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            if is_admin(username):
                user_json = get_user_json(other, empty=("passwd", "token"))
            else:
                user_json = get_user_json(other, empty=("passwd", 'real_name', "token"))

            print("User:" , user_json)

            return JsonResponse(user_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def challenge_list_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            ch_json = get_all_challenges()
            return JsonResponse(ch_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def challenge_data_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("id", "")
            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            ch_json = get_challenge_data(cid)
            return JsonResponse(ch_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})



def dnd(request):
    return HttpResponse("-.-")


def challenge_answer_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("id", "")
            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            ach_json = get_anwsers_for_challenge(cid, username)

            return JsonResponse(ach_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def give_answer_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("id", "")
            text = request.GET.get("text", "")
            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})
            if is_challenge_creator(cid, username):
                return JsonResponse({"msg": "Error: Invalid request"})

            add_challenge_answer(username, cid, text)

            return JsonResponse({})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def get_models_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            names = "names" in request.GET
            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            model_json = get_gntm_models(names=names)

            return JsonResponse(model_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def get_news_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            news_json = get_m_news()
            return JsonResponse(news_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})

def update_news_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            for key, val in request.GET.items():
                if key in ("username", "cid", "token"):
                    continue
                update_m_news(cid, key, val)

            return JsonResponse({})
        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def add_news_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            name = request.GET.get("name", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})
            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            add_m_news(name=name)
            return JsonResponse({})
        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def delete_news_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})
            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            delete_m_news(nid=cid)

            return JsonResponse({})
        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def delete_user_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            other = request.GET.get("other", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})
            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            delete_user(username=other)
            return JsonResponse({})
        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})

def update_other_user_data_req(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            other = request.GET.get("other", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})
            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            for key, val in request.GET.items():
                if key in ("username", "passwd", "token", "other"):
                    continue
                update_user(other, key, val)

            return JsonResponse({})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})

def add_challenge_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            name = request.GET.get("name", "")

            if not verify_user(username, token):
                return JsonResponse({"success": "0"})

            ctype = 1
            creator = ""
            if is_admin(username):
                ctype = 0
            else:
                creator = username

            cid = add_challenge(name=name, creator=creator, ctype=ctype)

            return JsonResponse({"success": "1", "cid" : cid})
        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def update_challenge_data_req(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})
            if not is_admin(username) and not is_challenge_creator(cid, username):
                return JsonResponse({"msg": "Error: Invalid request"})

            for key, val in request.GET.items():
                if key in ("username", "token", "cid"):
                    continue
                # if key in ["points"] and not is_admin(username):
                #     continue
                update_challenge(cid, key, val)

            return JsonResponse({})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})

def delete_challenge_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})
            if not is_admin(username) and not is_challenge_creator(cid, username):
                return JsonResponse({"msg": "Error: Invalid request"})

            delete_challenge(cid=cid)

            return JsonResponse({})
        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def update_gntm_model_req(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})
            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            for key, val in request.GET.items():
                if key in ("username", "token", "cid"):
                    continue
                update_gntm_models(cid, key, val)

            return JsonResponse({})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def change_answer_points_req(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")
            points = request.GET.get("points", "")
            points = int(points)

            # if points != 1 and points != -1:
            #     return JsonResponse({"success": 0})

            if not verify_user(username, token):
                return JsonResponse({"success": 0})

            if is_admin(username):
                return JsonResponse({"success": 1})

            if points <= 0 or can_user_spend_points(username, points):
                if update_challenge_answer_points(username, cid, points):
                    return JsonResponse({"success": 1})

            return JsonResponse({"success": 0})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def get_avail_answer_points_req(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")
            points = request.GET.get("points", "")
            points = int(points)

            if not verify_user(username, token):
                return JsonResponse({"success": 0})

            if is_admin(username):
                return JsonResponse({"success": 1})

            if points <= 0 or can_user_spend_points(username, points):
                return JsonResponse({"success": 1})

            return JsonResponse({"success": 0})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def eval_challenge_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")

            if not verify_user(username, token):
                return JsonResponse({"success": 0})
            if not is_admin(username) and not is_challenge_creator(cid, username):
                return JsonResponse({"success": 0})

            if eval_challenge(cid):
                return JsonResponse({"success": 1})

            return JsonResponse({"success": 0})
        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def get_label_answer_count_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            label = request.GET.get("label", "")

            if not verify_user(username, token):
                return JsonResponse({})

            ret_json = get_elem_count_for_label(label)
            return JsonResponse(ret_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def get_user_score_details_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            other = request.GET.get("other", "")

            if not verify_user(username, token):
                return JsonResponse({})

            ret_json = get_score_origin(other)
            return JsonResponse(ret_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def delete_answer_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            cid = request.GET.get("cid", "")

            if not verify_user(username, token):
                return JsonResponse({"success": 0})

            succ = delete_challenge_answer(username, cid)

            return JsonResponse({"success": int(succ)})
        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def get_user_challenges_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")

            if not verify_user(username, token):
                return JsonResponse({})

            ret_json = get_user_challenges(username)
            return JsonResponse(ret_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def get_user_answer_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")

            if not verify_user(username, token):
                return JsonResponse({})

            ret_json = get_anwsers_for_user(username)
            return JsonResponse(ret_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def get_user_log_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            other = request.GET.get("other" , "")

            if not verify_user(username, token):
                return JsonResponse({})

            if other != "":
                if not is_admin(username):
                    return JsonResponse({"success": 0})
                ret_json = get_user_log(other)
            else:
                ret_json = get_user_log(username)
            return JsonResponse(ret_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def update_user_password_req(request):
    if request.method == "GET":
        try:
            username = request.GET.get("username", "")
            token = request.GET.get("token", "")
            password = request.GET.get("password" , "")

            if not verify_user(username, token):
                return JsonResponse({})

            ret_val = change_user_passwd(username, password)

            return JsonResponse({"success": ret_val})

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})