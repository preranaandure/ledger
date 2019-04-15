# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2019-03-29 02:30
from __future__ import unicode_literals

import commercialoperator.components.compliances.models
import commercialoperator.components.proposals.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commercialoperator', '0059_auto_20190327_1024'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProposalRequiredDocument',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, verbose_name='name')),
                ('description', models.TextField(blank=True, verbose_name='description')),
                ('uploaded_date', models.DateTimeField(auto_now_add=True)),
                ('_file', models.FileField(upload_to=commercialoperator.components.proposals.models.update_proposal_doc_filename)),
                ('input_name', models.CharField(blank=True, max_length=255, null=True)),
                ('can_delete', models.BooleanField(default=True)),
                ('proposal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='required_documents', to='commercialoperator.Proposal')),
                ('required_doc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proposals', to='commercialoperator.RequiredDocument')),
            ],
        ),
        migrations.AlterField(
            model_name='compliancedocument',
            name='_file',
            field=models.FileField(upload_to=commercialoperator.components.compliances.models.update_proposal_complaince_filename),
        ),
    ]