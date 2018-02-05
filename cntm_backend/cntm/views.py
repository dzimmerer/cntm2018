from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from cntm.helpers.challenge import get_all_challenges, get_challenge_data, get_anwsers_for_challenge, \
    add_challenge_answer, get_gntm_models, get_m_news, update_m_news, add_m_news, delete_m_news, add_challenge, \
    update_challenge, delete_challenge, update_gntm_models
from cntm.helpers.user import create_new_user, check_user_passwd, get_user_token, get_user_json, verify_user, \
    update_user, get_user_ranking, is_admin, delete_user
from cntm.models import GNTMModel



@csrf_exempt
def user_login_req(request):
    if request.method == "POST":
        try:

            username = request.POST.get("username", "")
            passwd = request.POST.get("password", "")

            print(username, passwd)

            valid = check_user_passwd(username, passwd)

            print(valid)

            if valid:
                token = get_user_token(username)
                is_ad = int(is_admin(username))

                print({"username": username, "token": token, "success": 1, "admin": is_ad})

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

            print(ret_json)

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

            print("Rank:" , rank_json)

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

            print(username, token, other)

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            user_json = get_user_json(other, empty=("passwd", "real_name", "token"))

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

            print("Answers:" , ach_json)

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
            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            model_json = get_gntm_models()

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
            print("News")
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
            print("News added")

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
            print("News deleted")

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
            print("User deleted: ", other)

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
                return JsonResponse({"msg": "Error: Invalid request"})
            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            add_challenge(name=name)
            print("Challenge added")

            return JsonResponse({})
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
            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            for key, val in request.GET.items():
                if key in ("username", "token", "cid"):
                    continue
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
            if not is_admin(username):
                return JsonResponse({"msg": "Error: Invalid request"})

            delete_challenge(cid=cid)
            print("Challenge deleted: ", cid)

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