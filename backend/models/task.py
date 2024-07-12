"""
An example using Amazon's Thread example for motivation

http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SampleTablesAndData.html
"""

import logging
import uuid
from graphene import ObjectType, String
from pynamodb.models import Model
from pynamodb.attributes import (
    ListAttribute,
    UnicodeAttribute,
    NumberAttribute,
    UnicodeSetAttribute,
    UTCDateTimeAttribute,
)
from datetime import datetime

logging.basicConfig()
log = logging.getLogger("pynamodb")
log.setLevel(logging.DEBUG)
log.propagate = True


class Task(Model):
    class Meta:
        read_capacity_units = 1
        write_capacity_units = 1
        table_name = "Task"

    board_handle = UnicodeAttribute(hash_key=True)
    task_handle = UnicodeAttribute(
        range_key=True, null=False, default_for_new=lambda: uuid.uuid4().hex
    )
    column_handle = UnicodeAttribute(null=False)
    order = UnicodeAttribute(default_for_new=lambda: int(datetime.now().timestamp()))
    description = UnicodeAttribute(null=True)


class TaskType(ObjectType):
    board_handle = String()
    task_handle = String()
    column_handle = String()
    order = String()
    description = String()
