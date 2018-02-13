from django.core.management.base import BaseCommand, CommandError

from cntm.helpers.passwd import hash_password
from cntm.models import User

class Command(BaseCommand):
    help = 'Set all user points'

    def add_arguments(self, parser):
        parser.add_argument('user', type=str)
        parser.add_argument('password', type=str)

    def handle(self, *args, **options):

        uname = options["user"]
        passwd = options["password"]
        pass_hash = hash_password(passwd)

        try:
            u = User.objects.get(username=uname)
            u.passwd = pass_hash
            u.save()

        except:
            print("Could not change password for user ", uname)

