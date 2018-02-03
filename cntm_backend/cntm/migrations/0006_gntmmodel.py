# Generated by Django 2.0.2 on 2018-02-03 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cntm', '0005_canswer'),
    ]

    operations = [
        migrations.CreateModel(
            name='GNTMModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descr', models.TextField()),
                ('name', models.CharField(max_length=100)),
                ('img_url', models.CharField(max_length=200)),
                ('out', models.IntegerField(default=0)),
                ('link', models.CharField(max_length=200)),
            ],
        ),
    ]
