# Generated by Django 3.0.6 on 2020-05-20 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studyroadmap', '0002_auto_20200520_1841'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roadmap',
            name='num_shares',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='roadmap',
            name='num_views',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='roadmap',
            name='num_votes',
            field=models.IntegerField(default=0),
        ),
    ]
