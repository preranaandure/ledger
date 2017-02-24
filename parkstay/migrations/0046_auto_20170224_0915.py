# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-24 01:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('parkstay', '0045_remove_park_entry_fee'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookingvehiclerego',
            name='type',
            field=models.CharField(choices=[('vehicle', 'vehicle'), ('motorbike', 'motorbike'), ('concession', 'concession')], default='vehicle', max_length=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='campsitebooking',
            name='booking',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='campsites', to='parkstay.Booking'),
        ),
    ]
