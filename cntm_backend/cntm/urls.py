from django.urls import path
from . import views

urlpatterns = [
    path(r'login/', views.user_login_req, name='login'),
    path(r'register/', views.register_req, name='register'),
    path(r'user_data/', views.get_user_data_req, name='user_data'),
    path(r'update_user/', views.update_user_data_req, name='update_user'),
    path(r'user_ranking/', views.user_ranking_req, name='user_ranking'),
    path(r'user_detail/', views.user_details_req, name='user_details'),
    path(r'challenge_list/', views.challenge_list_req, name='challenge_list'),
    path(r'challenge_data/', views.challenge_data_req, name='challenge_data'),
    path(r'challenge_answer/', views.challenge_answer_req, name='challenge_answer'),
    path(r'give_answer/', views.give_answer_req, name='give_answer'),
    path(r'get_models/', views.get_models_req, name='get_models'),
    path(r'news_list/', views.get_news_req, name='news_list'),
    path(r'update_news/', views.update_news_req, name='update_news'),
    path(r'add_news/', views.add_news_req, name='add_news'),
    path(r'delete_news/', views.delete_news_req, name='delete_news'),
    path(r'delete_user/', views.delete_user_req, name='delete_user'),
    path(r'update_other_user/', views.update_other_user_data_req, name='update_other_user'),
    path(r'add_challenge/', views.add_challenge_req, name='add_challenge'),
    path(r'update_challenge/', views.update_challenge_data_req, name='update_challenge'),
    path(r'delete_challenge/', views.delete_challenge_req, name='delete_challenge'),
    path(r'update_topmodel/', views.update_gntm_model_req, name='update_topmodel'),
    path(r'change_answer_points/', views.change_answer_points_req, name='change_answer_points'),
    path(r'eval_challenge/', views.eval_challenge_req, name='eval_challenge'),
    path(r'get_avail_answer_points/', views.get_avail_answer_points_req, name='get_avail_answer_points'),
    path(r'get_label_answer_count/', views.get_label_answer_count_req, name='get_label_answer_count'),
    path(r'get_user_score_details/', views.get_user_score_details_req, name='get_user_score_details'),
    path(r'delete_answer/', views.delete_answer_req, name='delete_answer'),
    path(r'get_user_challenges/', views.get_user_challenges_req, name='get_user_challenges'),
    path(r'get_user_answers/', views.get_user_answer_req, name='get_user_answers'),
    path(r'get_user_log/', views.get_user_log_req, name='get_user_log'),
    path(r'', views.dnd, name='dnd'),
]