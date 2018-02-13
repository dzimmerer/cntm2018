from django.core.management.base import BaseCommand, CommandError
from cntm.models import User

class Command(BaseCommand):
    help = 'Set all user points'

    def add_arguments(self, parser):
        parser.add_argument('points', type=int)

    def handle(self, *args, **options):

        for u in User.objects.all():
            u.score = options["points"]
            u.save()
