# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2018-10-18 14:12
from __future__ import unicode_literals

import commercialoperator.components.compliances.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercialoperator', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compliancedocument',
            name='_file',
            field=models.FileField(upload_to=commercialoperator.components.compliances.models.update_proposal_complaince_filename),
        ),
        migrations.AlterField(
            model_name='proposal',
            name='processing_status',
            field=models.CharField(choices=[('temp', 'Temporary'), ('draft', 'Draft'), ('with_assessor', 'With Assessor'), ('with_referral', 'With Referral'), ('with_assessor_requirements', 'With Assessor (Requirements)'), ('with_approver', 'With Approver'), ('renewal', 'Renewal'), ('licence_amendment', 'Licence Amendment'), ('awaiting_applicant_respone', 'Awaiting Applicant Response'), ('awaiting_assessor_response', 'Awaiting Assessor Response'), ('awaiting_responses', 'Awaiting Responses'), ('ready_for_conditions', 'Ready for Conditions'), ('ready_to_issue', 'Ready to Issue'), ('approved', 'Approved'), ('declined', 'Declined'), ('discarded', 'Discarded')], default='draft', max_length=30, verbose_name='Processing Status'),
        ),
        migrations.AlterField(
            model_name='proposaltype',
            name='name',
            field=models.CharField(choices=[('T Class', 'T Class'), ('Filming', 'Filming'), ('Event', 'Event')], default='T Class', max_length=64, verbose_name='Application name (eg. T Class, Filming, Event)'),
        ),
    ]