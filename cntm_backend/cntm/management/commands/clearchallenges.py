from django.core.management.base import BaseCommand, CommandError
from cntm.models import Challenge, CAnswer, Log

class Command(BaseCommand):
    help = 'Clear all challenges'
    #
    # def add_arguments(self, parser):
    #     parser.add_argument('points', type=int)

    def handle(self, *args, **options):

        for c in Challenge.objects.all():
            c.delete()

        for ca in CAnswer.objects.all():
            ca.delete()

        for l in Log.objects.all():
            l.delete()
