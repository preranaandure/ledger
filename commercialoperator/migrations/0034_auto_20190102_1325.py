# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2019-01-02 05:25
from __future__ import unicode_literals

import commercialoperator.components.compliances.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commercialoperator', '0033_auto_20190102_1102'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicle',
            name='proposal',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='commercialoperator.Proposal'),
        ),
        migrations.AlterField(
            model_name='compliancedocument',
            name='_file',
            field=models.FileField(upload_to=commercialoperator.components.compliances.models.update_proposal_complaince_filename),
        ),
    ]