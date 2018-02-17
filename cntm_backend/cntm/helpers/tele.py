
import telegram

TELE_TOKEN = "527745575:AAF3YAZj69qJrZoqhHJCusVzrJ2eS7X1Wk8"
CHAT_ID = "-288593787"

bot = telegram.Bot(token=TELE_TOKEN)

def send_msg(text):
    bot.send_message(chat_id=CHAT_ID, text=text)

def send_new_challenge_notification(name, desc, creator, type_):

    line1 = ""
    if type_ == 0:
        line1 = "New Special Challenge!!!"
    elif type_ == 1:
        line1 = "New Challenge by " + creator + " :"
    elif type_ == 2:
        line1 = "New Direct Bet by " + creator + " :"

    line2 = name.title()
    line3 = desc.title()

    text = line1 + "\n\n" + line2 + "\n" + line3

    send_msg(text)

