from django.urls import path
from . import views

urlpatterns = [
    path(r'login/', views.user_login, name='login'),
    path(r'register/', views.register, name='register'),
    path(r'user_data/', views.get_user_data, name='user_data'),
    path(r'update_user/', views.update_user_data, name='update_user'),
    path(r'user_ranking/', views.user_ranking, name='user_ranking'),
    path(r'user_detail/', views.user_details, name='user_details'),
    path(r'challenge_list/', views.challenge_list, name='challenge_list'),
    path(r'challenge_data/', views.challenge_data, name='challenge_data'),
    path(r'challenge_answer/', views.challenge_answer, name='challenge_answer'),
    path(r'give_answer/', views.give_answer, name='give_answer'),
    path(r'get_models/', views.get_models, name='get_models'),
    path(r'news_list/', views.get_news, name='news_list'),
    path(r'', views.dnd, name='dnd'),
]