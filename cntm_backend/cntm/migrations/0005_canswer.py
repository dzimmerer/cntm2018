# Generated by Django 2.0.2 on 2018-02-03 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cntm', '0004_auto_20180202_2115'),
    ]

    operations = [
        migrations.CreateModel(
            name='CAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uname', models.CharField(max_length=30)),
                ('cid', models.IntegerField()),
                ('text', models.CharField(max_length=200)),
                ('img_url', models.CharField(max_length=200)),
            ],
        ),
    ]
