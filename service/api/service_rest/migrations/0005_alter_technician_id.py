# Generated by Django 4.0.3 on 2022-08-02 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_serviceappointment_finished'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
    ]
