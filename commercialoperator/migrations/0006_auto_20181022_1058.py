# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2018-10-22 02:58
from __future__ import unicode_literals

import commercialoperator.components.compliances.models
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercialoperator', '0005_auto_20181018_2355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compliancedocument',
            name='_file',
            field=models.FileField(upload_to=commercialoperator.components.compliances.models.update_proposal_complaince_filename),
        ),
        migrations.AlterField(
            model_name='proposal',
            name='schema',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=[{}]),
        ),
    ]
