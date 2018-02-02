from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

from cntm.helpers.user import create_new_user, check_user_passwd, get_user_token, get_user_json, verify_user, \
    update_user, get_user_ranking


@csrf_exempt
def user_login(request):
    if request.method == "POST":
        try:

            username = request.POST.get("username", "")
            passwd = request.POST.get("password", "")

            valid = check_user_passwd(username, passwd)

            print(valid)

            if valid:
                token = get_user_token(username)
                return JsonResponse({"username": username, "token": token, "success": 1})
            else:
                return JsonResponse({"success": 0})
        except:
            return JsonResponse({"msg": "Error: Invalid request"})
    else:
        return HttpResponse("-.-")


@csrf_exempt
def register(request):
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



def get_user_data(request):
    if request.method == "GET":
        try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")

            ret_json = get_user_json(username, token)

            print(ret_json)

            return JsonResponse(ret_json)

        except:
            return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return HttpResponse("-.-")


def update_user_data(request):
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


def user_ranking(request):
    if request.method == "GET":
        # try:

            username = request.GET.get("username", "")
            token = request.GET.get("token", "")

            if not verify_user(username, token):
                return JsonResponse({"msg": "Error: Invalid request"})

            rank_json = get_user_ranking()

            print("Rank:" , rank_json)

            return JsonResponse(rank_json)

        # except:
        #     return JsonResponse({"msg":"Error: Invalid request"})
    else:
        return JsonResponse({})


def dnd(request):
    return HttpResponse("-.-")

